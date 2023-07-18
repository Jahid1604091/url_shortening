import React from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function ShortUrl(url) {
  const [urls, setUrls] = useOutletContext();
  function ls_del(storage_name, id) {
    if (localStorage.getItem(storage_name) === null) {
    } else {
      var ls_data = JSON.parse(localStorage.getItem(storage_name));
      var index = ls_data.findIndex(({ _id }) => _id == id);
    
      if (index == -1) {
        // if not matched selected index
      } else {
        // is matched, remove...
        ls_data.splice(index, 1);
        localStorage.setItem(storage_name, JSON.stringify(ls_data));
        setUrls(ls_data);
      }
    }
  }
  return (
    <>
      <p>
        {url?.short_link} || <Link to={`/edit/${url._id}`}>Edit</Link> |{" "}
        <a onClick={() => ls_del("shortUrls", url._id)}>Delete</a>
      </p>
    </>
  );
}
