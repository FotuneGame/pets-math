import type { ProviderType } from "@shared/types/provider";
import { App, ConfigProvider } from 'antd';

export const ThemeProvider = ({ children }: ProviderType) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          colorBgBase: '#ffffff',
          colorTextBase: 'rgba(0, 0, 0, 0.88)',
          colorBorder: '#d9d9d9',
          colorBgContainer: '#ffffff',
          colorBgElevated: '#ffffff',
          colorBgLayout: '#f5f5f5',
          colorText: 'rgba(0, 0, 0, 0.88)',
          colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
          colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
          colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
          colorFill: '#000000e0',
          colorFillSecondary: 'rgba(0, 0, 0, 0.06)',
          colorFillTertiary: 'rgba(0, 0, 0, 0.04)',
          colorFillQuaternary: 'rgba(0, 0, 0, 0.02)',
          borderRadius: 2,
        },
        components: {
          Button: {
            colorPrimary: '#1890ff',
            colorPrimaryHover: '#40a9ff',
            colorPrimaryActive: '#096dd9',
            colorText: 'rgba(0, 0, 0, 0.88)',
            colorTextDisabled: 'rgba(0, 0, 0, 0.25)',
            colorBgTextHover: '#f5f5f5',
            colorBgTextActive: '#e6f7ff',
          },
          Input: {
            colorBgContainer: '#ffffff',
            colorBorder: '#d9d9d9',
            colorText: 'rgba(0, 0, 0, 0.88)',
            colorTextPlaceholder: 'rgba(0, 0, 0, 0.45)',
          },
          Table: {
            colorBgContainer: '#ffffff',
            colorBorderSecondary: '#f0f0f0',
            colorTextHeading: 'rgba(0, 0, 0, 0.88)',
            colorText: 'rgba(0, 0, 0, 0.65)',
            colorFillAlter: 'rgba(0, 0, 0, 0.02)',
            colorFillContent: 'rgba(0, 0, 0, 0.06)',
          },
          Modal: {
            colorBgElevated: '#ffffff',
            colorText: '#000000e0',
          },
          Card: {
            colorBgContainer: '#ffffff',
            colorBorder: '#d9d9d9',
          },
          Menu: {
            itemBg: '#ffffff',                  
            itemColor: 'rgba(0, 0, 0, 0.88)',   
            itemSelectedColor: '#1890ff',     
            itemSelectedBg: '#e6f7ff',        
            itemHoverBg: '#f5f5f5',       
            subMenuItemBg: '#ffffff',        
            activeBarWidth: 0,                 
            itemActiveBg: '#e6f7ff',
            itemHoverColor: 'rgba(0, 0, 0, 0.88)',
          }
        },
      }}
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
};