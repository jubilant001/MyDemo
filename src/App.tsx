import React from "react";
import "./App.css";
import styles from "./App.module.css";
import icon from "./assets/icon.png";
import Banner from './components/Banner'

const App: React.FC = () => {
  return (
    <div id="App" className={`app ${styles.app}`}>
      <div>
        <Banner></Banner>
        <div>import icon from "./assets/icon.png"</div>
        <img src={icon} alt="assets" />
      </div>
      <div>
        <div>background-image: url("./assets/icon.png")</div>
        <div className="backage-image"></div>
      </div>
      <div>
        <div>src="/icon.png"</div>
        <img src="/icon.png" alt="public" />
      </div>
    </div>
  );
};

export default App;
