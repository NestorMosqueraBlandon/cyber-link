import React from 'react'
import ReactDOM from 'react-dom/client'
import Application from './Application'
import './styles/variables.css'
import './styles/main.css'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Application />    
    </Provider>
  </React.StrictMode>
)