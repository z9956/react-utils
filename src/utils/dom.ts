//Node.ELEMENT_NODE	1, 一个 元素 节点，例如 <p> 和 <div>
export const isElement = (el: any): el is Element => {
	return (
		el != null &&
		typeof el == 'object' &&
		'nodeType' in el &&
		el.nodeType === Node.ELEMENT_NODE
	);
};

export const canUseDOM = (): boolean => {
	return !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);
};

export const isBrowser = canUseDOM();

export function contains(parent: HTMLElement | null, child: HTMLElement) {
	if (!parent) return false;
	return parent === child || parent.contains(child);
}
