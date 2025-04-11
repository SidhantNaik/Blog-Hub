import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Provider} from 'react-redux'
import { persister, store } from './Store.js'
import {PersistGate} from 'redux-persist/integration/react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <PersistGate loading={<div>Loading....</div>} persistor={persister}>
            <ToastContainer/>
            <App/>
        </PersistGate>
    </Provider>
  </StrictMode>,
)
