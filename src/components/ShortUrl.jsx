import { List,Typography } from "antd";
const { Text,Title } = Typography;
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import {DeleteOutlined,EditOutlined } from '@ant-design/icons';


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
  const iconStyle = {
    fontSize: '150%'
  }
  return (
    <List>
      <List.Item  actions={[<Link to={`/edit/${url._id}`}><EditOutlined style={iconStyle} /></Link>, 
      <a onClick={() => ls_del("shortUrls", url._id)}><DeleteOutlined  style={iconStyle} /></a>]}>
        <Title level={4}>{url?.short_link} </Title>
      </List.Item>
    </List>
  );
}
