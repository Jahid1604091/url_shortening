import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Space } from "antd";
import  { Toaster } from 'react-hot-toast';

export default function App() {
  const [urls, setUrls] = useState(
    localStorage.getItem("shortUrls")
      ? JSON.parse(localStorage.getItem("shortUrls"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("shortUrls", JSON.stringify(urls));
  }, [urls]);


  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout className="nav">
          <Menu defaultSelectedKeys={["1"]} mode="horizontal">
            <Menu.Item key="1">
              <span>Home</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
              <span>List</span>
              <Link to="/list" />
            </Menu.Item>
          </Menu>
        </Layout>
      </Space>

      <Outlet context={[urls, setUrls]} />
      <Toaster/>
    </>
  );
}
