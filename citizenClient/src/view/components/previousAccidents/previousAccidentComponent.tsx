
import React from 'react'
import './preAccComp.scss';



function preAccidentComp(props: any) {
  //  const { connect, details, notifications } = props;
    const { type, date, address } = props;

    function handleComp(){
        console.log("clicked!");
    }

    return (
        <div className='AccidentCompContainer' onClick={handleComp}>
              
            <div className="type">{type} <span>:صنف الحادث</span></div>
            {/* <div className="accidentDetails"> */}
                {/* <div className="targetName">{details.name}</div>
                <div className="accidentDetails_details">{details.content}</div> */}
            <div className="date">{date} <span>:تاريخ الحادث</span></div> 
            {/* </div> */}
            <div className="address">{address} <span>:العنوان</span> </div>
        </div>
    )
}

export default preAccidentComp