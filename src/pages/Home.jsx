import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { Link, useOutletContext } from "react-router-dom";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import Search from "antd/es/input/Search";
import { styled } from "styled-components";
import { toast } from "react-hot-toast";
const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const [urls, setUrls] = useOutletContext();
  const [shortUrl, setShortUrl] = useState("");
  const [url, setUrl] = useState("");

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);
  const onFinish = async ({ url }) => {
    try {
      const {
        data: { result },
      } = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const shortUrl = {
        _id: nanoid(),
        main_url: url,
        short_link: result.short_link,
      };
      setShortUrl(shortUrl);
      setUrls([...urls, shortUrl]);
      toast.success("Short URL generated!");
    } catch (error) {
      toast.error(error.response.data.error)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Wrapper>
      <Title level={2}>Shorten Your URL</Title>
      <Form form={form} onFinish={onFinish}>
        <Space.Compact>
          <Form.Item
            name="url"
            rules={[
              {
                required: true,
                message: "Please input the URL!",
              },
            ]}
          >
            <Input placeholder="Original URL" />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Submit
              </Button>
            )}
          </Form.Item>
        </Space.Compact>
      </Form>
      {shortUrl && (
        <p>
          Short URL :{" "}
          <a target="_blank" href={shortUrl.main_url}>
            {shortUrl.short_link}
          </a>{" "}
        </p>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section``;
