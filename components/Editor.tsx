'use client';

import * as monaco from 'monaco-editor';
import { useEffect, useRef } from 'react';

self.MonacoEnvironment = {
	getWorker: function (moduleId, label) {
		if (label === 'json') {
			return new Worker(
				new URL(
					'monaco-editor/esm/vs/language/json/json.worker.js',
					import.meta.url
				)
			);
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return new Worker(
				new URL(
					'monaco-editor/esm/vs/language/css/css.worker.js',
					import.meta.url
				)
			);
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return new Worker(
				new URL(
					'monaco-editor/esm/vs/language/html/html.worker.js',
					import.meta.url
				)
			);
		}
		if (label === 'typescript' || label === 'javascript') {
			return new Worker(
				new URL(
					'/node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js',
					import.meta.url
				),
				{ type: 'module' }
			);
		}
		return new Worker(
			new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url),
			{ type: 'module' }
		);
	},
};

export default function Editor({
	value,
	onChange,
	//language
}: {
	value: string;
	onChange: (value: string) => void;
	//language?:string
}) {
	const edElem = useRef<HTMLDivElement>(null);



monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
	validate:true,
	schemas:[
		{
			uri:'',
			fileMatch:['it://testschema/a'],
			schema:{
				type:"object",
				properties:{
					test:{
						type:"string"
					},
					"c":{
						type:"number"
					}
				}
			}
			


		}
	]
})


	const monacoEditor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
	useEffect(() => {
		if (edElem.current !== null) {
			if (monacoEditor.current === null) {
				const ed = monaco.editor.create(edElem.current, {
					
					insertSpaces:false,
					theme:'vs-dark',
					model:monaco.editor.createModel(value,'json', monaco.Uri.parse('it://testschema/a'))
				}); 
				const model = ed.getModel();
				
				monacoEditor.current = ed;
				return () => {
					ed.dispose();
				};
			} 
		}
	}, [edElem]);

	useEffect(() => {
		if (monacoEditor.current !== null) {
			const model = monacoEditor.current.getModel();
			if (model !== null) {
				model.onDidChangeContent(() => {
					onChange(model.getValue());
				});
			}
		}
	}, [onChange, monacoEditor]);



	useEffect(() => {


		if (monacoEditor.current !== null) {
			const model = monacoEditor.current.getModel();
			if (model !== null) {
				//const pos=monacoEditor.current.getPosition();


				monacoEditor.current.executeEdits('react',[{text:value,range:model.getFullModelRange()}])
				//model.setValue(value);
				//monacoEditor.current.setPosition(pos);
			}
		}
	}, [monacoEditor, value]);

	return (
		<>
			hi
			<div style={{ width: '90vw', height: '90vh' }} ref={edElem} />
		</>
	);
}
