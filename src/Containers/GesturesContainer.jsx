import { connect } from 'react-redux';
import { pickGesture } from '../actions/actions';
import Gestures from '../Components/Gestures/Gestures';


const mapStateToProps = state => ({
  endpoint: state.game.endpoint,
  bothIsReady: state.game.bothIsReady,
});

const mapDispatchToProps = dispatch => ({
  pickGesture: gesture => dispatch(pickGesture(gesture)),
});

const GesturesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gestures);

export default GesturesContainer;
