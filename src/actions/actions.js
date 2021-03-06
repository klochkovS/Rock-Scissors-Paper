import io from 'socket.io-client';
import { v4 } from 'uuid';
import C from '../constants';

export const onNewMessage = socket => (dispatch, getState) => {
  const { playerId } = getState().game;
  socket.on('new message', (params) => {
    const sender = playerId === params.playerId ? 'you' : 'enemy';
    return dispatch({
      type: C.ADD_MESSAGE,
      sender,
      msg: params.msg,
    });
  });
};

export const newGame = socket => (dispatch, getState) => {
  const { playerId } = getState().game;
  let gameId = document.location.hash.replace('#', '');

  const newPlayer = !playerId ? v4() : playerId;
  if (gameId === '') {
    gameId = v4();
    document.location.hash = gameId;
  }

  socket.emit('new game', {
    room: gameId,
    player: playerId,
  });

  return dispatch({
    type: C.CREATE_GAME,
    gameId,
    playerId: newPlayer,
  });
};

export const onConnectPlayer = socket => (dispatch, getState) => {
  const { gameId, playerId } = getState().game;
  socket.emit('connect player', {
    room: gameId,
    player: playerId,
  });
  socket.on('connect player', params => dispatch({
    type: C.CONNECT_PLAYER,
    bothIsOnline: params.bothIsOnline,
    gameStatus: params.gameStatus,
    errorMsg: params.errorMsg
  }));
};

export const ready = () => (dispatch, getState) => {
  const { endpoint, gameId, playerId } = getState().game;
  console.log(getState());
  const socket = io(endpoint);
  socket.emit('ready', {
    room: gameId,
    player: playerId,
  });

  return dispatch({
    type: C.PLAYER_READY,
    gameStatus: 'Waiting for the enemy to be ready...',
    result: '',
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

export const pickGesture = gesture => (dispatch, getState) => {
  const { endpoint, gameId, playerId } = getState().game;
  const socket = io(endpoint);
  socket.emit('step', {
    room: gameId,
    player: playerId,
    gesture,
  });

  return dispatch({
    type: C.PICK_GESTURE,
    gameStatus: 'The enemy is choosing the gesture...',
    gesture,
  });
};

export const onResult = socket => (dispatch, getState) => {
  const { playerId } = getState().game;
  socket.on('result', (params) => {
    const winId = params.result;
    const result = winId === '0'
      ? 'Draw!'
      : winId === playerId
        ? 'You Won!'
        : 'You lost.';
    const opponent = params.gameInfo
      .filter(player => player.id !== playerId);
    dispatch({
      type: C.GET_RESULT,
      gameStatus: `Your enemy has picked - ${opponent[0].gesture}`,
      bothIsReady: false,
      gesture: '',
      result,
    });
  });
};
