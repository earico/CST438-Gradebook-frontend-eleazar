import React, { useState, useEffect } from 'react';
import {SERVER_URL} from '../constants';

// Front end code to create a new assignment by entering
// course_id, assignment name and due date. 
// Check the format of the due date for the form yyyy-mm-dd.

function AddAssignment(props) { 
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // called once after intial render
    fetchAssignments();
   }, [] )
  
   const fetchAssignments = () => {
     console.log("fetchAssignments");
     fetch(`${SERVER_URL}/assignment`)
     .then((response) => response.json() ) 
     .then((data) => { 
       console.log("assignment length "+data.length);
       setAssignments(data);
      }) 
     .catch(err => console.error(err)); 
   }

  return (
      <div id="dialog">
        <form>
          <label>Assignment Name<input type="text"/></label>
          <label>Course Title<input type="text"/></label>
          <label>Due Date<input type="text"/></label>
        </form>
      </div>
  ); 
}

export default AddAssignment;