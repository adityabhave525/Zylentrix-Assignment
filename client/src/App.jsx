import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import Signup from './components/Signup';
import Login from './components/Login';
import Create from './components/Create';
import EditPost from './components/EditPost';
import Home from './components/Home';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
