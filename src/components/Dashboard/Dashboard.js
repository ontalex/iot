import './Dashboard.css';
import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        iotData: null,
        iotDataError: null,
        loadingIotData: true
    };

    this.getIotData();
  }

  /*
    Запрашивает данные умного дома из API
  */
  getIotData () {
    fetch('https://api.iot.yandex.net/v1.0/user/info', {
        headers: {
            Authorization: `Bearer ${this.props.authToken}`
        }
      })
      .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            if (res.status === 401) { // Ошибка авторизации
                this.onGetIotDataAuthError(`${res.status}, ${res.statusText}`);
            } else { // Другие ошибки
                return Promise.reject(`${res.status}, ${res.statusText}`);
            }
        }
      })
      .then((res) => {
        this.setState({
            iotData: res
        });
      }).catch((err) => {
        this.onGetIotDataError(err.message || err);
      }).finally(() => {
        this.setState({loadingIotData: false});
      })
  }

  /*
    Обработчик остальных ошибок запроса данных
  */
  onGetIotDataError (err) {
    this.setState({
        iotDataError: err
    });
  }

  /*
    Обработчик ошибки получения данных вследствии невалидной авторизации (code: 401)
  */
  onGetIotDataAuthError (err) {
    this.props.onAuthTokenError(err);
  }

  /*
    Отрисовщик списка устройств
  */
  renderDashboard () {
    let devices = this.state.iotData.devices.map((device, index) => {
        const status = this.getDeviceStatus(device);
        const room = this.getDeviceRoom(device);

        return (
            <div className="dashboard__device" key={index}>
                <div className="dashboard__device-param"><b>Имя:</b> {device.name}</div>
                {status ? <div className="dashboard__device-param"><b>Статус:</b> {status}</div> : ''}
                <div className="dashboard__device-param"><b>Тип:</b> {device.type.replace('devices.types.', '')}</div>
                {room ? <div className="dashboard__device-param"><b>Комната:</b> {room}</div> : ''}
            </div>
        );
    });

    return (
        <div className="dashboard__devices">{devices}</div>
    );
  }

  /*
    Получение статуса устройства
  */
  getDeviceStatus (device) {
    if (device.capabilities && device.capabilities[0]?.type === 'devices.capabilities.on_off') {
        return device.capabilities[0].state.value ? 'On' : 'Off'
    }
  }

  /*
    Получение имени комнаты устройства
  */
  getDeviceRoom (device) {
    if (device.room) {
        let room = this.state.iotData.rooms.find((room) => {
            return room.id === device.room
        });

        if (room) {
            return room.name;
        }
    }
  }

  render() {
    let content = '';

    if (this.state.loadingIotData) { // Загрузка
        return <div className="dashboard__loader">Loading...</div>;
    } else if (this.state.iotDataError) { // Ошибка загрузки
        return <div className="dashboard__error">Ошибка получения данных: {this.state.iotDataError}</div>;
    } else if (this.state.iotData) { // Отрисовка
        return this.renderDashboard();
    }

    return (
        <div className="dashboard">{content}</div>
    );
  }
}

export default Dashboard;
