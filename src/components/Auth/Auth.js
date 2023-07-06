import "./Auth.css";
import React from "react";

import "../../styles/variables.css";
import "./Auth.css";

import ButtonTheme from "../ButtonTheme/ButtonTheme";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = { authToken: this.props.authToken };

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    /*
          Обработчик нажатия "сохранить". Записывает токен в localStorage
      */
    onSave() {
        if (this.state.authToken) {
            localStorage.authToken = this.state.authToken;
            this.props.onAuthTokenChange(this.state.authToken);
        }
    }

    onChange(event) {
        this.setState({ authToken: event.target.value });
    }

    render() {
        const authUrl =
            "https://oauth.yandex.ru/authorize?response_type=token&client_id=89fdd482e8104838be4051958b7a1507";

        return (
            <div className="auth">
                {this.props.authError ? (
                    <div className="auth__error">
                        Ошибка авторизации: {this.props.authError}
                    </div>
                ) : (
                    ""
                )}
                <h1 className="auth_header">Авторизация</h1>
                <input
                    type="text"
                    placeholder="Введите ваш токен"
                    value={this.state.authToken}
                    onChange={this.onChange}
                    className="auth__input"
                />
                <div className="btn_box">
                    <button className="auth__save" onClick={this.onSave}>
                        <span>Войти</span>
                    </button>
                    <a
                        href={authUrl}
                        className="auth__get-token"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span>Получить</span>
                    </a>
                </div>
                <ButtonTheme/>
            </div>
        );
    }
}

export default Auth;
