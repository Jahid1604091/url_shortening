import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { Link, useOutletContext } from "react-router-dom";

export default function Home() {
  const [urls,setUrls] = useOutletContext();

  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { result },
      } = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const shortUrl = {
        _id: nanoid(),
        main_url:url,
        short_link: result.short_link,
      };
      setUrls([...urls, shortUrl]);

      //show a success alert
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
    </form>
  );
}
