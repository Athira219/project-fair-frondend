
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';

import Project from './Pages/Project';
import DashBoard from './Pages/DashBoard';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { useContext } from 'react';
import { isTockenContextShare } from './Context/ContexShare';

function App() {
  const {isTocken, setIsTocken} = useContext(isTockenContextShare)
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/Register' element={<Auth register/>} />
      <Route path='/Project' element={<Project />} />
      <Route path='/Dashboard' element={isTocken? <DashBoard dashboard/> :<Home />} />
     </Routes>
     <Footer />
    </div>
  );
}

export default App;
