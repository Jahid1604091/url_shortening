import { List, Typography } from "antd";
const { Link: _Link } = Typography;
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function ShortUrl(url) {
  const [_, setUrls] = useOutletContext();
  function ls_del(storage_name, id) {
    if (localStorage.getItem(storage_name) === null) {
    } else {
      var ls_data = JSON.parse(localStorage.getItem(storage_name));
      var index = ls_data.findIndex(({ _id }) => _id == id);

      if (index == -1) {
        // if not matched selected index
      } else {
        ls_data.splice(index, 1);
        localStorage.setItem(storage_name, JSON.stringify(ls_data));
        setUrls(ls_data);
      }
    }
  }
  const deleteIconStyle = {
    fontSize: "150%",
    color: "red",
  };
  const editIconStyle = {
    fontSize: "150%",
    color: "orange",
  };
  return (
    <List>
      <List.Item
        actions={[
          <Link to={`/edit/${url._id}`}>
            <EditOutlined style={editIconStyle} />
          </Link>,
          <a onClick={() => ls_del("shortUrls", url._id)}>
            <DeleteOutlined style={deleteIconStyle} />
          </a>,
        ]}
      >
        <_Link
          underline
          type="success"
          href={url?.main_url}
          target="_blank"
          level={4}
        >
          {url?.short_link}{" "}
        </_Link>
      </List.Item>
    </List>
  );
}
