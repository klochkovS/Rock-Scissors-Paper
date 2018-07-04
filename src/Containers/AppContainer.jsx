import { connect } from 'react-redux';
import App from '../Components/App';
import {
  newGame,
  onConnectPlayer,
  onStartGame,
  onResult,
  onNewMessage,
} from '../actions/actions';

const mapStateToProps = state => ({
  endpoint: state.game.endpoint,
  bothIsOnline: state.game.bothIsOnline,
  gameStatus: state.game.gameStatus,
  errorMsg: state.game.errorMsg,
});

const mapDispatchToProps = dispatch => ({
  newGame: socket => dispatch(newGame(socket)),
  onConnectPlayer: socket => dispatch(onConnectPlayer(socket)),
  onStartGame: socket => dispatch(onStartGame(socket)),
  onResult: socket => dispatch(onResult(socket)),
  onNewMessage: socket => dispatch(onNewMessage(socket)),
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
