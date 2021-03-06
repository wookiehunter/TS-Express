import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods } from './Methods';
import { MetadataKeys } from './Metadatakeys';

interface RouteHandlerDescriptor extends PropertyDescriptor {
	value?: RequestHandler
}

function routeBinder(method: string) {
	return function (path: string) {
		return function (target: any, key: string, desc: RouteHandlerDescriptor) {
			Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
			Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
		};
	};
}

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
