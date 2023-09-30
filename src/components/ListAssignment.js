import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';
import AddAssignment from './AddAssignment';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import EditAssignment from './EditAssignment';


function ListAssignment(props) {

  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');
  const [isAddDialogOpen, setAddIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditIsDialogOpen] = useState(false);

  useEffect(() => {
   // called once after intial render
   fetchAssignments();
  }, [] )
 
  const openAddDialog = () => {
    setAddIsDialogOpen(true);
    console.log("does it even work")
  }

  const closeAddDialog = () => {
    setAddIsDialogOpen(false);
  }

  const openEditDialog = () => {
    setEditIsDialogOpen(true);
  }

  const closeEditDialog = () => {
    setEditIsDialogOpen(false);
  }

  const handleDelete = () => {
    console.log("deletes assignment")
  }

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
  
  
    const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];
    
    return (
      <div>
        <h3>Assignments</h3>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>                                                
                    {headers.map((title, idx) => (<th key={idx}>{title}{idx}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.assignmentName}</td>
                      <td>{row.courseTitle}</td>
                      <td>{row.dueDate}</td>
                      <td>
                        <Link to={`/gradeAssignment/${assignments[idx].id}`} >Grade</Link>
                      </td>
                      <td><button onClick={openEditDialog}>Edit</button>
                      {isEditDialogOpen && (
                        <Dialog open={isEditDialogOpen}>
                          <DialogTitle>Edit an Assignment</DialogTitle>
                          <DialogContent>
                            <EditAssignment />
                            <button onClick={closeEditDialog}>Close</button>
                          </DialogContent>
                        </Dialog>
                      )}</td>
                      <td><button onClick={handleDelete}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={openAddDialog} id="createAs" type="button" margin="auto">Add Assignment</button>
              {isAddDialogOpen && (
                <Dialog open={isAddDialogOpen}>
                  <DialogTitle>Add an Assignment</DialogTitle>
                    <DialogContent>
                    <AddAssignment />
                    <button onClick={closeAddDialog}>Close</button>
                    </DialogContent>
                </Dialog>
              )}
          </div>
      </div>
    )
}  

export default ListAssignment;