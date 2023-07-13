import React from "react";
import router from "./router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Whatsapp from './assets/imgs/theme/whatsapp.png';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {router.map((item, i) => {
            return (<Route key={i} element={<item.element />} path={item.path} exact={item.exact} />);
          })}
        </Routes>
      </Router>
      <a className="whats-app" href='https://api.whatsapp.com/send?phone=+919624501047' target="_blank">
        <img className src={Whatsapp} alt="/" />
      </a>
    </div>
  );
}

export default App;
