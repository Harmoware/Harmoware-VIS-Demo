import React from 'react';
import {
  Container, connectToHarmowareVis, HarmoVisLayers, MovesLayer, MovesInput
} from 'harmoware-vis';

const MAPBOX_TOKEN = ''; //Acquire Mapbox accesstoken

const App = (props)=>{
  const { actions, clickedObject, inputFileName, viewport,
    routePaths, movesbase, movedData } = props;
  const { movesFileName } = inputFileName;
  const optionVisible = false;

  return (
    <Container {...props}>
      {React.useMemo(()=>
        <div className="harmovis_controller">
          <ul className="flex_list">
            <li className="flex_row">
              <div className="harmovis_input_button_column">
              <label htmlFor="MovesInput">
                Operation data<MovesInput actions={actions} id="MovesInput" />
              </label>
              <div>{movesFileName}</div>
              </div>
            </li>
          </ul>
        </div>
      ,[movesFileName])}
      <div className="harmovis_area">
        <HarmoVisLayers
          viewport={viewport} actions={actions}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          layers={[
            new MovesLayer({ routePaths, movesbase, movedData,
              clickedObject, actions, optionVisible }),
          ]}
        />
      </div>
    </Container>
  );
}
export default connectToHarmowareVis(App);
