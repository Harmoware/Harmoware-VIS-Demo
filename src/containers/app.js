import React from 'react';
import {
  Container, connectToHarmowareVis, HarmoVisLayers, MovesLayer, MovesInput
} from 'harmoware-vis';

const MAPBOX_TOKEN = 'pk.eyJ1IjoieW11Y3lzdGsiLCJhIjoiY2oxdmhhbmd0MDAwYjM4bXd1YWVodWNrcCJ9.aWxoDc0UXMVGB96b82GFKQ'; //Acquire Mapbox accesstoken

class App extends Container {
  render() {
    const { actions, clickedObject, inputFileName, viewport,
      routePaths, lightSettings, movesbase, movedData } = this.props;
    const { movesFileName } = inputFileName;
    const optionVisible = false;

    return (
      <div>
        <div className="harmovis_controller">
          <ul className="harmovis_controller__list">
            <li className="harmovis_controller__list__item button_block">
              <label htmlFor="MovesInput" className="harmovis_button">
                Operation data<MovesInput actions={actions} id="MovesInput"
                className="non_display" />
              </label>&nbsp;
              <div className="white_space_nowrap">{movesFileName}</div>
            </li>
          </ul>
        </div>
        <div className="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            layers={[
              new MovesLayer({ routePaths, movesbase, movedData,
                clickedObject, actions, lightSettings, optionVisible }),
            ]}
          />
        </div>
      </div>
    );
  }
}
export default connectToHarmowareVis(App);
