import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './waitScreen.scss';

class WaitScreen extends Component {
  constructor(props) {
    super(props);

    this.shareLinkRef = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.shareLinkRef.current.focus();
    const lastChar = this.shareLinkRef.current.value.length;
    this.shareLinkRef.current.setSelectionRange(0, lastChar);
  }

  render() {
    const { gameStatus } = this.props;
    return (
      <div className="waiting-screen">
        <label htmlFor="share-link">Share this link with your friend to start the game.</label>
        <input
          ref={this.shareLinkRef}
          onClick={this.focusTextInput}
          id="share-link"
          type="text"
          value={document.location.href}
        />
        <label htmlFor="">{gameStatus}</label>
      </div>
    );
  }
}

WaitScreen.propTypes = {
  gameStatus: PropTypes.string.isRequired,
}


export default WaitScreen;
