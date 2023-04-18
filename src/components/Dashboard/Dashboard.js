import Device from "../Device/Device";
import "./Dashboard.css";
import React from "react";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            iotData: null,
            iotDataError: null,
            loadingIotData: true,
        };

        this.getIotData();

        this.onChangeDeviceStatus = this.onChangeDeviceStatus.bind(this);
    }

    /*
    Запрашивает данные умного дома из API
  */
    getIotData() {
        fetch("https://api.iot.yandex.net/v1.0/user/info", {
            headers: {
                Authorization: `Bearer ${this.props.authToken}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    if (res.status === 401) {
                        // Ошибка авторизации
                        this.onGetIotDataAuthError(
                            `${res.status}, ${res.statusText}`
                        );
                    } else {
                        // Другие ошибки
                        return Promise.reject(
                            `${res.status}, ${res.statusText}`
                        );
                    }
                }
            })
            .then((res) => {
                console.log("Res From API (dashboard)", res);

                this.setState({
                    iotData: res,
                });
            })
            .catch((err) => {
                this.onGetIotDataError(err.message || err);
            })
            .finally(() => {
                this.setState({ loadingIotData: false });
            });
    }

    /*
    Обработчик остальных ошибок запроса данных
  */
    onGetIotDataError(err) {
        this.setState({
            iotDataError: err,
        });
    }

    /*
    Обработчик ошибки получения данных вследствии невалидной авторизации (code: 401)
  */
    onGetIotDataAuthError(err) {
        this.props.onAuthTokenError(err);
    }

    onChangeDeviceStatus(device, stateDevice, index) {
        let changedIotData = this.state.iotData;

        changedIotData.devices[index].capabilities.at(-1).state = stateDevice;

        this.setState({
            iotData: changedIotData,
        });
    }

    /*
    Отрисовщик списка устройств
  */
    renderDashboard() {
        let devices = this.state.iotData.devices.map((device, index) => {
            return (
                <Device
                    authToken={this.props.authToken}
                    device={device}
                    index={index}
                    iotData={this.state.iotData}
                    onChangeDeviceStatus={this.onChangeDeviceStatus}
                />
            );
        });

        return <div className="dashboard__devices">{devices}</div>;
    }

    render() {
        let content = "";

        if (this.state.loadingIotData) {
            // Загрузка
            return <div className="dashboard__loader">Loading...</div>;
        } else if (this.state.iotDataError) {
            // Ошибка загрузки
            return (
                <div className="dashboard__error">
                    Ошибка получения данных: {this.state.iotDataError}
                </div>
            );
        } else if (this.state.iotData) {
            // Отрисовка
            return this.renderDashboard();
        }

        return <div className="dashboard">{content}</div>;
    }
}

export default Dashboard;
