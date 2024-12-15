import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Redux Store'u sağlayıcı ile bağlayarak uygulama geneline entegre ediyoruz
createRoot(document.getElementById('root')).render(
      <App />
);
