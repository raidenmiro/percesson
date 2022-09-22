import { App } from './app/application';
import { render } from 'solid-js/web';

const root = document.querySelector('#root');

if (root) render(() => <App />, root);
