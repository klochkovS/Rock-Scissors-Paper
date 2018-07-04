import React from 'react';
import PropTypes from 'prop-types';
import GesturesContainer from '../../Containers/GesturesContainer';
import ConverstationContainer from '../../Containers/ConverstationContainer';
import './gameScreen.scss';

const GameScreen = ({ bothIsReady, gameStatus, result, ready }) => (
  <section className="game-screen">
    <div className="game-screen__status-bar">
      <span className="result">{result}</span>
      {gameStatus}
    </div>
    <div className="game-screen__main-field">
      <ConverstationContainer />
      <GesturesContainer />
    </div>
    <button
      className="game-screen__ready-btn"
      disabled={bothIsReady ? 'disabled' : ''}
      onClick={() => ready()}
    >
      Ready!
    </button>
  </section>
);

GameScreen.propTypes = {
  bothIsReady: PropTypes.bool.isRequired,
  gameStatus: PropTypes.string.isRequired,
  ready: PropTypes.func.isRequired,
  result: PropTypes.string.isRequired,
};

export default GameScreen;
