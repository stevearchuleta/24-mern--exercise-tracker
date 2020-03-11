import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateExercise extends Component {
      constructor(props) {
         super(props);
         //ensures that 'this' refers to the CreateExercise class (inside the methods below)
         this.onChangeUsername = this.onChangeUsername.bind(this);
         this.onChangeDescription = this.onChangeDescription.bind(this);
         this.onChangeDuration = this.onChangeDuration.bind(this);
         this.onChangeDate = this.onChangeDate.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
     
         this.state = {
           username: '',
           description: '',
           duration: 0,
           date: new Date(),
           users: []
         }
       }
   
   //react lifecylce method that is automatically called just before anything is loaded/rendered onto the page; for now, I hard code a 'test user'
   componentDidMount() {
      this.setState({
         users: ['test user'], //eventually this will be loaded from the MongoDB database
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

      console.log(exercise);

      // now take user back to the list of exercises (home page)
      // window.location = '/';
   }

   render() {
      return (
         <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
               <div className='form-group'>
                  <label>Username: </label>
                     <select 
                     ref="userInput"
                     required
                     className='form-control'
                     value={this.state.username}
                     onChange={this.onChangeUsername}>
                     
                     {/* inside a select box the user has different options; herein, this code gets the select options from the users array, which itself is stored in the MongoDB database*/}
                     {
                        this.state.users.map(user => {  // map through each element in the array
                           return   <option             // return a series of options for the select box
                                       key={user} 
                                       value={user}> {user} 
                                    </option>
                        })
                     }   
                     </select>
               </div>

               <div className='form-group'>
                  <label>Description: </label>
                  <input 
                     type='text'
                     required
                     className='form-control'
                     value={this.state.description}
                     onChange={this.onChangeDescription}
                  />
               </div>

               <div className='form-group'>
                  <label>Duration (in minutes): </label>
                  <input 
                     type='text'
                     required
                     className='form-control'
                     value={this.state.duration}
                     onChange={this.onChangeDuration}
                  />
               </div>

               <div className='form-group'>
                  <label>Date: </label>
                  <div>
                     <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                     />
                  </div>
               </div>

               <div className='form-group'>
                  <input
                     type='submit'
                     value='Create Exercise Log'
                     className='btn btn-primary' />
               </div>
            </form>
         </div>
      )
   }
}

export default CreateExercise;