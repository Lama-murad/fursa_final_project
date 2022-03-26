import React from 'react'
import Navbar from '../../components/navbar/navbar'
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import './style.scss'
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import LaptopIcon from '@mui/icons-material/Laptop';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const  Report = () => {

  return (
    <div className="profile__main">
  
      <ChevronLeftIcon  sx={{ fontSize: 40 }}/>
      <h3 className='headingInfo'>report accident</h3>
    
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="my info"
          id="outlined-select-currency"
          defaultValue="معلومات"
          size="small"
        />
        
      </div>
      <div>
        <TextField
          
          id="standard-size-normal"
          defaultValue="location"
          variant="standard"
        />
        
      </div>
      <div>
        <TextField
          
          id="standard-size-normal"
          defaultValue="description"
          variant="standard"
         
        />
        
      </div>
      <div>
        <TextField
          id="standard-size-normal"
          defaultValue="attach image "
          variant="standard"
         
        />
        
      </div>
      
    </Box>
    <ButtonGroup className='buttonGroup' variant="outlined" aria-label="outlined primary button group">

  <Button  className='chatInfo'>REPORT A CASE</Button>
</ButtonGroup>
<Box
      sx={{
        '& > :not(style)': {
          m: 2,
        },
      }}
    >
    
      <MapsHomeWorkIcon sx={{ fontSize: 40 }} />
      <LaptopIcon  sx={{ fontSize: 40 }}/>
      <MessageIcon  sx={{ fontSize: 40 }}/>
      <PersonIcon  sx={{ fontSize: 40 }}/>
     
    </Box>

    </div>

  )
}


export default Report
