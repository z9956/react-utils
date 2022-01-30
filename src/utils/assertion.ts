import { toTypeString } from './index';

export const isArray = Array.isArray;

export const isEmptyArray = (value: any) => {
	return isArray(value) && value.length === 0;
};

export const isMap = (val: unknown): val is Map<any, any> =>
	toTypeString(val) === '[object Map]';

export const isSet = (val: unknown): val is Set<any> =>
	toTypeString(val) === '[object Set]';

export const isDate = (val: unknown): val is Date => val instanceof Date;

export const isFunction = (val: unknown): val is Function =>
	typeof val === 'function';

export const isString = (val: unknown): val is string =>
	typeof val === 'string';

export const isSymbol = (val: unknown): val is symbol =>
	typeof val === 'symbol';

export const isObject = (val: unknown): val is Record<any, any> =>
	val !== null && typeof val === 'object';

export const isEmptyObject = (value: any) => {
	return isObject(value) && Object.keys(value).length === 0;
};

export const isNotEmptyObject = (value: any): value is object => {
	return value && !isEmptyObject(value);
};

export const isPlainObject = (val: unknown): val is object =>
	toTypeString(val) === '[object Object]';

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
	return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export function isEmpty(value: any): boolean {
	if (isArray(value)) return isEmptyArray(value);
	if (isObject(value)) return isEmptyObject(value);
	return value == null || value === '';
}

export const isInputEvent = (
	value: any,
): value is { target: HTMLInputElement } => {
	return value && isObject(value) && isObject(value.target);
};
