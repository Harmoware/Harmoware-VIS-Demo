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
    const { settime, timeBegin, timeLength, actions, clickedObject, depotsData, inputFileName,
      secperhour, animatePause, animateReverse, getMoveOptionChecked, getDepotOptionChecked,
      getOptionChangeChecked, viewport, routePaths, lightSettings, movesbase, movedData, loading } = this.props;
    const { movesFileName, depotsFileName } = inputFileName;
    const optionVisible = false;
    const nowrapstyle = { whiteSpace: 'nowrap' };

    return (
      <div>
        <div className="harmovis_controller">
          <ul className="list-group harmovis_controller__list">
            <li className="harmovis_controller__list__item button_block">
              <label htmlFor="MovesInput" className="harmovis_button">
                運行データ<MovesInput actions={actions} id="MovesInput" style={{ display: 'none' }} />
              </label>&nbsp;
              <div style={nowrapstyle}>{movesFileName}</div>
            </li>
            <li className="harmovis_controller__list__item button_block">
              <label htmlFor="DepotsInput" className="harmovis_button">
                停留所データ<DepotsInput actions={actions} id="DepotsInput" style={{ display: 'none' }} />
              </label>&nbsp;
              <div style={nowrapstyle}>{depotsFileName}</div>
            </li>
            <li className="harmovis_controller__list__item button_block">
              {animatePause ?
                <PlayButton actions={actions} /> : <PauseButton actions={actions} />
              }&nbsp;
              {animateReverse ?
                <ForwardButton actions={actions} /> : <ReverseButton actions={actions} />
              }
            </li>
            <li className="harmovis_controller__list__item button_block">
              <AddMinutesButton addMinutes={-5} actions={actions} />&nbsp;
              <AddMinutesButton addMinutes={5} actions={actions} />
            </li>
            <li className="harmovis_controller__list__item button_block">
              <AddMinutesButton addMinutes={-10} actions={actions} />&nbsp;
              <AddMinutesButton addMinutes={10} actions={actions} />
            </li>
            <li className="harmovis_controller__list__item button_block">
              <NavigationButton buttonType="compass" actions={this.props.actions} viewport={this.props.viewport} />&nbsp;
              <NavigationButton buttonType="zoom-in" actions={this.props.actions} viewport={this.props.viewport} />&nbsp;
              <NavigationButton buttonType="zoom-out" actions={this.props.actions} viewport={this.props.viewport} />
            </li>
            <li className="harmovis_controller__list__item">
              <SimulationDateTime timeBegin={timeBegin} settime={settime} />
            </li>
            <li className="harmovis_controller__list__item">
              <span>経過時間</span>&nbsp;<span><ElapsedTimeValue settime={settime} timeLength={timeLength} timeBegin={timeBegin} actions={actions} />&nbsp;秒</span>
              <ElapsedTimeRange settime={settime} timeLength={timeLength} timeBegin={timeBegin} actions={actions} />
            </li>
            <li className="harmovis_controller__list__item">
              <span>スピード</span>&nbsp;<span><SpeedValue secperhour={secperhour} actions={actions} />&nbsp;秒/時</span>
              <SpeedRange secperhour={secperhour} actions={actions} />
            </li>
          </ul>
        </div>

        <div className="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            layers={[
              new MovesLayer({ routePaths, movesbase, movedData, clickedObject, actions, lightSettings, optionVisible }),
              new DepotsLayer({ depotsData, lightSettings, actions, optionVisible }),
            ]}
          />
        </div>
        <div className="harmovis_footer" id="footer_area">
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