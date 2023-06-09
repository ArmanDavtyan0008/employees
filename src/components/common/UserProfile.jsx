import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import {  Box, Button, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../employee/Employees";

export const UserProfile = ({profileId,setProfileId,taskProfileId,settaskProfileId}) => {
const [datas, setDatas] = React.useState([])
const [taskData, setTaskData] = React.useState([])

const handleStepBack = ()=> {
    profileId? setProfileId(''): settaskProfileId('') 
}

 useEffect(() => {
   fetch(`https://rocky-temple-83495.herokuapp.com/employees/${profileId}`)
   .then(res => res.json())
   .then(res => {
    if (typeof res === 'object') {
      console.log(res);
      setDatas(res);
    }
  })
    .catch(error => console.log(error.message))

   return () => {
    setDatas([])
    console.log('cmp did unmount');
   }
  }
, [profileId])


useEffect(() => {
  fetch(`https://rocky-temple-83495.herokuapp.com/tasks?employeeId=${profileId}`)
  .then(res => res.json())
.then (res => {
  console.log(res)
  // let array = []
  // res.map(f => array.push())
  setTaskData(res)
} )
console.log(taskData);
return () => {
  setTaskData([])
}
}, [profileId])
 
//  useEffect(() => {
//   console.log(profileId);
//  }, [profileId])
 
//  useEffect(() => {
//   console.log(taskData);
// }, [taskData])

  
  return (
    <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
    <Button variant='contained' sx={{width:200,height:40, mt:4}} onClick={handleStepBack}> Go Back</Button>
    <Typography variant='h3' sx={{mt:4}}> User  Profile</Typography> 
    <Box> 
    <TableContainer component={Paper}>
        <Table sx={{minWidth:900, mt: 8 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "20%" }}>ID</StyledTableCell>
              <StyledTableCell sx={{ width: "20%" }}>EMAIL</StyledTableCell>
              <StyledTableCell sx={{ width: "20%" }}>NAME</StyledTableCell>
              <StyledTableCell sx={{ width: "20%" }}>SURNAME </StyledTableCell>
              <StyledTableCell sx={{ width: "20%" }}>POSITION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                <StyledTableRow key={Math.random()}>
               
                  <StyledTableCell align="left" sx={{ width: "20%" }}>
                    <Typography> {datas.id} </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="left" sx={{ width: "20%" }}>
                    <Typography>{datas.email}</Typography>
                  </StyledTableCell>

                  <StyledTableCell align="left" sx={{ width: "20%" }}>
                    <Typography>{datas.name}</Typography>
                  </StyledTableCell>

                  <StyledTableCell align="left" sx={{ width: "20%" }}>
                    <Typography> {datas.surname}</Typography>
                  </StyledTableCell>

                  <StyledTableCell align="left" sx={{ width: "20%" }}>
                      <Typography>{datas.position}</Typography>
                  </StyledTableCell>

                </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant='h3' sx={{mt:4}}> ID TASKS </Typography> 
      <TableContainer component={Paper}>
        <Table sx={{minWidth:900, mt: 8 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "20%" }}>ID</StyledTableCell>
              <StyledTableCell sx={{ width: "20%" }}>NAME</StyledTableCell>
              <StyledTableCell sx={{ width: "20%" }}>START DATE</StyledTableCell>
              <StyledTableCell sx={{ width: "20%" }}>END DATE </StyledTableCell>
              <StyledTableCell sx={{ width: "20%" }}>DESCRIPTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {taskData.map((task) => (
    <StyledTableRow key={task.id}>
      <StyledTableCell align="left" sx={{ width: "20%" }}>
        <Typography>{task.id}</Typography>
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ width: "20%" }}>
        <Typography>{task.name}</Typography>
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ width: "20%" }}>
        <Typography>{task.startDate}</Typography>
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ width: "20%" }}>
        <Typography>{task.endDate}</Typography>
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ width: "20%" }}>
        <Typography>{task.description}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
    </Box>
  )
}
