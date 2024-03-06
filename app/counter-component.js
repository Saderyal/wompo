import { html, defineWomp, useState, useEffect } from '../dist/womp.js';
import SecondComponent from './second-component.js';
import ThirdComponent from './third-component.js';

function Counter({ styles: s, children, symbol }) {
	const [counter, setCounter] = useState(0);

	/* useEffect(() => {
		setInterval(() => {
			setCounter((oldValue) => oldValue + 1);
		}, 10);
		return () => clearInterval(interval);
	}, []); */

	return html`
		<button
			class="${s.button} ${'static'}"
			disabled=${false}
			@click=${() => setCounter(counter - 1)}
		>
			-
		</button>
		<span class="${s.span}">${counter} ${symbol}</span>
		<button class=${s.button} @click=${() => setCounter(counter + 1)}>+</button>
		${counter % 3 === 0
			? html`
				<${SecondComponent} counter=${counter} name="Lorenzo">
					<b>BU! ${counter}</b>
					${children}
				</${SecondComponent}>
			`
			: html`
				<${ThirdComponent} counter=${counter} name="Lorenzo">
					<b>BU! ${counter}</b>
					${children}
				</${ThirdComponent}>
			`}
	`;
}
Counter.componentName = 'counter-component';
Counter.css = `
		* {
      font-size: 50px;
		}
		.span {
			width: 100px;
			display: inline-block;
			text-align: center;
		}
		.span a {
			color: red;
		}
		.button {
			width: 100px;
			height: 100px;
			border: none;
			border-radius: 10px;
			background-color: seagreen;
			color: white;
		}
`;

export default defineWomp(Counter);
