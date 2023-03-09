import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ApiCall from './components/ApiCall';
import Location from './components/Location';
import Spec from './components/Spec';

function App() {
  return (
      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={ <ApiCall/> }/>
          <Route exact path='/specs/*' element={ <Spec/> }/>
          <Route exact path='/location/*' element={ <Location/> }/>
        </Routes>
        
      </BrowserRouter>

      

  );
}

export default App;
