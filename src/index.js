import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css";
import App from "./App";
import Home from "./Components/Home";
import Blog from "./Components/Blog";
import Chat from "./Components/Chat";
import TripDetails from "./Components/TripDetails";
import Preferences from "./Components/Preferences";

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="profile" element={<Preferences />} />
        <Route path="admin" element={<Blog />} />
        <Route path="chat" element={<Chat />} />
        <Route path="trip" element={<TripDetails />} />
        <Route path="preferences" element={<Preferences />} />
      </Route>
    </Routes>
  </Router>,
  // </React.StrictMode>,
  document.getElementById("root")
);
