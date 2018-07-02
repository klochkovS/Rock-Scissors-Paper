import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import GesturesContainer from '../Containers/GesturesContainer';
import GameInfoContainer from '../Containers/GameInfoContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleReady = this.handleReady.bind(this);
  }

  componentDidMount() {
    const {
      endpoint,
      newGame,
      onConnectPlayer,
      onStartGame,
      onResult,
    } = this.props;
    const socket = io(endpoint);
    newGame(socket);

    onConnectPlayer(socket);
    onStartGame(socket);
    onResult(socket);
  }

  handleReady() {
    const { endpoint, ready } = this.props;
    const socket = io(endpoint);
    ready(socket);
  }

  render() {
    const {
      bothIsOnline,
      bothIsReady,
    } = this.props;
    return (
      <div>

        <GameInfoContainer />

        {bothIsOnline
          ? (
            <button
              disabled={bothIsReady ? 'disabled' : ''}
              onClick={() => this.handleReady()}
            >
              ГОТОВ!
            </button>
          )
          : ''
        }

        <GesturesContainer />
      </div>
    );
  }
}

App.propTypes = {
  endpoint: PropTypes.string.isRequired,
  newGame: PropTypes.func.isRequired,
  onConnectPlayer: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired,
  onResult: PropTypes.func.isRequired,
  ready: PropTypes.func.isRequired,
  bothIsOnline: PropTypes.bool.isRequired,
  bothIsReady: PropTypes.bool.isRequired,
  gameStatus: PropTypes.string.isRequired,
  gesture: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
};


export default App;
