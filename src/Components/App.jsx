import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import WaitScreen from './WaitSreen/WaitScreen';
import GameScreenContainer from '../Containers/GameScreenContainer';
import '../styles/app.scss';

class App extends Component {
  componentWillMount() {
    const {
      endpoint,
      newGame,
      onConnectPlayer,
      onStartGame,
      onResult,
      onNewMessage,
    } = this.props;
    const socket = io(endpoint);

    newGame(socket);
    onConnectPlayer(socket);
    onStartGame(socket);
    onResult(socket);
    onNewMessage(socket);
  }

  render() {
    const { bothIsOnline, gameStatus, errorMsg } = this.props;
    return (
      <section>
        {errorMsg ?
          <div className="alert">{errorMsg}</div> :
          ''
        }
        {bothIsOnline ? <GameScreenContainer /> : <WaitScreen {...gameStatus} />}
      </section>
    );
  }
}

App.propTypes = {
  endpoint: PropTypes.string.isRequired,
  gameStatus: PropTypes.string.isRequired,
  newGame: PropTypes.func.isRequired,
  onConnectPlayer: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired,
  onResult: PropTypes.func.isRequired,
  onNewMessage: PropTypes.func.isRequired,
  bothIsOnline: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
};


export default App;
