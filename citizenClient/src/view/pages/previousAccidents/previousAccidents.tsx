import React from "react"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import axios from "axios";
import Navbar from '../../components/navbar/navbar'
import { fetchUser, getName, userInfo } from '../../../app/reducer/userReducer';
import AccidentComp from '../../components/previousAccidents/previousAccidentComponent';
import fetchAccident, { fetchPreviousAccident, getStatus } from '../../../app/reducer/accidentReducer';
import { getAccident } from '../../../app/reducer/accidentReducer';
import "./previousAccidents.scss";

function PreviousAccident() {
  const [accidents, setAccident] = useState([]);
  const dispatch = useAppDispatch()
  const user = useAppSelector(userInfo)
  const preAccidents = useAppSelector(getAccident)
  const status = useAppSelector(getStatus)
  const email = 'm.zmiro@hotmail.com';//user.email;//

  useEffect(() => {
    dispatch(fetchPreviousAccident({ "email": email }));
  }, []);


  async function handleGetAccident(e: any) {

    // const response= await  axios.get("/previousAccidents/get-previous-accidents").then(({ data }) => {
    //   console.log(data);
    //   setAccident(data);
    // });

  }
  // useEffect(() => {
  //     axios.get("/previousAccidents/get-previous-accidents").then(({ data }) => {
  //       console.log(data);
  //       setAccident(data);
  //     });
  //   }, []);
  return (
    <div className='AccidentContainer'>
      <h2>Your Previous Accidents</h2>
      <div className="description">
        {status === 'loading' ? <div className='loading'>Loading...</div> : preAccidents.map((accident: any, index: any) => {
          return (
            <AccidentComp key={index} type={accident.type} date={accident.date} address={accident.address} />
          );
        })}
      </div>
      <button className='chat'>Chat</button>
      <Navbar />
    </div>
  )

}
export default PreviousAccident;