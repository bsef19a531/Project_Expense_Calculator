import './App.css';
import ContentArea from './components/ContentArea/ContentArea';
import SideHeader from './components/SideHeader/SideHeader';
import TopHeader from './components/TopHeader/TopHeader';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
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
