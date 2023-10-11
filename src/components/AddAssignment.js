import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {SERVER_URL} from '../constants';

// Front end code to create a new assignment by entering
// course_id, assignment name and due date. 
// Check the format of the due date for the form yyyy-mm-dd.

function AddAssignment(props) { 
  const [assignment, setAssignment] = useState({ assignmentName: '', dueDate: '', courseId: '' });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setAssignment({...assignment, [event.target.name]:event.target.value });
  }

  const addAssignment = ( ) => {
    fetch(`${SERVER_URL}/assignment`, 
      {  
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', }, 
        body: JSON.stringify(assignment)
      } 
    )
    .then((response) => { 
      if (response.ok) {
          setMessage('Assignment added.');
      } else {
          setMessage("Add failed.");
      }
   } )
  .catch((err) =>  { setMessage('Error. '+err) } );
  }

  return (
      <div id="dialog">
        <h3>{message}</h3>
        <form>
          <label>Assignment Name<input type="text" name='assignmentName' onChange={handleChange}/></label>
          <label>Course Title<input type="text" name='courseId' onChange={handleChange}/></label>
          <label>Due Date<input type="text" name='dueDate' onChange={handleChange}/></label>
        </form>
        <Button onClick={addAssignment}>Add</Button>
      </div>
  ); 
}

export default AddAssignment;