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



const Profileinfo = () => {

  return (
    <div className="profile__main">
   
    <div>
      <h3 className='headingInfo'>الملف الشخصى</h3>
            <div className="profile__main__photo">
                <img src="https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration-.jpg"></img>
            </div>
            <h4 className='headingInfo'>اسم المستخدم</h4>

    </div>
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
          id="outlined-size-small"
          defaultValue="معلومات"
          size="small"
        />
        
      </div>
      <div>
        <TextField
          label="email"
          id="outlined-size-small"
          defaultValue="الايميل"
          size="small"
        />
        
      </div>
      <div>
        <TextField
          label="city"
          id="outlined-size-small"
          defaultValue="المدينة"
          size="small"
         
        />
        
      </div>
    </Box>
    <ButtonGroup className='buttonGroup' variant="outlined" aria-label="outlined primary button group">

  <Button  className='chatInfo'>المحادثة</Button>
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
//
--

export default Profileinfo
