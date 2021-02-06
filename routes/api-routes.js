const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts/", (req,res) =>{
  Workout.aggregate(
    [
      {
      $addFields : {totalDuration : {$sum: "$exercises.duration"}}
    }]
  )
    .then(data =>{
      console.log(data);
      res.json(data);
    })
    .catch(err =>{
      console.log(err)
      res.status(400).json(err)
    })

})

router.put("/api/workouts/:id", (req,res) =>{
  Workout.findByIdAndUpdate(req.params.id, {
    $push: {exercises : {...req.body}}
    
  })
    .then(data =>{
      console.log(data);
      res.json(data);
    })
    .catch(err =>{
      console.log(err)
      res.status(400).json(err)
    })
})

router.post("/api/workouts/", (req,res) =>{
  console.log(req.body)
  Workout.create(req.body)
    .then(data =>{
      console.log(data);
      res.json(data);
    })
    .catch(err =>{
      console.log(err)
      res.status(400).json(err)
    })
})

router.get("/api/workouts/range", (req,res) =>{
  Workout.aggregate(
      [
        {
        $addFields : {totalDuration : {$sum: "$exercises.duration"}}
      }]
    )
    .sort({day : -1})    
    .limit(7)
    .then(data =>{
      console.log(data);
      res.json(data.reverse());
    })
    .catch(err =>{
      console.log(err)
      res.status(400).json(err)
    })

})

module.exports = router;