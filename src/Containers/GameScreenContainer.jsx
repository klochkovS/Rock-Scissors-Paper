import { connect } from 'react-redux';
import GameScreen from '../Components/GameScreen/GameScreen';
import {
  ready,
} from '../actions/actions';

const mapStateToProps = state => ({
  bothIsOnline: state.game.bothIsOnline,
  bothIsReady: state.game.bothIsReady,
  gameStatus: state.game.gameStatus,
  result: state.game.result,
});

const mapDispatchToProps = dispatch => ({
  ready: () => dispatch(ready()),
});

const GameScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreen);

export default GameScreenContainer;
