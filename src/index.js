import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css";
import App from "./App";
import Home from "./Components/Home";
import About from "./Components/About";
import Blog from "./Components/Blog";
import Chat from "./Components/Chat";

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="profile" element={<Blog />} />
        <Route path="admin" element={<Blog />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  </Router>,
  // </React.StrictMode>,
  document.getElementById("root")
);
