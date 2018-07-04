import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { v4 } from 'uuid';
import './converstation.scss';

const socket = io('http://localhost:4000');

class Converstation extends Component {
  constructor(props) {
    super(props);

    this.message = React.createRef();
    this.sendMessage = this.sendMessage.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  componentDidMount() {
    this.message.current.focus();
  }

  sendMessage() {
    const { gameId, playerId } = this.props;
    const msg = this.message.current.value;
    this.message.current.value = '';
    this.message.current.focus();
    socket.emit('new message', {
      room: gameId,
      msg,
      playerId,
    });
  }

  handleEnterPress(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  render() {
    const { messages } = this.props;
    console.log(messages);
    return (
      <section className="converstation">
        <div className="converstation__messages">
          {messages.length
            ? messages.map(val => (
              <div
                className={`converstation__messages-${val.sender}`}
                key={v4()}
              >
                {val.msg}
              </div>
            )).reverse()
            : <div className="converstation__messages-none">Say, Hi...</div>}
        </div>
        <div className="converstation__input">
          <input
            className="converstation__input"
            ref={this.message}
            onKeyPress={this.handleEnterPress}
            type="text"
          />
          <button onClick={() => this.sendMessage()}>Send</button>
        </div>
      </section>
    );
  }
}

Converstation.propTypes = {
  gameId: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
};

export default Converstation;
