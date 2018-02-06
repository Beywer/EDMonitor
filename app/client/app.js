import App from 'containers/App/App';
import ReactDom from 'react-dom';
import React from 'react';
import 'whatwg-fetch';
import 'app.css';

const appDiv = document.getElementById('app');
ReactDom.render(<App/>, appDiv);
