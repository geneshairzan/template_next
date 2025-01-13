export default function setUID(socket, next) {
  socket.uid = socket.handshake.auth.uid;
  //TODO : Change session id to CUID
  socket._session = socket.handshake.auth.uid;
  next();
}
