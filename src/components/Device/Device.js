import React from "react";
import "./Device.css";

class Device extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: this.getDeviceStatus(this.props.device),
            room: this.getDeviceRoom(this.props.device),
            isOn: this.props
        };
    }

    onChangeDeviceStatus(device, stateDevice, index) {
        this.props.onChangeDeviceStatus(device, stateDevice, index);
    }

    /*
    Получение статуса устройства
  */
    getDeviceStatus(device) {
        // Статус активности всегда последний в череди, получем его
        if (
            device.capabilities &&
            device.capabilities.at(-1)?.type === "devices.capabilities.on_off"
        ) {
            return device.capabilities.at(-1).state.value ? "On" : "Off";
        }
    }

    /*
    Получение имени комнаты устройства
  */
    getDeviceRoom(device) {
        if (device.room) {
            let room = this.props.iotData.rooms.find((room) => {
                return room.id === device.room;
            });

            if (room) {
                return room.name;
            }
        }
    }



    newJsonDeviseStatus(device, newState, typeAction) {
        return {
            devices: [
                {
                    id: `${device.id}`,
                    actions: [
                        {
                            type: `devices.capabilities.${typeAction}`,
                            state: newState,
                        },
                    ],
                },
            ],
        };
    }

    onChangeStatusDevice(device) {
        // Изменяет состояние устрйоства (включить\выключить)

        let newState = {
            // Сделть изменение статуса более универсальным, передавая ещё и тип навыка
            instance: device.capabilities.at(-1).state.instance,
            value: !device.capabilities.at(-1).state.value,
        };

        // Запрос отправки нового состояния устройства
        fetch("https://api.iot.yandex.net/v1.0/devices/actions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.props.authToken}`,
            },
            body: JSON.stringify(
                this.newJsonDeviseStatus(device, newState, "on_off")
            ),
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

                this.onChangeDeviceStatus(device, newState, this.props.index)

                this.setState({
                    isOn: newState.value,
                    status: this.getDeviceStatus(device)
                })
            });
    }

    render() {
        return (
            <div className="device_card">
                <div className="dashboard__device-param">
                    <b>Имя:</b> {this.props.device.name}
                </div>
                {this.state.status ? (
                    // Если присутствует какой-либо статут - значит можно выкючить или включить => нужна кнопка
                    <div className="dashboard__device-event">
                        <button
                            onClick={() =>
                                this.onChangeStatusDevice(this.props.device)
                            }
                        >
                            {this.state.isOn
                                ? "Выключить"
                                : "Включить"}
                        </button>
                        <div className="dashboard__device-param">
                            <b>Статус (включено):</b> {this.state.status}
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <div className="dashboard__device-param">
                    <b>Тип:</b>{" "}
                    {this.props.device.type.replace("devices.types.", "")}
                </div>
                {this.state.room ? (
                    <div className="dashboard__device-param">
                        <b>Комната:</b> {this.state.room}
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default Device;
