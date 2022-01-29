const warningStack: { [key: string]: boolean } = {};

const mode = import.meta.env.MODE;

const useWarning = (message: string, component?: string) => {
	const tag = component ? ` [${component}]` : ' ';
	//TODO 替换simple-ui
	const log = `[simple-ui]${tag}: ${message}`;
	if (typeof console === 'undefined') return;
	if (warningStack[log]) return;
	warningStack[log] = true;

	//TODO webpack 替换 process.env.NODE_ENV !== 'production'
	if (mode !== 'production') {
		return console.error(log);
	}

	console.warn(log);
};

export default useWarning;
