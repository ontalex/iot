import Device from "../../components/Device/Device";
import "../../styles/variables.css";

import "./Dashboard.css";
import React from "react";

import Controller  from "../../components/Controller/Controller";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            iotData: null,
            iotDataError: null,
            choseDevice: null,
            loadingIotData: true
        };

        this.getIotData();

        this.onChangeDeviceStatus = this.onChangeDeviceStatus.bind(this);
        this.onChoseDevice = this.onChoseDevice.bind(this);
    }

    getIotData() { // Запрашивает данные умного дома из API
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

    onGetIotDataError(err) { //Обработчик остальных ошибок запроса данных
        this.setState({
            iotDataError: err,
        });
    }

    onGetIotDataAuthError(err) { // Обработчик ошибки получения данных вследствии невалидной авторизации (code: 401)
        this.props.onAuthTokenError(err);
    }


    onChangeDeviceStatus(device, stateDevice, index) { // измение статуса включения и выключения устроства
        let changedIotData = this.state.iotData;

        changedIotData.devices[index].capabilities.find(i => i.type === "devices.capabilities.on_off" ).state = stateDevice;

        this.setState({
            iotData: changedIotData,
        });
    }

    onChoseDevice(device) { // выбор устройства для просмотра
        console.log(device);

        this.setState({
            choseDevice: device
        });
    }

    renderDashboard() { // Отрисовщик списка устройств
        let devices = this.state.iotData.devices.map((device, index) => {
            return (
                <Device
                    authToken={this.props.authToken}
                    device={device}
                    index={index}
                    iotData={this.state.iotData}
                    onChangeDeviceStatus={this.onChangeDeviceStatus}
                    onChoseDevice={this.onChoseDevice}
                />
            );
        });

        return <div className="dashboard__devices">{devices}</div>;
    }

    renderDevice() { // Отрисовщик пульта управления устрйоством
        return (
            <Controller device={this.state.choseDevice} />
        )
    }

    render() {
        let content = "";

        if (this.state.loadingIotData) {

            // Загрузка
            return (
                <div className="dashboard__loader">
                    <p>Загружаем...</p>
                </div>
            );

        } else if (this.state.iotDataError) {

            // Ошибка загрузки
            return (
                <div className="dashboard__error">
                    <p>Ошибка получения данных: {this.state.iotDataError}</p>
                    <button className="dashboard_rerun" onClick={this.rerunAuth}><span>Сброс</span></button>
                </div>
            );

        } else if (this.state.iotData) {

            // Отрисовка устройств
            return (
                <div className={`dashboard__page dashboard__page--${this.state.choseDevice ? "open" : "close"}`}>
                    {this.renderDashboard()}
                    {this.state.choseDevice != null ? this.renderDevice() : ""}
                </div>
            );

        } else if (this.state.iotData.devices.length === 0) {

            // Отсутствую устройства
            return (
                <div className="dashboard__none">
                    <p>У вас нет устройств</p>
                </div>
            )

        }

        return <div className="dashboard">{content}</div>;
    }
}

export default Dashboard;
