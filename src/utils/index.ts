export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown): string =>
	objectToString.call(value);

/**
 * @example
 * toRawType(1) // 'Number'
 * toRawType({}) // 'Object'
 * toRawType(new Map()) // 'Map'
 * */
export const toRawType = (value: unknown): string => {
	return toTypeString(value).slice(8, -1);
};

export const isArray = Array.isArray;
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

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
	return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const isPlainObject = (val: unknown): val is object =>
	toTypeString(val) === '[object Object]';

const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
	const cache: Record<string, string> = Object.create(null);
	return ((str: string) => {
		const hit = cache[str];
		return hit || (cache[str] = fn(str));
	}) as any;
};

const camelizeRE = /-(\w)/g;
const hyphenateRE = /\B([A-Z])/g;

/**
 * @example
 * camelize('background-color') // => 'backgroundColor'
 * camelize('-moz-background-color') // => 'MozBackgroundColor'
 */
export const camelize = cacheStringFunction((str: string): string => {
	return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

/**
 * @example
 * hyphenate('backgroundColor') // => 'background-color'
 * hyphenate('MozBackgroundColor') // => 'moz-background-color'
 * */
export const hyphenate = cacheStringFunction((str: string) =>
	str.replace(hyphenateRE, '-$1').toLowerCase(),
);

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 判断一个对象是否包含某个属性
 * @example
 * hasOwn(Object.create(null), 'foo') // => false
 * hasOwn({ 'background-color': 'red' }, 'background-color') // => true
 * */
export const hasOwn = (
	val: object,
	key: string | symbol,
): key is keyof typeof val => hasOwnProperty.call(val, key);
