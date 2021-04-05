import ISocketInstance from '../interfaces/socket/socket.interface'

const errorEmitter = (socket: ISocketInstance, error: Error, event: String) => {
	if(event) console.log(event)
	// console.log(error)
	// console.error(error)
	// if(error.stack) {
	// 	if(error.status !== 400 && error.status !== 422) {
	// 		console.error(error.stack)
	// 	}
	// }
	console.log(error)
	socket.emit('server_error', {
		status: 500,
		data: {
			message: error && error.message ? error.message : "Internal Server Error",
			stack: error.stack,
			// action: error.actionObject && error.actionObject.actionId ? error.actionObject : {}
		}
	})
}

export default errorEmitter
