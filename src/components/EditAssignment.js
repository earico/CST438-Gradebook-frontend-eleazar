import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import { Button } from '@mui/base';


function EditAssignment(props) { 
  const [assignment, setAssignment] = useState(props.assignment);
  const [message, setMessage] = useState('');
  
  const handleChange = (event) => {
    setAssignment({...assignment, [event.target.name]:event.target.value });
  }

  const saveAssignment = () => {
    fetch(`${SERVER_URL}/assignment/${assignment.id}`, 
    {  
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json', }, 
      body: JSON.stringify(assignment)
    } 
  )
  .then((response) => { 
    if (response.ok) {
        setMessage('Assignment saved.');
    } else {
        setMessage("Save failed. " + response.status);
    }
 } )
.catch((err) =>  { setMessage('Error. '+err) } );
  }

  return (
      <div id="dialog">
        <h3>{ message }</h3>
        <form>
          <label>Assignment Id<input type="text" name="id" value={assignment.id}/></label>
          <label>Assignment Name<input type="text" name="assignmentName" value={assignment.assignmentName} onChange={handleChange}/></label>
          <label>Due Date<input type="text" name="dueDate" value={assignment.dueDate} onChange={handleChange}/></label>
        </form>
        <Button onChange={ saveAssignment }>Save</Button>
      </div>
  ); 
}

export default EditAssignment;