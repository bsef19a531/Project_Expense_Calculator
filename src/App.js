import './App.css';
import ContentArea from './components/ContentArea/ContentArea';
import SideHeader from './components/SideHeader/SideHeader';
import TopHeader from './components/TopHeader/TopHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchData } from './utils/projectFunction';
import { useEffect, useState } from 'react';


function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetchData().then((projects) => {
      setProjects(projects);
      // console.log(projects);
    });
  }, []);

  return (
    <Router>
      <div className="app-container">
        <TopHeader />
        <div className='page-area'>
          <SideHeader />
          <ContentArea />
        </div>
      </div>
    </Router>
  );
}

export default App;
