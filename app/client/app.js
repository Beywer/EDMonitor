import "babel-polyfill";
import 'whatwg-fetch';
import 'app.css';
import 'utils/socketListener';
import 'utils/developUtils';

import ReactDom from 'react-dom';
import React from 'react';
import App from 'containers/App/App';

const appDiv = document.getElementById('app');
ReactDom.render(<App/>, appDiv);
