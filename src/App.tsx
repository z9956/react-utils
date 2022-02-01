import React, { ChangeEvent, MouseEvent, useRef } from 'react';

import useDrip from "./utils/useDrip";
import useClickAway from "./utils/useClickAway";
import useClickAnywhere from "./utils/useClickAnywhere";
import useResize from "./utils/useResize";
import { isInputEvent } from './utils/assertion';
import './App.css';

function App() {
	const clickAwayRef = useRef(null);

	const { onClick: onDripClickHandler, ...dripBindings } = useDrip(
		false,
		clickAwayRef,
	);

	useClickAway(clickAwayRef, () => {
		console.log('Click away!');
	});

	useClickAnywhere((e: Event) => {
		console.log('Click anywhere!', e);
	});

	useResize(() => {
		console.log('window resize');
	});

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		if (clickAwayRef.current) {
			onDripClickHandler(e);

			console.log(dripBindings);
		}
		//onClick?.(e);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log('handleChange isInputEvent', isInputEvent(e));
	};
	return (
		<div className="App">
			<div className="click-away" ref={clickAwayRef} onClick={handleClick}>
				click away
			</div>
			<input type="text" onChange={handleChange} />
		</div>
	);
}

export default App;
