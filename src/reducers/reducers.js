import C from '../constants';


export const message = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_MESSAGE:
      return {
        id: action.id,
        sender: action.sender,
        msg: action.msg,
      };
    default:
      return state;
  }
};

export const messages = (state = [], action) => {
  switch (action.type) {
    case C.ADD_MESSAGE:
      return [
        ...state,
        message({}, action),
      ];
    default:
      return state;
  }
};

export const game = (state = {}, action) => {
  switch (action.type) {
    case C.CREATE_GAME:
      return {
        ...state,
        gameId: action.gameId,
        playerId: action.playerId,
      };
    case C.CONNECT_PLAYER:
      return {
        ...state,
        bothIsOnline: action.bothIsOnline,
        gameStatus: action.gameStatus,
        errorMsg: action.errorMsg,
      };
    case C.PLAYER_READY:
      return {
        ...state,
        gameStatus: action.gameStatus,
        result: action.result,
      };
    case C.START_GAME:
      return {
        ...state,
        gameStatus: action.gameStatus,
        bothIsReady: action.bothIsReady,
      };
    case C.PICK_GESTURE:
      return {
        ...state,
        gameStatus: action.gameStatus,
        gesture: action.gesture,
      };
    case C.GET_RESULT:
      return {
        ...state,
        gameStatus: action.gameStatus,
        bothIsReady: action.bothIsReady,
        gesture: action.gesture,
        result: action.result,
      };
    default:
      return {
        ...state,
      };
  }
};
