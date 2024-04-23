import './App.css';
import ContentArea from './components/ContentArea/ContentArea';
import SideHeader from './components/SideHeader/SideHeader';
import TopHeader from './components/TopHeader/TopHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { fetchProjects } from './redux/projectsActions';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]); // Empty dependency array ensures fetching only on mount

  const loading = useSelector((state) => state.projects.loading);
  const projects = useSelector((state) => state.projects.projects);
  console.log(projects);

  return (
    loading ? <Loader /> :
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
