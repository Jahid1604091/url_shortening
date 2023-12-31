import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import {useOutletContext } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Space,
  Typography,
} from "antd";
import { toast } from "react-hot-toast";
const {Text } = Typography;

export default function Home() {
  const [urls, setUrls] = useOutletContext();
  const [shortUrl, setShortUrl] = useState("");
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
      toast.error(error.response.data.error);
    }
  };

  return (
    <section className="page-100">
      <div className="section-center">
        <h3>Shorten Your URL</h3>
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
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  Submit
                </Button>
              )}
            </Form.Item>
          </Space.Compact>
        </Form>
        {shortUrl && (
          <Text copyable={{ text: shortUrl.short_link }}>
            Short URL :{" "}
            <a target="_blank" href={shortUrl.main_url}>
              {shortUrl.short_link}
            </a>{" "}
          </Text>
        )}
      </div>
    </section>
  );
}


