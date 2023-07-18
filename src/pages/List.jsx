import React from "react";
import { useOutletContext } from "react-router-dom";
import ShortUrl from "../components/ShortUrl";

export default function List() {
  const [urls, setUrls] = useOutletContext();


  return (
    <div>
      <h4>Generated Urls</h4> <hr />
      {urls.map((url) => {
        return <ShortUrl key={url._id} {...url} />;
      })}
    </div>
  );
}
