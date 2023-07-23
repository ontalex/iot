import React, { useEffect, useState } from 'react';

import "../../styles/variables.css";
import "./Activities.css";

import { ReactComponent as PlayIcon } from '../../assets/play.svg';

export default function Activities({ authToken, onAuthTokenError }) {

  let [data, setData] = useState(null);
  let [loadingIotData, setLoadingIotData] = useState(true);

  useEffect(() => {
    fetch("https://api.iot.yandex.net/v1.0/user/info", {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    })
      .then(data => data.json())
      .then(json => {
        console.log("From Activities: ", json);
        setData(json)
      })
      .catch(error => {
        console.log(error);
        onAuthTokenError(error)
      })
      .finally(() => setLoadingIotData(false))
  }, [authToken, onAuthTokenError]);

  function renderLoader() {
    return (
      <div className='activities__loader'>
        <p>Загрузка...</p>
      </div>
    )
  }

  function startScenario(scenario_id) {
    fetch(`https://api.iot.yandex.net/v1.0/scenarios/${scenario_id}/actions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
  }

  function renderActivities() {

    let activities = data?.scenarios.map(item => {
      return (
        <div className='activity__item' key={item.id}>
          <div className='activity__name'>
            <div className='activity__icon'></div>
            <h2>{item.name}</h2>
          </div>
          <button className='activity__btn' onClick={() => startScenario(item.id)}>
            <PlayIcon />
          </button>
        </div>
      )
    });

    return <>{activities}</>

  }

  function render() {

    if (loadingIotData) {

      return renderLoader()

    } else if (data?.scenarios.length === 0) {

      return (
        <p className='activity__none'>У вас нет сценариев</p>
      )

    } else if (data?.scenarios) {

      return renderActivities()

    }

  }

  return (
    <div className='activities'>
      <h1>Сценарии</h1>
      <div className='activities__list'>
        {render()}
      </div>
    </div>
  )
}
