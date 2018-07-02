import { connect } from 'react-redux';
import { pickGesture } from '../actions/actions';
import Gestures from '../Components/Gestures';


const mapStateToProps = state => ({
  endpoint: state.endpoint,
  bothIsReady: state.bothIsReady,
});

const mapDispatchToProps = dispatch => ({
  pickGesture: gesture => dispatch(pickGesture(gesture)),
});

const GesturesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gestures);

export default GesturesContainer;
