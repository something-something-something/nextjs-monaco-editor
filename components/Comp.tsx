'use client';
import { useState } from 'react';
import Editor from './Editor';

export default function Comp() {
	const [state, setState] = useState('{}');
	return (
		<>
			asdaslk
			<pre>{state}</pre>
			<Editor
				value={state}
				onChange={(v) => {
					setState(v);
				}}
			/>
		</>
	);
}
