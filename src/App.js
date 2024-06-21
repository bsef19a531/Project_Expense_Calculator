import './App.css';
import ContentArea from './components/ContentArea/ContentArea';
import SideHeader from './components/SideHeader/SideHeader';
import TopHeader from './components/TopHeader/TopHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';
import { getProjectsLocally } from './utils/handleProjectsLocal';
import { useDispatch, useSelector } from 'react-redux';
import CreateProject from './components/CreateProject/CreateProject';
import { saveProjects } from './redux/projectsSlice';

function App() {

  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isProjectsEmpty, setIsProjectsEmpty] = useState(false);

  useEffect(() => {
    dispatch(saveProjects(getProjectsLocally()));
  }, []); // Empty dependency array ensures fetching only on mount

  useEffect(() => {
    if (projects && projects != []) {
      setLoading(false);
      if (projects.length > 0) {
        setIsProjectsEmpty(true);
      }
    }
  }, [projects]);

  // console.log("App");
  return (
    loading ? <Loader /> :
      <Router>
        <div className="app-container">
          <TopHeader />
          <div className='page-area'>
            {isProjectsEmpty ?
              <>
                <SideHeader />
                <ContentArea />
              </> :
              <CreateProject />}
          </div>
        </div>
      </Router>
  );
}

export default App;
