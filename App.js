import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import {UdaciHome} from './index'



export default class App extends React.Component {
  
  render() {


    return (
      <Provider store={createStore(reducer)}>
        <UdaciHome/>
      </Provider>
    );
  }
}

