import C from '../constants';

export newRoom = () => {
  let newRoom = document.location.hash.replace('#', '');

  if (newRoom === '') {
    newRoom = v4();
    document.location.hash = newRoom;
  }

  return (
    {
      type: C.CREATE_ROOM
    }
  )
}