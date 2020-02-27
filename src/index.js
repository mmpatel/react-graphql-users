import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

import '@elastic/eui/dist/eui_theme_light.css'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const client = new ApolloClient({ uri: process.env.REACT_APP_GRAPHQL_URL })


ReactDOM.render(<ApolloProvider client={client}>
  <App />
</ApolloProvider>, document.getElementById('root'))


serviceWorker.unregister();
