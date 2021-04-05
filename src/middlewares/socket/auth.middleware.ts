import * as jwt from 'jsonwebtoken';
import ISocketInstance from '../../interfaces/socket/socket.interface';

const auth = (socket: any, next: Function) => {
	console.log("Auth request hit", socket.handshake.query)
	let token : any;
	token = socket?.handshake?.query?.token
	try {
		if (token){
			const decoded = jwt.verify(token, "0a6b944d-d2fb-46fc-a85e-0295c986cd9f");
			socket.user = <object>decoded;
			next();
		} else {
			console.log("Authentication error")
			next(new Error('Authentication error'));
		} 
	} catch(error) {
		next(new Error('Authentication error'));	
	}
}

export default auth
