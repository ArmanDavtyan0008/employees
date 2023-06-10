import React, { useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changePageName } from './redux/slicers/pageSlice'
import { Description } from './common/Description'
import { styles } from './tasks/stylesHome'

export const Home = () => {
  const dispatch = useDispatch()
  const page = useSelector(state => state.page)


 const onHandleCLickEmpl = ()=>{
    dispatch(changePageName("home"))
  }
  
  return (
    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
    <Box sx={{...styles.homeMainBox}}>  
    <Description />
    <Box sx= {{display:'flex', justifyContent:'center', alignItems:'center', width:{sm:300,md:900,lg:1200, xl:1500},  mt:6 }} > 
    <Link to={page.currentPage ==='home'? '/employees': '/'}>
    <Button variant='contained'sx={{...styles.buttonOne}} onClick={onHandleCLickEmpl}> Employees</Button>
  </Link>
  <Link to={page.secondPage === 'tasks'? '/tasks': '/employees'}>
      <Button variant='contained' sx={{...styles.buttonTwo}}>
       {page.secondPage === 'tasks' ? "Tasks" : "Employees"}</Button>
    </Link>
    </Box>
    </Box>
    </Box>
  )
}
