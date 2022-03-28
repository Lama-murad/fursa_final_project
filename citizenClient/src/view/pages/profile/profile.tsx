import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/navbar'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import './profile.scss'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchUser, getName, getGender } from '../../../app/reducer/userReducer';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { ButtonGroup } from '@mui/material';

import LaptopIcon from '@mui/icons-material/Laptop';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';


function Profile() {
    const userName = useAppSelector(getName)
    const userGender = useAppSelector(getGender)
    const [expanded, setExpanded] = React.useState("");
    const [updatePass, setUpdatePass] = useState({ 'currentPass': "", "newPass": "" })

    const handleChange = (panel: any) => (event: any, isExpanded: any) => {
        setExpanded(isExpanded ? panel : false);
    };
    function onChangeUpdatePass(e: any) {
        setUpdatePass({
            ...updatePass,
            [e.target.name]: e.target.value,
        })
    }
    const handleUpdatePass = (e: any) => {
        e.preventDefault()
        console.log(updatePass)
    }
    let gender = <MaleIcon style={{ color: "#3f51b5" }}></MaleIcon>
    if (userGender == "female")
        gender = <FemaleIcon style={{ color: "#FF69B4" }}></FemaleIcon>

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
        
        </Box>     
    

            <div className="profile__main__links">
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '70%', flexShrink: 0 }}>
                            تغيير كلمة المرور
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form onSubmit={handleUpdatePass}>
                            <div className="profile__main__links__password">
                                <div className="profile__main__links__password__1">
                                    <div className="profile__main__links__password__1__current">
                                        <TextField required fullWidth name="currentPass" label="كلمة المرور الحالية" variant="standard" type="password" onChange={onChangeUpdatePass} />
                                    </div>
                                    <div className="profile__main__links__password__1__new">
                                        <TextField required fullWidth name="newPass" label="كلمة المرور الجديدة" variant="standard" type="password" onChange={onChangeUpdatePass} />
                                    </div>
                                </div>
                                <Button variant="contained" fullWidth style={{ marginTop: '1rem' }} type="submit"> :تغيير كلمة المرور</Button>
                            </div>
                        </form>
                    </AccordionDetails>
                </Accordion>
            </div>
            <ButtonGroup className='buttonGroup' variant="outlined" aria-label="outlined primary button group">
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
export default Profile