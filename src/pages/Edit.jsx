import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { Link, useOutletContext, useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { Button, Form, Input, Space } from "antd";
import { toast } from "react-hot-toast";

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

  const [shortUrl, setShortUrl] = useState("");


  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);
  const onFinish = async ({url}) => {
   
    try {
      const {
        data: { result },
      } = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const updated = [
        ...urls.slice(0, index),
        Object.assign({}, urls[index], {
          ...currentData,
          main_url: url,
          short_link: result.short_link,
        }),
        ...urls.slice(index + 1),
      ];
      setUrls(updated);
      toast.success("Short URL updated!");
    } catch (error) {
      toast.error(error.response.data.error)

    }
  };

  return (<>
    <Title level={2}>Edit Your URL</Title> 
    <Form form={form} onFinish={onFinish} fields={[{name:'url', value:url}]}>
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
          <Input placeholder="Original URL"  />
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
    </>
    // <form onSubmit={handleSubmit}>
    //   Update Url
    //   <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
    // </form>
  );
}
