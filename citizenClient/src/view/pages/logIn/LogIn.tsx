import React, { useEffect, useState } from "react";
import "./logIn.scss";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchUser, getloginState } from '../../../app/reducer/userReducer';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Backdrop, Link } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useAppDispatch()
  let isLoged = useAppSelector(getloginState)
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoged) {
      console.log(isLoged);
      navigate("/");
    }
  }, [isLoged])
  function hadleSubmit(e: any) {
    e.preventDefault();

    dispatch(fetchUser({ "email": email, "password": password }));
    if (isLoged) {
      console.log(isLoged)
      navigate("/profile")
    }


  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function hadleForgetPassword(ev:any){
   console.log(email,'///')
   axios.patch('/users/update-user-password',{email:email,password:newPassword})
   console.log(newPassword)
  }
  return (
    <div className="login">
      <Navbar></Navbar>
      <div className="login__main">
        <h1> تسجيل الدخول </h1>
        <form onSubmit={hadleSubmit}>
          <TextField required name="email" label="Email" variant="standard" onChange={(e: any) => setEmail(e.target.value)} />
          <TextField required name="password" label="Password" variant="standard" type="password" onChange={(e: any) => setPassword(e.target.value)} />
          <div className="login__main__remember">
            <input type="checkbox" id="remember" value="remember" />
            <span>تذكرني  </span>
          </div>
         
      <Button onClick={handleOpen}>نسيت كلمة المرور</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ادخل كلمة مرور جديدة
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div style={{display:'flex',flexDirection:'column'}}>
          <TextField required name="email" label="Email" variant="standard" onChange={(e: any) => setEmail(e.target.value)} />
          <TextField required name="password" label="Password" variant="standard" type="password" onChange={(e: any) => setNewPassword(e.target.value)} />
          <Button onClick={hadleForgetPassword}>تأكيد</Button>
      </div>          
      </Typography>
        </Box>
      </Modal>
          <Button variant="contained" style={{ marginTop: '1rem' }} type="submit">تسجيل الدخول</Button>
          { }
        </form>
      </div>
    </div>
  );
}
export default LogIn;
