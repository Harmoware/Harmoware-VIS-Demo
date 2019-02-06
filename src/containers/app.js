// app.js　mapboxを使用する場合のサンプル
import React from 'react';
import { FPSStats } from 'react-stats';
import {
  Container, connectToHarmowareVis, ElapsedTimeValue, SpeedValue,
  HarmoVisLayers, MovesLayer, DepotsLayer, NavigationButton,
  MovesInput, DepotsInput, SimulationDateTime,
  PauseButton, PlayButton, ForwardButton, ReverseButton, AddMinutesButton,
  ElapsedTimeRange, SpeedRange, LoadingIcon
} from 'harmoware-vis';

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; //mapbox.com から取得したAccesstoken

class App extends Container {

  render() {
    const { settime, timeBegin, timeLength, actions, clickedObject, depotsData,
      secperhour, animatePause, animateReverse, getMoveOptionChecked, getDepotOptionChecked,
      getOptionChangeChecked, viewport, routePaths, lightSettings, movesbase, movedData, loading } = this.props;
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
              <NavigationButton buttonType="compass" actions={this.props.actions} viewport={this.props.viewport} />&nbsp;
              <NavigationButton buttonType="zoom-in" actions={this.props.actions} viewport={this.props.viewport} />&nbsp;
              <NavigationButton buttonType="zoom-out" actions={this.props.actions} viewport={this.props.viewport} />
            </li>
            <li>
              <SimulationDateTime timeBegin={timeBegin} settime={settime} />
            </li>
            <li><span>経過時間</span>
              <ElapsedTimeRange settime={settime} timeLength={timeLength} timeBegin={timeBegin} actions={actions} />
              <span><ElapsedTimeValue settime={settime} timeLength={timeLength} timeBegin={timeBegin} actions={actions} />&nbsp;秒</span>
            </li>
            <li><span>スピード</span>
              <SpeedRange secperhour={secperhour} actions={actions} />
              <span><SpeedValue secperhour={secperhour} actions={actions} />&nbsp;秒/時</span>
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
        <div id="footer_area">
          <a href="http://www.city.sabae.fukui.jp/users/tutujibus/web-api/web-api.html" rel="noopener noreferrer" target="_blank">
            「つつじバスロケーションWEB API」で取得したデータを使用しています。</a>
          <FPSStats isActive />
        </div>
        <LoadingIcon loading={loading} />
      </div>
    );
  }
}
export default connectToHarmowareVis(App);