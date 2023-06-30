import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

import "./ControllerRange.css";

export default function ControllerRange(props) {
    
    let {device, activity} = props;
    
    let [value, setValue] = useState([activity.state.value])

    let sendLight = (value) => {
        console.log(value);
        fetch("https://api.iot.yandex.net/v1.0/devices/actions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({
                devices: [
                    {
                        id: device.id,
                        actions: [
                            {
                                type: "devices.capabilities.range",
                                state: {
                                    instance: "brightness",
                                    value: value,
                                },
                            },
                        ],
                    },
                ],
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`${res.status}, ${res.statusText}`);
                }
            })
            .then((res) => {
                console.log("Res From API (device)", res);
                console.log("IS ON DEVICE", this.state.isOn);
            });
    };

    const STEP = 1;
    const MIN = 0;
    const MAX = 100;

    useEffect(() => {
      console.group(">> Controller Range");
      console.log(">> device", device);
      console.log(">> activity", activity);
      console.groupEnd();
    });

    return (
        <div>
            <div
                className="controller_box"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    margin: "2em",
                }}
                onMouseUp={ () => sendLight(value[0]) }
            >
                <Range
                    values={value}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={(values) => setValue(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "min-content",
                                display: "flex",
                                width: "100%",
                                background: "#0000",
                                padding: "16px",
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "36px",
                                    width: "100%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                        values: value,
                                        colors: ["#c0c0c0", "#fff"],
                                        min: MIN,
                                        max: MAX,
                                    }),
                                    alignSelf: "center",
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "42px",
                                width: "42px",
                                borderRadius: "4px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA",
                            }}
                        >
                            <div
                                style={{
                                    height: "16px",
                                    width: "16px",
                                    borderRadius: "16px",
                                    backgroundColor: isDragged
                                        ? "#c0c0c0"
                                        : "#CCC",
                                }}
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
