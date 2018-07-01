import C from '../constants';

export newRoom = () => {
  let roomId = document.location.hash.replace('#', '');

  if (roomId === '') {
    roomId = v4();
    document.location.hash = roomId;
  }

  return (
    {
      type: C.CREATE_ROOM,
      roomId,
    }
  )
}
