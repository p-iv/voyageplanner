import { useState } from "react";
import styles from "./PageNav.module.scss";
import { Button, Layout, Menu, theme } from "antd";
import {
  HomeOutlined,
  GlobalOutlined,
  HistoryOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Sider } = Layout;

function PageNav() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={styles.pageNav}>
      <Sider
        theme="light"
        collapsed={collapsed}
        collapsible
        trigger={null}
        className={styles.pageNav}
      >
        <Button
          type="text"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <Logo />
        <Menulist />
      </Sider>
    </div>
  );
}

function Menulist() {
  const { logout } = useAuth();

  const items = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "my-trips",
      icon: <HistoryOutlined />,
      label: "My Trips",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: logout,
    },
  ];

  return <Menu mode="inline" className={styles.menu} items={items} />;
}

function Logo() {
  return (
    <div className={styles.logo}>
      <div className={styles.logo_icon}>
        <img src="/voyagePlanner-logo.png" alt="logo image" />
      </div>
    </div>
  );
}

export default PageNav;
