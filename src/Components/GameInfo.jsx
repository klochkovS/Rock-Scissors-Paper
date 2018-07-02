import React from 'react';
import PropTypes from 'prop-types';

const GameInfo = ({
  bothIsOnline,
  gameStatus,
  gesture,
  result,
}) => (
    <section>
      <div>
        {bothIsOnline ? '' : 'Второй игрок не в сети...'}
      </div>
      <div>
        Статус игры:
      {gameStatus}
      </div>
      <div>
        Результат:
      {result}
      </div>
      <div>
        Вы выбрали:
      {gesture}
      </div>
      <hr />
    </section>
  );

GameInfo.propTypes = {
  bothIsOnline: PropTypes.bool.isRequired,
  gameStatus: PropTypes.string.isRequired,
  gesture: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
};

export default GameInfo;
