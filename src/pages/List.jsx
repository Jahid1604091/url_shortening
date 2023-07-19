import React from "react";
import { useOutletContext } from "react-router-dom";
import {Typography} from 'antd';
import ShortUrl from "../components/ShortUrl";
const { Title, Paragraph, Text } = Typography;

export default function List() {
  const [urls, setUrls] = useOutletContext();

  if (urls.length === 0) return <div>No URL is generated yet!</div>;
  return (
    <>
      <Title level={2}>Generated Urls</Title> <hr />
      {urls.map((url) => {
        return <ShortUrl key={url._id} {...url} />;
      })}
    </>
  );
}
