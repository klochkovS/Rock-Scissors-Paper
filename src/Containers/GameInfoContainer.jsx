import { connect } from 'react-redux';
import GameInfo from '../Components/GameInfo';

const mapStateToProps = state => ({
  bothIsOnline: state.bothIsOnline,
  gameStatus: state.gameStatus,
  gesture: state.gesture,
  result: state.result,
});

const GameInfoContainer = connect(mapStateToProps)(GameInfo);

export default GameInfoContainer;
