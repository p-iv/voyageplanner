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
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Header, Sider } = Layout;

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

  return (
    <Menu mode="inline" className={styles.menu}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Item key="my-trips" icon={<HistoryOutlined />}>
        My Trips
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>

      <button onClick={() => logout()}>Log out</button>
    </Menu>
  );
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
