/* global document require*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import App from './App';
import Home from 'containers/Home';
import registerServiceWorker from './registerServiceWorker';
import configStore from './redux/store';
import './styles/reset.css';


ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider store={configStore}>
      <HashRouter>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/index' component={Home}/>
        </Switch>
      </HashRouter>
    </Provider>
  </LocaleProvider>
  , document.getElementById('root'));
registerServiceWorker();
