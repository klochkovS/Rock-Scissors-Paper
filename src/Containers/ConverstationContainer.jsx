import { connect } from 'react-redux';
import Converstation from '../Components/Converstation/Converstation';


const mapStateToProps = state => ({
  gameId: state.game.gameId,
  playerId: state.game.playerId,
  messages: state.messages,
});

const ConverstationContainer = connect(
  mapStateToProps,
)(Converstation);

export default ConverstationContainer;
