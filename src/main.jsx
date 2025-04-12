
import { createRoot } from 'react-dom/client'
import App from './Layouts/App.jsx'
import "./app.css"
import AppProvider from './Context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
    <AppProvider>
        <App/>
    </AppProvider>
);
