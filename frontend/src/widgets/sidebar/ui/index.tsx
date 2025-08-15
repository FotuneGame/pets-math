import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { findUrlByKey } from "../utils/findUrlByKey";
import type { SidebarPropsType } from "../model/types";
import styles from "./Sidebar.module.scss";
const { Sider } = Layout;

export const Sidebar = ({ items, setCollapsed, collapsed, defaultSelectedKeys }: SidebarPropsType) => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const select = (e: any) => {
    const url = findUrlByKey(e.key, items);
    if (url) navigate(url);
  };

  return (
    <Sider style={{background:colorBgContainer}} className={styles.sider} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Menu mode="inline" items={items} defaultSelectedKeys={defaultSelectedKeys} onClick={select} />
    </Sider>
  );
}
