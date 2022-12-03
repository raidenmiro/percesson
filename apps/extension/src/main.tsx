import { render } from 'solid-js/web'
import { App } from './app/application'

const root = document.querySelector('#root')

if (root) render(() => <App />, root)
