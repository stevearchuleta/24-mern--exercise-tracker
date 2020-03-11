const router = require('express').Router();
let Exercise = require('../models/exercise.model');

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

   //handles http get request at localhost:5000/exercises/<INSERT MONGODB OBJECT ID HERE>
   router.route('/:id').get((req, res) => {
      Exercise.findById(req.params.id)
         .then(exercise => res.json(exercise))
         .catch(err => res.status(400).json('Error: ' + err));
      });

   //handles http delete request at localhost:5000/exercises/<INSERT MONGODB OBJECT ID HERE>
   router.route('/:id').delete((req, res) => {
   Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
   });


//handles http post request at localhost:5000/exercises//<INSERT MONGODB OBJECT ID HERE> by first finding the desired exercise by passing the parameter directly from the url, and then updating any of the exercise object's properties
router.route('/update/:id').post((req, res) => {
   Exercise.findById(req.params.id)
     .then(exercise => {
       exercise.username = req.body.username;
       exercise.description = req.body.description;
       exercise.duration = Number(req.body.duration);
       exercise.date = Date.parse(req.body.date);
 
       exercise.save()
         .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));

   });


   module.exports = router;