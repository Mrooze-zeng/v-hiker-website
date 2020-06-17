import DogComponent from "Components/zdog-demo";
import React from "react";
import "./index.demo.less";

function App() {
  return (
    <div className="App">
      <DogComponent />
      <footer>
        <p>© Copyright 2013-{new Date().getFullYear()} Mrooze</p>
        <p>ICP主体备案号:粤ICP备17043808号</p>
      </footer>
    </div>
  );
}

export default App;
