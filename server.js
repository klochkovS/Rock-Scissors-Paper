const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const play = require('./lib/game');

app.use(express.static('dist'));
app.get('/:game_id', (req, res) => {
  console.log(req.params.game_id);
  res
    .set({ 'Access-Control-Allow-Origin': '*' })
    .json({ 'game_id': req.params.game_id });
  //res.sendFile(__dirname + '/dist/index.html');
});

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

const finish_game = (game) => {
  game.players[0].isReady = false;
  game.players[1].gesture = '';
  game.players[0].isReady = false;
  game.players[1].gesture = '';
};


io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('new game', (params) => {
    const test = games.find(val => val.roomId === params.room);
    if (test === undefined) {
      const newGame = {
        roomId: params.room,
        players: [
          { id: '', isReady: false, gesture: '' },
          { id: '', isReady: false, gesture: '' },
        ],
      };
      games.push(newGame);
    }
    console.log('New game', games[1].players);
    socket.join(params.room);
    // io.to(val).emit('message', '1_всем в комнате');
    // socket.to(val).emit('message', '2_всем кроме себя в комнате');
  });

  socket.on('connect player', (params) => {
    const game = games.find(val => val.roomId === params.room);
    if (game !== undefined) {
      const player = game.players.find(player => player.id === '');
      if (player !== undefined) {
        player.id = params.player;
      } else {
        // Все места заняты
        console.log('Все места заняты');
      }

      if (game.players[0].id && game.players[1]) {
        io.to(params.room).emit('connect player', true);
      }
    } else {
      // Игра не найдена
      console.log('Данная игра еще не была создана или уже завершилась');
    }
  });

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
          io.to(params.room).emit('timer', 'Ходите!');
        } else {
          io.to(params.room).emit('timer', 'Ждем опонента...');
        }
      }
    });
  });

  socket.on('step', (params) => {
    console.log('Прислыл фигуру', params);
    let result;
    games.forEach((val) => {
      if (val.roomId === params.room) {
        val.players.forEach((player) => {
          if (player.id === params.player) {
            player.gesture = params.gesture;
          }
        });

        //val[params.player].gesture = params.gesture;

        if (val.players[0].gesture
          && val.players[1].gesture) {
          result = play(val.players[0], val.players[1]);
          io.to(params.room).emit('result', result);
          finish_game(val);
          console.log('игра кончилась результат', games[1].players[1]);
        }
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


server.listen(4000, () => {
  console.log('App listening on port 4000!');
});
