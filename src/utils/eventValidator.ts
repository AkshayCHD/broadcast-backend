import SocketError from './SocketError';
import { ObjectSchema } from 'joi'

export default (schema: ObjectSchema, validationObject: any) => {
	const { error } = schema.validate(validationObject);
	if(error) {
		const { details } = error;
    	const message = details.map(i => i.message).join(',');
		throw new SocketError(message, 422)
	}
}
