import { connect } from 'react-redux';
import App from '../Components/App';
import {
  newGame,
  onConnectPlayer,
  ready,
  onStartGame,
  pickGesture,
  onResult,
} from '../actions/actions';

const mapStateToProps = state => ({
  endpoint: state.endpoint,
  gameId: state.gameId,
  playerId: state.playerId,
  bothIsOnline: state.bothIsOnline,
  bothIsReady: state.bothIsReady,
});

const mapDispatchToProps = dispatch => ({
  newGame: socket => dispatch(newGame(socket)),
  onConnectPlayer: socket => dispatch(onConnectPlayer(socket)),
  ready: socket => dispatch(ready(socket)),
  onStartGame: socket => dispatch(onStartGame(socket)),
  onResult: socket => dispatch(onResult(socket)),
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
