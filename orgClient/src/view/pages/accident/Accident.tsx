import React, { useEffect, useState } from 'react'
import './Accident.scss';

import AccidentComp from '../../Components/AccidentComponents/AccidentComp';
import search from '../../photos/search.png';
import settings from '../../photos/settings.png';
import chatIcon from '../../photos/chat.jpg';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAccidentsAsync } from '../../../features/accidents/accidentsReducer';
import { useNavigate } from 'react-router-dom';
import MenuAppBar from '../../Components/header/appBar';
import socketIOClient, { Socket } from "socket.io-client";
// import { DefaultEventsMap } from "socket.io/dist/typed-events";


let socket: Socket;

function Accident() {
  const accidentsReducer = useAppSelector(state => state.accidents);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [accidents, setAccidents] = useState<Array<any>>([]);
  useEffect(()=>{
    console.log(accidentsReducer.value.accidents)
    if(accidentsReducer.value.accidents.length > 0){
      setAccidents(accidentsReducer.value.accidents);
    }
  },[accidentsReducer])
  useEffect(() => {
    dispatch(fetchAccidentsAsync());
    socket = socketIOClient();
    socket.on("connect", () => {
      socket.emit("join room", `${'3'}-accidents`);
    });

    // socket.on('message', msg => {
    //   console.log(msg) // -->add to messages on DOM
    //   console.log(accidents)
    //   const found = accidents.find((elem: any) => {
    //     console.log(`elemid = ${elem._id}   accident.id = ${msg.accidentId}`)
    //     if (elem._id === msg.accidentId) {
    //       return true;
    //     }
    //   })
    //   console.log(found)
    // })
  }, [])

  useEffect(()=>{    
    socket.on('message', msg => {
      console.log(msg) // -->add to messages on DOM
      console.log(accidents)
      const found = accidents.find((elem: any) => {
        console.log(`elemid = ${elem._id}   accident.id = ${msg.accidentId}`)
        if (elem._id === msg.accidentId) {
          return true;
        }
      })
      // if(!found){

      // }
    })
  },[accidents])

  return (
    <div className='AccidentContainer'>
      <MenuAppBar type="home" />
      <div className="accidentsContent">
        {accidentsReducer.status === 'loading' ? <div>جاري التحميل...</div> :
          accidents.map((accident, index) => {
            return (
              <AccidentComp key={index} accident={accident} />
            );
          })
        }
      </div>
    </div>
  )
}

export default Accident