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
      bothOnline: false,
      timer: '',
      gesture: '',
      result: '',
    };

    this.ready = this.ready.bind(this);
    this.send = this.send.bind(this);
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

  // componentWillMount() {
  //   //доделать плеера
  //   const { playerId } = this.state;
  //   console.log('1', playerId);
  //   let player = playerId ? '' : 'player2';
  //   console.log('2', player);
  //   let room = document.location.hash.replace('#', '');
  //   if (room === '') {
  //     room = `${v4()}`;
  //     player = 'player1';
  //     document.location.hash = room;
  //   }
  //   console.log('3', player);
  //   this.setState({ roomId: room, playerId: player });
  // }

  componentDidMount() {
    const { endpoint, roomId, playerId } = this.state;
    const socket = io(endpoint);
    socket.emit('new game', {
      room: roomId,
      player: playerId,
    });

    console.log('connect: ', roomId, playerId);
    socket.emit('connect player', {
      room: roomId,
      player: playerId,
    });

    socket.on('connect player', bothOnline => this.setState({ bothOnline }));

    socket.on('timer', (timer) => {
      console.log(timer);
      this.setState({ timer });
    });

    socket.on('result', (winId) => {
      const result = winId === playerId ? 'Вы победили!' : 'Вы проиграли.'
      this.setState({ result });
    });
  }

  ready() {
    const { endpoint, playerId, roomId } = this.state;
    const socket = io(endpoint);
    socket.emit('ready', {
      player: playerId,
      room: roomId,
    });
  }

  pickGesture(gesture) {
    this.setState({ gesture });
  }

  send() {
    const {
      endpoint,
      playerId,
      roomId,
      gesture,
    } = this.state;

    const socket = io(endpoint);
    socket.emit('step', {
      room: roomId,
      player: playerId,
      gesture,
    });
  }

  render() {
    return (
      <div>
        <label>id игрока: {this.state.playerId}</label>
        <hr />
        <label>
          {this.state.bothOnline ? 'Игрок 2 не в сети...' : ''}
        </label>
        <br /><label>Статус игры: </label>
        {this.state.timer ?
          <label>{this.state.timer}</label> :
          'Ожидание опонента...'
        }

        <br /><label>Результат: </label>
        {this.state.result ?
          <label>{this.state.result}</label> :
          ''
        }
        <br />
        <button onClick={() => this.ready()}>
          ГОТОВ!
        </button>
        <button onClick={() => this.send()}>
          Send gesture
        </button>
        <button id="blue" onClick={() => this.pickGesture('rock')}>Камень</button>
        <button id="red" onClick={() => this.pickGesture('scissors')}>Ножницы</button>
        <button id="red" onClick={() => this.pickGesture('paper')}>Бумага</button>
        <button id="red" onClick={() => this.pickGesture('lizard')}>Ящерица</button>
        <button id="red" onClick={() => this.pickGesture('spock')}>Спок</button>


      </div>
    );
  }
}

export default App;
