import { useState } from "react";
import "./App.css";
import Landing_page from "./component/Landing-page/Landing_page";
import Navbar from "./component/Navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Landing_page />
    </>
  );
}

export default App;
