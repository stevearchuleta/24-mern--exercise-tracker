const router = require('express').Router();
let User = require('../models/exercise.model');

//handles http get request at localhost:5000/exercises/
router.route('/').get((req, res) => {
   Exercise.find()
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
});

//handles http post request at localhost:5000/exercises/add
router.route('/add').post((req, res) => {
   const username = req.body.username;
   const description = req.body.description;
   const duration = req.body.duration;
   const date = Date.parse(req.body.date);

   const newExercise = new Exercise({
      username,
      description,
      duration,
      date
   });

   newExercise.save()
      .then(() => res.json('Exercise Added!'))
      .catch(err => res.status(400).json('Error: ' + err));
   });

   module.exports = router;