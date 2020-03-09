import React, { Component } from 'react';

class CreateExercise extends Component {
   
   constructor(props) {
      //ensures that this refers to the CreateExercise class
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeDuration = this.onChangeDuration.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      super(props);
      this.state = {
         username: '',
         description: '',
         duration: 0,
         date: new Date(),
         users: []
      }
   }
   
   //react lifecylce method that is automatically called just before anything is loaded/rendered onto the page
   componentDidMount() {
      this.setState({
         users: ['test user'],
         username: 'test user'
      })
   }

   onChangeUsername(event) {
      this.setState({
         username: event.target.value
      });
   }

   onChangeDescription(event) {
      this.setState({
         description: event.target.value
      });
   }

   onChangeDuration(event) {
      this.setState({
         duration: event.target.value
      });
   }

   onChangeDate(date) {
      this.setState({
         date: date
      });
   }

   onSubmit(event) {
      event.preventDefault();
      const exercise = {
         username: this.state.username,
         description: this.state.description,
         duration: this.state.duration,
         date: this.state.date
      }
      console.log('[onSubmit: ]', exercise);

      // now take user back to the list of exercises
      window.location = '/';
   }

   render() {
      return (
         <div>
            <p>
               This is the Create Exercise Component.
            </p>
         </div>
      )
   }
}

export default CreateExercise;