import './App.css';
import './styles/global.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MiPerfil from './pages/MiPerfil';
import NotFound from './pages/NotFound';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/Miperfil' element={<MiPerfil />}  />
          <Route path='/*' element={<NotFound />}  />
          {/**Poner las rutas de los componentes importados */}
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
