import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Applications from './pages/applications/Applications'
import { PostProvider } from './data/context/PostContext';
import Sidebar from './components/constants/Sidebar'
import EmployeeInfo from './pages/info-pages/EmployeeInfo';
import CompanyInfo from './pages/info-pages/CompanyInfo';
import SavedApplications from './pages/applications/SavedApplications';
import MyApplications from './pages/applications/MyApplications';
import Account from './pages/account/Account';
import PlaceApplication from './pages/applications/PlaceApplication';
import Messenger from './pages/messenger/Messenger';
import ChatsContent from './components/messenger/ChatsContent';

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/werknemers" element={<EmployeeInfo />} />
          <Route path="/plaatsen" element={<PlaceApplication />} />
          <Route path="/bedrijven" element={<CompanyInfo />} />
          <Route path="/account" element={<Account />} />
          <Route path="/Applications" element={<PostProvider><Applications /></PostProvider>} />
          <Route path="/saved" element={<PostProvider><SavedApplications /></PostProvider>} />
          <Route path="/manage" element={<PostProvider><MyApplications /></PostProvider>} />
          <Route path="/chats/:id" element={<PostProvider><Messenger /></PostProvider>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;