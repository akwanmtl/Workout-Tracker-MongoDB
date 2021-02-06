// Dependencies
const router = require("express").Router();
const Workout = require("../models/workout.js");

// Get all workouts and add field of Total Duration
router.get("/api/workouts/", (req,res) =>{
  Workout.aggregate(
      [{
        $addFields : {totalDuration : {$sum: "$exercises.duration"}}
      }]
    )
    .then(data =>{
      res.json(data);
    })
    .catch(err =>{
      res.status(400).json(err)
    })
})

// Update workout of id by pushing a new exercise object to the exercises array
router.put("/api/workouts/:id", (req,res) =>{
  Workout.findByIdAndUpdate(req.params.id, {
    $push: {exercises : {...req.body}}
  })
    .then(data =>{
      res.json(data);
    })
    .catch(err =>{
      res.status(400).json(err)
    })
})

// Adds a new workout with today's date as default and empty exercise array
router.post("/api/workouts/", (req,res) =>{
  Workout.create(req.body)
    .then(data =>{
      res.json(data);
    })
    .catch(err =>{
      res.status(400).json(err)
    })
})

// Get the 7 latest workouts
router.get("/api/workouts/range", (req,res) =>{
  Workout.aggregate(
      [{
        $addFields : {totalDuration : {$sum: "$exercises.duration"}}
      }]
    )
    .sort({day : -1})    
    .limit(7)
    .then(data =>{
      res.json(data.reverse()); // reverse the data so that it is back to oldest to newest
    })
    .catch(err =>{
      res.status(400).json(err)
    })
})

module.exports = router;