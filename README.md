# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Documentation iot-dashboard-app

Данную секцию документа можно считать сопровождающим материалом для приложения. Здесь описаны компоненты которые используются в проекте, а также функционал которым они располагают. 

Описание компонентов включает в себя:
* Краткий смысл компонента
* Методы компонента

Описание функций включает в себя: 
* Наименование функции
* Описание того, что функция делает
* Возможность передачи этой функции другие компоненты

## Component `App`

Главный компонент отвечающий за отображение страниц-комонентов панели умного дома.

* `onAuthTokenChange` (публичная) - Обработчик изменения токена в Auth, скрывает форму и запрашивает дашборд с устройствами;

* `onAuthTokenError` (публичная) - Обработчик ошибки получения данных вследствии невалидной авторизации (code: 401);

* `onChangeWindow` (публичная) - Функция переключения окна приложения. Передаваемая функция в компонент `Menu` для последующего вызова по кнопке-переключатилю окон.

## Component `Auth`

Компонент отвечающий за авторизацию пользователя, а также получение индивидуального токена доступа к устройсвам умного дома, согласно данным аккаунта Яндекс.

* `onSave` (локальная) - Обработчик нажатия "сохранить". Записывает токен в localStorage.

* `onChange` (локальная) - Обработчик измения токина в поле ввода. Сохранает данные в виде значения объекта-состояния.

## Component `Device`

Компонент отвечающий за отображение наименования устройства, а также кнопки отвечающие за включение и включения дальнего устройств, открытия подробной информации об этом устройстве.

* `onChangeDeviceStatus` () - Обёртка для проброшенной функции внутрь компонента. Отвечаеющей за измение статуса включения и выключения устроства.
* `getDeviceStatus` () - Получение статуса устройства.
* `getDeviceRoom` () - Получение имени комнаты устроства.
* `newJsonDeviseStatus` () - Возвращает JSON строку с состоянием активности устроства.
* `onChangeStatusDevice` () - Изменяет объект состояня устройства и отправляет данные на сервер.
* `onChoseDevice` () - Измение открытого контроллера устройства. Обновляет состояние открытого устровства в компоненте `Menu`

## Component `Menu`

Компонент отвечающий за переключения страниц приложения. Основная механика приключения страницы реализована за счет кнопок входящих в данный компонент.

* `onChangeWindow` () - Обёртка для пробрасываемой функции изменения окна приложения.

## Page `Dashboard`

Компонент-страница отвечающий за показ зарегестрирвоанных устройств пользователя, а также панели управления для выбранного пользователем устройства.

* `getIotData` () - Запрашивает данные умного дома из API.
* `onGetIotDataError` () - Обработчик остальных ошибок запроса данных.
* `onGetIotDataAuthError` () - Обёртка проброшеного обработчика ошибки получения данных вследствии невалидной авторизации (code: 401).
* `onChangeDeviceStatus` () - измение статуса включения и выключения устроства.
* `renderDashboard` () - Отрисовщик списка устройств умного дома.
* `renderDevice` () - Отрисовщик пульта управления девайса.

## Page `Profile`

Компонент-страница отвечающая за показ пользователюего токен и панели выхода из аккаунта. Включает в себя список рекомендованных сервисов Яндекса.

* `rerunAuth` () - Очистка кеш (выход из приложения)