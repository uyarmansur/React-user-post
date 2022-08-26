import "./App.css";
import Main from "./components/Main";
import Contact from "./components/Contact";
import Cards from "./components/Cards";
import Navi from "./components/Navi";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchedWord from "./components/SearchedWord";
import Posts from "./components/Posts";
import UserPosts from "./components/UserPosts";
import { Container } from "reactstrap";

function App() {
  return (
    <div className="App">
      <Container>
        <Navi />

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Auth />}>
            <Route path="/" element={<Main />} />
            <Route path="posts/add" element={<Contact />} />
            <Route path="posts/:id" element={<Cards />} />
            <Route path="search/:word" element={<SearchedWord />} />
            <Route path="posts" element={<Posts />} />
            <Route path="userposts/:id" element={<UserPosts />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default App;
