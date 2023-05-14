'use client';
import { useState } from 'react';
import Editor from './Editor';

export default function Comp() {
	const [state, setState] = useState(
		JSON.stringify(
			{
				mainConfig: [
					{
						id: 'a',
					},
				],
				altConfigs: [
					{
						cid: 'd',
						config: [
							{
								id: 'd',
							},
						],
					},
				],
			},
			null,
			'\t'
		)
	);
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
