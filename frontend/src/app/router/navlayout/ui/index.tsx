import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import { useState } from "react";
import {Navbar, Sidebar, Burger} from "@widgets/";
//import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useIsMobile } from "@shared/hooks/";
import { items } from "../model/data";
const { Content } = Layout;



export const NavLayout = () => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      {isMobile ? (
        <Burger setCollapsed={setCollapsed} collapsed={collapsed} items={items}/>
      ) : (
        <Sidebar setCollapsed={setCollapsed} collapsed={collapsed} items={items}/>
      )}
      <Layout>
        <Navbar setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            padding: isMobile ? "0rem" : "2rem",
            borderRadius: borderRadiusLG,
          }}
        >
          {//<Breadcrumbs style={{ margin: "1rem" }} items={items} />
          }
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default NavLayout;
