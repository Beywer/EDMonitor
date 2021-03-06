import io from 'socket.io-client/dist/socket.io.slim.js';

const address = process.env.NODE_ENV === 'development' ? 'http://localhost:3200' : undefined;
const socket = new io(address);
export default socket;
