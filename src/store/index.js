import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { game } from '../reducers/reducers';

const initialState = {
  endpoint: 'http://localhost:4000',
  gameId: '',
  playerId: '',
  bothIsOnline: false,
  bothIsReady: false,
  gameStatus: '',
  gesture: '',
  result: '',
};

const logger = createLogger();

const storeFactory = () => createStore(
  game,
  initialState,
  applyMiddleware(thunk, logger),
);

export default storeFactory;
