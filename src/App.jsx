import React, { useState, useEffect } from "react";
import Body from "./components/Body";
import "./App.css";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Loading selama 2 detik

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <Loading /> : <Body />}
    </>
    
  );
}

export default App;

