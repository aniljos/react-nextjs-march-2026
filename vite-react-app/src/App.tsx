import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import Home from "./pages/Home";
import React, { Suspense } from "react";
//import Login from "./pages/Login";

const Login = React.lazy(() => import('./pages/Login'));

function App() {
  return (
    <Router>
      <div className="container">
        <AppBar />

        <main>
          <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
