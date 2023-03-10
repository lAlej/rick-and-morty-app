import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import ApiCall from './components/ApiCall';
import Location from './components/Location';
import Spec from './components/Spec';

function App() {
  return (
    <Routes>
          <Route path='/' element={ <ApiCall/> }/>
          <Route path='/specs/*' element={ <Spec/> }/>
          <Route path='/location/*' element={ <Location/> }/>
    </Routes>

  );
}

export default App;
