import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
   constructor(props) {
      super(props);
      //ensures that 'this' refers to the CreateExercise class (inside the methods below)
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        username: ''
      }
    }


    onChangeUsername(event) {
      this.setState({
         username: event.target.value
      });
   }

   onSubmit(event) {
      event.preventDefault();

      const user = {
         username: this.state.username,
      }

      console.log(user);

      axios.post('http://localhost:5000/users/add', user)
         .then(res => console.log(res.data));

      // set username back to a blank field
      this.setState({
         username: ''
      })
      
   }
   render() {
      return (
         <div>
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
               <div className='form-group'>
                  <label>Username: </label>
                  <input 
                     type='text'
                     required
                     className='form-control'
                     value={this.state.username}
                     onChange={this.onChangeUsername}/>
               </div>
            </form>
         </div>
      )
   }
}

export default CreateUser;