import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class EditExercise extends Component {
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
   
   //react lifecylce method that is automatically called just before anything is loaded/rendered onto the page
   componentDidMount() {
      axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
         .then(response => {
            this.setState({
               username: response.data.username,
               description: response.data.description,
               duration: response.data.duration,
               date: new Date(response.data.date)
            })
         })
         .catch(function (err) {
            console.log(err);
         })

      axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
            })
          }
        })
        .catch((error) => {
          console.log(error);
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

      axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
         .then(res => console.log(res.data));

      // now take user back to the list of exercises (home page)
      // window.location = '/';
   }

   render() {
      return (
         <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
               <div className='form-group'>
                  <label>Username: </label>
                     <select 
                     ref="userInput"
                     required
                     className='form-control'
                     value={this.state.username}
                     onChange={this.onChangeUsername}>
                     {
                        this.state.users.map(function(user) {  // map through each element in the array
                           return   <option             // return a series of options for the select box
                                       key={user} 
                                       value={user}>{user} 
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
                     value='Edit Exercise Log'
                     className='btn btn-primary' />
               </div>
            </form>
         </div>
      )
   }
}

export default EditExercise;