import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from '~/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 
import GlobalStyles from '~/components/GlobalStyles'
import { ThemeProvider } from './components/Context/ThemeContext';
import {UserProvider} from './components/Context/UserContext';
import { AuthProvider } from './components/Modal/AuthModalContext'
import { ErrorModalProvider } from './components/Modal/ErrorModalContext';
import VideoListProvider from './components/VideoList/VideoList'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <ErrorModalProvider>
        <UserProvider>
          <AuthProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
          </AuthProvider>
        </UserProvider>
      </ErrorModalProvider>
    </GlobalStyles>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
