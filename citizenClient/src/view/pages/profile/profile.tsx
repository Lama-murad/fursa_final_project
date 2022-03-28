import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/navbar'
import Button from '@mui/material/Button';
import './profile.scss'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getName, getGender, getRole, userInfo, logOutUser } from '../../../app/reducer/userReducer';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatIcon from '@mui/icons-material/Chat';
import Box from '@mui/material/Box';
import { ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Profile() {
  const user = useAppSelector(userInfo)
  const userGender = useAppSelector(getGender)
  const [expanded, setExpanded] = React.useState("");
  const [updatePass, setUpdatePass] = useState({ 'currentPass': "", "newPass": "" })
  const userRole = useAppSelector(getRole);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
    <div className="profile">
      <Navbar></Navbar>
      <div className='profile__title'>الملف الشخصي</div>
      <div className="profile__photo">
        <img src="https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration-.jpg"></img>
      </div>
      {userRole == "anonymous" ? (<div className='profile__btn'><Button variant="contained" style={{ width: "13.6875rem", backgroundColor: "#35b0d2", marginBottom: "0.5rem" }} type="submit" onClick={() => { navigate('/signup') }}>Register</Button>
        <Button variant="contained" style={{ backgroundColor: "#35b0d2", width: "13.6875rem", marginBottom: "0.5rem" }} type="submit" onClick={() => { navigate('/login') }}>Log in</Button></div>) :
        (<div className="profile__user"><div className='profile__name'>{user.name}</div>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1rem" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="email"
              disabled
              id="email_text"
              defaultValue={user.email}
              size="small"
              sx={{ marginBottom: "0.5rem" }}
            />
            <TextField
              label="city"
              disabled
              id="city_text"
              defaultValue={user.location}
              size="small"
            />
          </Box>
          <div className="profile__links">
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
                        <TextField required fullWidth name="currentPass" label="كلمة المرور الحالية" variant="standard" type="password" onChange={onChangeUpdatePass} autoComplete={"off"} />
                      </div>
                      <div className="profile__main__links__password__1__new">
                        <TextField required fullWidth name="newPass" label="كلمة المرور الجديدة" variant="standard" type="password" onChange={onChangeUpdatePass} autoComplete={"off"} />
                      </div>
                    </div>
                    <Button variant="contained" fullWidth style={{ marginTop: '1rem' }} type="submit"> :تغيير كلمة المرور</Button>
                  </div>
                </form>
              </AccordionDetails>
            </Accordion>
          </div></div>)}
      <div className="profile__btn">
        <Button fullWidth value="chat" style={{ backgroundColor: "#8CBB46", width: "13.6875rem", marginBottom: "0.5rem" }} variant="contained" onClick={() => navigate('/previousAccidents')} >حوادث سابقة</Button>
        {userRole != "anonymous" ?
          <Button fullWidth value="logout" style={{ backgroundColor: "#8CBB46", width: "13.6875rem" }} variant="contained" onClick={(e: any) => { e.preventDefault(); dispatch(logOutUser()) }} >الخروج</Button> :
          (<></>)}
      </div>
    </div >
  )
}
export default Profile