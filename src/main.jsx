import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MyContext from "./context/UserContext.jsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyContext>
      <App />
    </MyContext>
    
  </React.StrictMode>,
)
