import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { game, messages } from '../reducers/reducers';

const initialState = {
  game: {
    endpoint: 'http://localhost:4000',
    gameId: '',
    playerId: '',
    bothIsOnline: false,
    bothIsReady: false,
    gameStatus: '',
    gesture: '',
    result: '',
  },
  messages: [],
};

const reducers = combineReducers({ game, messages });
//
// На будущее сохранять в локал сторедж,
// чтобы возобновлять в случает обновления страницы пользователем
// и на сервере добавить на on('connect player')
// проверку на нахождения игрока в комнате
//
// const saver = store => next => (action) => {
//   const returnValue = next(action);
//   localStorage['redux-store'] = JSON.stringify(store.getState());
//   return returnValue;
// };

const logger = createLogger();

const storeFactory = () => createStore(
  reducers,
  // localStorage['redux-store'] ?
  //   JSON.parse(localStorage['redux-store']) :
  initialState,
  applyMiddleware(thunk, logger),
);

export default storeFactory;
