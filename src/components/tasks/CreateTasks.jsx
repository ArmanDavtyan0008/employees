import React, { useEffect, useState } from 'react'
import { Button, MenuItem, Select } from '@mui/material';

export const CreateTasks = ({isTaskEditing,setIsTaskEditing,taskUpdatedId, setTaskUpdatedId}) => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
      fetch("https://rocky-temple-83495.herokuapp.com/employees")
        .then((res) => res.json())
        .then((res) => setData(res));
    }, []);

    const handleSubmit =  (event) => {
      event.preventDefault();
   
    const employee = data.find((emp) => emp.name === name);

      const task = {
        name,
        // id: employee.id,
        id,
        startDate,
        endDate,
        description,
      };

      if (isTaskEditing) {
        fetch(`https://rocky-temple-83495.herokuapp.com/tasks/${taskUpdatedId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
          })
            .then((response) => response.json())
            .then((data) => {
            })
            .catch((error) => {
              console.error(error);
            });
            setName('')
            setId('')
            setStartDate('')
            setEndDate('')
            setDescription('')
            setIsTaskEditing(!isTaskEditing)
      } else {
  
      fetch('https://rocky-temple-83495.herokuapp.com/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .catch(({message}) => {
          console.error(message);
        });
        setName('')
        setId('')
        setStartDate('')
        setEndDate('')
        setDescription('')
    }
    };
  
    return (
        <div style={{ marginTop: 100 }}>
        <h2> {isTaskEditing? 'Update Task': "Create Task"}</h2>
        <form onSubmit={handleSubmit}> 
          <label style={{"marginRight":20 }} > Name </label>
          <Select style={{"width": 80 , 'height': 40}} value={name} onChange={(event) => setName(event.target.value)}>
            {data.map((emp) => (
              <MenuItem key={Math.random()}  value={emp.name} onChange={(e) => setName(e.target.value) } required>
                {emp.name}
              </MenuItem>
            ))}
          </Select>


        <label style={{'color':'#1976D2'}}> Start Date </label>
        <input
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          required
        />

      <label style={{'color':'#1976D2'}} > End Date </label>
        <input
          type="date"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          required
        />

        <label style={{'color':'#1976D2'}} > Description </label>
        <input
        required
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        /> 
        <Button sx={{width:100}} variant = 'contained'style={{"marginLeft":20}} type="submit"> { isTaskEditing ? "Update": "Create"} </Button>
      </form>
    </div>
    )
    }
