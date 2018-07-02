import C from '../constants';

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
      };
    case C.PLAYER_READY:
      return {
        ...state,
        gameStatus: action.gameStatus,
      };
    case C.START_GAME:
      return {
        ...state,
        gameStatus: action.gameStatus,
        bothIsReady: action.bothIsReady,
      };
    case C.PICK_GESURE:
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
