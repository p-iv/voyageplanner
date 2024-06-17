import { useState } from "react";
import styles from "./AppNav.module.css";
import { Button, Layout, Menu, theme } from "antd";
import {
  HomeOutlined,
  GlobalOutlined,
  HistoryOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Header, Sider } = Layout;

function AppNav() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={styles.appnav}>
      <Sider
        theme="light"
        collapsed={collapsed}
        collapsible
        trigger={null}
        className={styles.appnav}
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
  return (
    <Menu mode="inline" className={styles.menu}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.SubMenu
        key="destinations"
        icon={<GlobalOutlined />}
        title="Destinations"
      >
        <Menu.Item key="popular-destinations">Popular Destinations</Menu.Item>
        <Menu.Item key="nearby-destinations">Nearby Destinations</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="my-trips" icon={<HistoryOutlined />}>
        My Trips
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
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

export default AppNav;
