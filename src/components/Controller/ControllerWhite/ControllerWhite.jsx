import React from "react";

import "../../../styles/variables.css";
import "./ControllerWhite.css";

export default function ControllerWhite(props) {
    let { device, activity } = props;

    let variants = [
        { name: "Огненный белый", value: 1500, color: "#FFB057" },
        { name: "Мягкий белый", value: 2700, color: "#FFB057" },
        { name: "Тёплый белый", value: 3400, color: "#FFC885" },
        { name: "Белый", value: 4500, color: "#FFDFB8" },
        { name: "Дневной белый", value: 5600, color: "#F7D5A1" },
        { name: "Холодный белый", value: 6500, color: "#F0F3FA" },
        { name: "Туманный белый", value: 7500, color: "#F0F3FA" },
        { name: "Небесный белый", value: 9000, color: "#F0F3FA" },
    ];

    let sendColor = (value) => {
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
                                type: "devices.capabilities.color_setting",
                                state: {
                                    instance: "temperature_k",
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

    return (
        <div className="controller_white">
            {variants
                .filter(
                    (item) =>
                        item.value <= activity.parameters.temperature_k.max &&
                        item.value >= activity.parameters.temperature_k.min
                )
                .map((item) => {
                    return (
                        <button
                            className="white_btn"
                            style={{ backgroundColor: item.color }}
                            onClick={() => sendColor(item.value)}
                        >
                            <span>{item.name}</span>
                        </button>
                    );
                })}
        </div>
    );
}
