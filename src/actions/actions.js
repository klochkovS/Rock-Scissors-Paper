import { v4 } from 'uuid';
import C from '../constants';


export const newGame = (socket, playerId) => {
  let gameId = document.location.hash.replace('#', '');

  const newPlayer = playerId ? playerId : v4();
  if (gameId === '') {
    gameId = v4();
    document.location.hash = gameId;
  }

  socket.emit('new game', {
    room: gameId,
    player: playerId,
  });

  return ({
    type: C.CREATE_GAME,
    gameId,
    playerId: newPlayer,
  });
};

export const onConnectPlayer = (socket, gameId, playerId) => (dispatch) => {
  socket.emit('connect player', {
    room: gameId,
    player: playerId,
  });

  socket.on('connect player', params => dispatch({
    type: C.CONNECT_PLAYER,
    bothIsOnline: params.bothIsOnline,
    gameStatus: params.gameStatus,
  }));
};

export const ready = (socket, gameId, playerId) => {
  socket.emit('ready', {
    room: gameId,
    player: playerId,
  });

  return ({
    type: C.PLAYER_READY,
    gameStatus: 'Ожидание готовности второго игрока...',
  });
};

export const onStartGame = socket => (dispatch) => {
  socket.on('start game', (params) => {
    dispatch({
      type: C.START_GAME,
      gameStatus: params.gameStatus,
      bothIsReady: params.isReady,
    });
  });
};

export const pickGesture = (socket, gameId, playerId, gesture) => {
  socket.emit('step', {
    room: gameId,
    player: playerId,
    gesture,
  });

  return ({
    type: C.PICK_GESURE,
    gameStatus: 'Соперник выбирает жест...',
    gesture,
  });
};

export const onResult = (socket, playerId) => (dispatch) => {
  socket.on('result', (params) => {
    const winId = params.result;
    const result = winId === '0'
      ? 'Ничья!'
      : winId === playerId
        ? 'Вы победили!'
        : 'Вы проиграли.';
    const opponent = params.gameInfo
      .filter(player => player.id !== playerId);
    dispatch({
      type: C.GET_RESULT,
      gameStatus: `Ваш противник выбрал - ${opponent[0].gesture}`,
      bothIsReady: false,
      gesture: '',
      result,
    });
  });
};
