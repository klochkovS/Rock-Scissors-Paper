import React, { Component } from 'react';
import io from 'socket.io-client';
import { v4 } from 'uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'http://localhost:4000',
      roomId: '',
      playerId: '',
      bothIsOnline: false,
      bothIsReady: false,
      timer: '',
      gameStatus: '',
      gesture: '',
      result: '',
    };

    this.ready = this.ready.bind(this);
    this.pickGesture = this.pickGesture.bind(this);
  }

  componentWillMount() {
    const { playerId } = this.state;
    let newRoom = document.location.hash.replace('#', '');

    const newPlayer = playerId ? playerId : v4();
    if (newRoom === '') {
      newRoom = v4();
      document.location.hash = newRoom;
    }
    this.setState({ roomId: newRoom, playerId: newPlayer });
  }

  componentDidMount() {
    const { endpoint, roomId, playerId } = this.state;
    const socket = io(endpoint);
    socket.emit('new game', {
      room: roomId,
      player: playerId,
    });

    socket.emit('connect player', {
      room: roomId,
      player: playerId,
    });

    socket.on('connect player', params => this.setState({
      bothIsOnline: params.bothIsOnline,
      gameStatus: params.gameStatus,
    }));

    socket.on('start game', (params) => {
      this.setState({
        timer: params.timer,
        gameStatus: params.gameStatus,
        bothIsReady: params.isReady,
      });
    });

    socket.on('result', (params) => {
      const winId = params.result;
      const result = winId === '0'
        ? 'Ничья!'
        : winId === playerId
          ? 'Вы победили!'
          : 'Вы проиграли.';
      const opponent = params.gameInfo.filter(player => player.id !== playerId);
      this.setState({
        gesture: '',
        bothIsReady: false,
        result,
        gameStatus: `Ваш противник выбрал - ${opponent[0].gesture}`,
      });
    });
  }

  ready() {
    const { endpoint, playerId, roomId } = this.state;
    const socket = io(endpoint);
    socket.emit('ready', {
      player: playerId,
      room: roomId,
    });
    this.setState({ gameStatus: 'Ожидание готовности второго игрока...' });
  }

  pickGesture(gesture) {
    const {
      endpoint,
      playerId,
      roomId,
    } = this.state;

    const socket = io(endpoint);
    socket.emit('step', {
      room: roomId,
      player: playerId,
      gesture,
    });
    this.setState({ gameStatus: 'Соперник выбирает жест...', gesture });
  }

  render() {
    return (
      <div>
        <label>
          {this.state.bothIsOnline ? '' : 'Игрок 2 не в сети...'}
        </label>
        <br /><label>Статус игры: </label>
        {this.state.gameStatus ?
          <label>{this.state.gameStatus}</label> :
          ''
        }

        <br /><label>Результат: </label>
        {this.state.result ?
          <label>{this.state.result}</label> :
          ''
        }
        <br />
        {this.state.gesture ?
          <label>Вы выбрали: {this.state.gesture}</label> :
          ''
        }
        <hr />
        {this.state.bothIsOnline ?
          <button
            disabled={this.state.bothIsReady ? 'disabled' : ''}
            onClick={() => this.ready()}
          > ГОТОВ!
          </button> : ''
        }

        <button
          disabled={this.state.bothIsReady ? '' : 'disabled'}
          id="blue"
          onClick={() => this.pickGesture('rock')}
        >
          Камень
        </button>
        <button disabled={this.state.bothIsReady ? '' : 'disabled'} id="red" onClick={() => this.pickGesture('scissors')}>Ножницы</button>
        <button disabled={this.state.bothIsReady ? '' : 'disabled'} id="red" onClick={() => this.pickGesture('paper')}>Бумага</button>
        <button disabled={this.state.bothIsReady ? '' : 'disabled'} id="red" onClick={() => this.pickGesture('lizard')}>Ящерица</button>
        <button disabled={this.state.bothIsReady ? '' : 'disabled'} id="red" onClick={() => this.pickGesture('spock')}>Спок</button>


      </div>
    );
  }
}

export default App;
