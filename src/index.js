import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './containers/AppContainer.js';

const root = document.getElementById('root');

const renderFn = (<Router history={ hashHistory }>
        <Route path='/' component={ App } />
    </Router>)

render(renderFn, root);
