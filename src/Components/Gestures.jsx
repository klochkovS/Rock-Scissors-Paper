import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

const gest = [
  { val: 'rock', name: 'Камень' },
  { val: 'scissors', name: 'Ножницы' },
  { val: 'paper', name: 'Бумага' },
  { val: 'lizard', name: 'Ящерица' },
  { val: 'spock', name: 'Спок' },
];


const Gestures = ({ bothIsReady, pickGesture }) => (
  <section>
    {gest.map(value => (
      <button
        key={v4()}
        disabled={bothIsReady ? '' : 'disabled'}
        onClick={() => pickGesture(value.val)}
      >
        {value.name}
      </button>
    ))}
  </section>
);

Gestures.propTypes = {
  bothIsReady: PropTypes.bool.isRequired,
  pickGesture: PropTypes.func.isRequired,
};

export default Gestures;
