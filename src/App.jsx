import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  const [urls, setUrls] = useState(
    localStorage.getItem("shortUrls")
      ? JSON.parse(localStorage.getItem("shortUrls"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("shortUrls", JSON.stringify(urls));
  }, [urls]);


  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/list">List</Link>
      </nav>

      <Outlet context={[urls,setUrls]} />
    </>
  );
}
