const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const play = require('./lib/game');

app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' })
    .sendFile(__dirname + '/dist/index.html');
});


/**
 * Просто общая структура хранения игр, для наглядности
 */
let games = [
  {
    roomId: '',
    players: [
      {
        id: '',
        isReady: false,
        gesture: '',
      },
      {
        id: '',
        isReady: false,
        gesture: '',
      },
    ],
  },
];


// Сброс состояний по завершению игры
const finish_game = (game) => {
  game.players[0].isReady = false;
  game.players[0].gesture = '';
  game.players[1].isReady = false;
  game.players[1].gesture = '';
};


io.on('connection', (socket) => {
  console.log('User connected');

  /**
   * Слушает событие 'new game', принимает на вход ID комнаты
   * и создает ее, если она еще не была создана
   */
  socket.on('new game', (params) => {
    const game = games.find(val => val.roomId === params.room);
    if (game === undefined) {
      const newGame = {
        roomId: params.room,
        players: [
          { id: '', isReady: false, gesture: '' },
          { id: '', isReady: false, gesture: '' },
        ],
      };
      games.push(newGame);
    }
  });

  /**
   * Слушает событие 'connect player',
   * принимает на вход ID комнаты и ID игрока,
   * находит нужную комнату и присоеденяет сокет к rooms 
   * если в комнате есть свободные месте то эмитит событие
   * 'connect player' и отдает
   * флаг bothIsOnline=true и поле gameStatus,
   * иначе присоеденяет сокет к комнате playerId 
   * и эмитит событие с полем errorMsg='Все места заняты'
   */
  socket.on('connect player', (params) => {
    const game = games.find(val => val.roomId === params.room);
    if (game !== undefined) {
      const player = game.players.find(val => val.id === '');
      if (player !== undefined) {
        player.id = params.player;
        socket.join(params.room);
        if (game.players[0].id && game.players[1].id) {
          io.to(params.room).emit('connect player', {
            bothIsOnline: true,
            gameStatus: 'Press "Ready!"',
          });
        }
      } else {
        // Все места заняты
        socket.join(params.player);
        io.to(params.player).emit('connect player', {
          bothIsOnline: false,
          errorMsg: 'All places are busy.',
        });
      }
    }
  });

  /**
   * Слушает событие 'ready', на вход принимает
   * room и player (ID), находит нужную команту и игкрока
   * и меняет флаг isReady на true
   * далее проверяет обоих игроков на флаг isReady
   * в случае успеха  эмитирует событие 'start game'
   * передавая поля gameStatus и isReady=true
   */
  socket.on('ready', (params) => {
    games.forEach((val) => {
      if (val.roomId === params.room) {
        val.players.forEach((player) => {
          if (player.id === params.player) {
            player.isReady = true;
          }
        });
        if (val.players[0].isReady
          && val.players[1].isReady) {
          io.to(params.room).emit('start game', {
            gameStatus: 'The game was start. Pick gesture!',
            isReady: true,
          });
        }
      }
    });
  });

  /**
   * Слушает событие 'step', на вход принимает
   * gesture, room и player (ID), находит нужную команту и игрока
   * записывает в в поле gesture значение переданное с клиента.
   * Если оба пользователя имеют жесты то вычисляет результат игры
   * и эмитит событие 'result' передавая в него результат
   * и список игроков данной игры, чтобы на клиенте получить жест опонента.
   * После обнуляет состояние игры
   */
  socket.on('step', (params) => {
    let result;
    games.forEach((val) => {
      if (val.roomId === params.room) {
        val.players.forEach((player) => {
          if (player.id === params.player) {
            player.gesture = params.gesture;
          }
        });

        if (val.players[0].gesture
          && val.players[1].gesture) {
          result = play(val.players[0], val.players[1]);
          io.to(params.room).emit('result', {
            result,
            gameInfo: val.players,
          });
          finish_game(val);
        }
      }
    });
  });

  /**
   * Слушает 'new message', на пход room и msg
   * эмитит событие 'new message' в соответствующую комнату
   * передает msg и playerId(айди отправителя)
   */
  socket.on('new message', (params) => {
    io.to(params.room).emit('new message', {
      msg: params.msg,
      playerId: params.playerId,
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


server.listen(1234, () => {
  console.log('App listening on port 1234!');
});
