import { AppRegistry } from "react-native";
import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
Amplify.configure(config);

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


