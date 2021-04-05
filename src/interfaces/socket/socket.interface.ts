import SocketIO, { Socket } from 'socket.io';

export default interface ISocketInstance extends Socket {
	user: {
		_id: string
	};
}

export interface IIO extends SocketIO.Server {
	
} 
