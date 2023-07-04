import React, { useEffect, useState } from 'react';

import "../../styles/variables.css";
import "./Controller.css";
import ControllerColors from './ControllerColors/ControllerColors';
import ControllerRange from './ControllerRange/ControllerRange';
import ControllerWhite from './ControllerWhite/ControllerWhite';

export default function Controller(props) {

  useEffect(() => {
    console.group(">> States");
    console.log(props.device);
    console.log(props.device.capabilities);
    console.groupEnd();
  },);

  let [type, setType] = useState(props.device.capabilities.find(item => item.type === "devices.capabilities.color_setting" ).state.instance === "temperature_k" ? "white" : "colors");

  return (
    <div className='controller'>
      <h4 className='controller__name'>
        {props.device.name}
      </h4>


      {
        props.device.capabilities.length === 0 ? "" : (
          <div className='controller_states'>
            {
              props.device.capabilities.map((cap) => {

                switch (cap.type) {
                  case "devices.capabilities.color_setting":
                    return (
                      <div>

                        <div className='controller_type'>
                          <button className={`controller_btn ${type === "white" ? "controller_btn--open" : ""}`} onClick={() => setType("white")}>
                            <span>Белый</span>
                          </button>
                          <button className={`controller_btn ${type === "colors" ? "controller_btn--open" : ""}`} onClick={() => setType("colors")}>
                            <span>Цветной</span>
                          </button>
                        </div>

                        {type === "white" ? (<ControllerWhite device={props.device} activity={cap} />) : ""}
                        {type === "colors" ? (<ControllerColors device={props.device} activity={cap} />) : ""}

                      </div>
                    );

                  case "devices.capabilities.range":
                    return <ControllerRange device={props.device} activity={cap} />;

                  default:
                    return "";
                }

              })
            }
          </div>
        )
      }
    </div>
  )

}
