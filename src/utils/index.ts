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
