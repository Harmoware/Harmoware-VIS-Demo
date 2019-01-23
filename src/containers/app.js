// app.js　mapboxを使用する場合のサンプル
import React from 'react';
import {
  Container, connectToHarmowareVis,
  HarmoVisLayers, MovesLayer, DepotsLayer,
  MovesInput, DepotsInput, SimulationDateTime,
  PauseButton, PlayButton, ForwardButton, ReverseButton, AddMinutesButton,
  ElapsedTimeRange, SpeedRange
} from 'harmoware-vis';

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; //mapbox.com から取得したAccesstoken

class App extends Container {

  render() {
    const { settime, timeBegin, timeLength, actions, clickedObject, depotsData,
      secperhour, animatePause, animateReverse, getMoveOptionChecked, getDepotOptionChecked,
      getOptionChangeChecked, viewport, routePaths, lightSettings, movesbase, movedData } = this.props;
    const optionVisible = false;

    return (
      <div>
        <div id="controller_area">
          <ul>
            <li>
              <span>運行データ</span>
              <MovesInput actions={actions} />
            </li>
            <li>
              <span>停留所データ</span>
              <DepotsInput actions={actions} />
            </li>
            <li>
              {animatePause ?
                <PlayButton actions={actions} /> :
                <PauseButton actions={actions} />
              }&nbsp;
            {animateReverse ?
                <ForwardButton actions={actions} /> :
                <ReverseButton actions={actions} />
              }
            </li>
            <li>
              <AddMinutesButton addMinutes={-10} actions={actions} />&nbsp;
            <AddMinutesButton addMinutes={-5} actions={actions} />&nbsp;
            <AddMinutesButton addMinutes={5} actions={actions} />&nbsp;
            <AddMinutesButton addMinutes={10} actions={actions} />
            </li>
            <li>
              <SimulationDateTime timeBegin={timeBegin} settime={settime} />
            </li>
            <li><span>経過時間</span>
              <ElapsedTimeRange settime={settime} timeLength={timeLength} timeBegin={timeBegin} actions={actions} />
              <span>{Math.floor(settime - timeBegin)}&nbsp;秒</span>
            </li>
            <li><span>スピード</span>
              <SpeedRange secperhour={secperhour} actions={actions} />
              <span>{secperhour}&nbsp;秒/時</span>
            </li>
          </ul>
        </div>

        <div id="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            layers={[
              new MovesLayer({ routePaths, movesbase, movedData, clickedObject, actions, lightSettings, optionVisible }),
              new DepotsLayer({ depotsData, lightSettings, actions, optionVisible }),
            ]}
          />
        </div>
      </div>
    );
  }
}
export default connectToHarmowareVis(App);