import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { Link, useOutletContext, useParams } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();

  const [urls, setUrls] = useOutletContext();

  const [url, setUrl] = useState("");

  const currentData = urls.find((url) => url._id === id);

  var ls_data = JSON.parse(localStorage.getItem("shortUrls"));
  let index = urls.findIndex(({ _id }) => _id == id);

  useEffect(() => {
    setUrl(currentData?.main_url);
  }, [urls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { result },
      } = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const updated = [...urls.slice(0, index),Object.assign({}, urls[index], { ...currentData,  main_url:url,
        short_link: result.short_link, }),
...urls.slice(index + 1)
]
      setUrls(updated)
      //show a success alert
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      Update Url
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
    </form>
  );
}
