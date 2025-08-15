import {HomeOutlined, FolderOutlined, WechatWorkOutlined} from "@ant-design/icons";
import type { NavItemType } from "@shared/types/navigation";
import { PATHS } from "@shared/const/";


export const items: Array<NavItemType> = [
  {
    key: "main",
    label: "Главная",
    icon: <HomeOutlined />,
    url: PATHS.home,
  },
  {
    key: "chats",
    label: "Чаты",
    icon: <FolderOutlined />,
    children: [
      {
        key: "chat_1",
        label: "Чаты",
        icon: <WechatWorkOutlined />,
        url: `${PATHS.chat}/1`,
      }
    ]
  },
]