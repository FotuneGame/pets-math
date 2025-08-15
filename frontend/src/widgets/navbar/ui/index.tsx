import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import type { NavbarPropsType } from "../model/types";
const { Header } = Layout;



export const Navbar = ({ collapsed, setCollapsed }: NavbarPropsType) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
}
