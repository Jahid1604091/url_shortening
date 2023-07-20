import React from "react";
import { useOutletContext } from "react-router-dom";
import {Typography} from 'antd';
import ShortUrl from "../components/ShortUrl";
import { styled } from "styled-components";
const { Title } = Typography;

export default function List() {
  const [urls, _] = useOutletContext();

  if (urls.length === 0) return <div className="text-center">No URL is generated yet!</div>;
  return (
    <Wrapper className="page-100">
      <div className="section-center">
      <Title level={2}>Generated Urls</Title> <hr />
      {urls.map((url) => {
        return <ShortUrl key={url._id} {...url} />;
      })}

      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .ant-list{
    display: flex;
    justify-content: center;
    text-align: end;
  }

`