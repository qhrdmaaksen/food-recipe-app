import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {AuthenticationContextProvider} from "./context";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <AuthenticationContextProvider>
          <App />
      </AuthenticationContextProvider>
  </React.StrictMode>,
)
