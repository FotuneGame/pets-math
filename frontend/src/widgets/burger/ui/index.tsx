import { CloseOutlined } from "@ant-design/icons";
import { Button, Menu, theme, Drawer } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findUrlByKey } from "../utils/findUrlByKey";
import type {BurgerPropsType} from "../model/types";



export const Burger = ({ items, setCollapsed, collapsed, defaultSelectedKeys }:BurgerPropsType) => {
  const {
    token: { colorBgContainer, colorFill },
  } = theme.useToken();
  const navigate = useNavigate();

  const select = (e: any) => {
    const url = findUrlByKey(e.key, items);
    if (url) {
      navigate(url);
      setCollapsed(true);
    }
  };

  useEffect(() => {}, [collapsed]);
  return (
    <Drawer
      placement="left"
      width="100%"
      open={!collapsed}
      onClose={() => setCollapsed(false)}
      closable={false}
      styles={{
        body: {
          padding: 0,
          background: colorBgContainer,
        },
        header: {
          background: colorBgContainer,
          border: "none",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px",
        }}
      >
        <Button type="text" icon={<CloseOutlined style={{ color: colorFill }} />} onClick={() => setCollapsed(true)} />
      </div>
      <Menu mode="inline" items={items} defaultSelectedKeys={defaultSelectedKeys} onClick={select} />
    </Drawer>
  );
}
