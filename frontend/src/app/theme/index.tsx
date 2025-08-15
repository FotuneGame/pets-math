import type { ProviderType } from "@shared/types/provider";
import { ConfigProvider } from 'antd';

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
            // Стили для type="text"
            colorText: 'rgba(0, 0, 0, 0.88)',        // обычный текст
            colorTextDisabled: 'rgba(0, 0, 0, 0.25)', // неактивное состояние
            colorBgTextHover: '#f5f5f5',             // фон при наведении
            colorBgTextActive: '#e6f7ff',            // фон при нажатии
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
            colorItemBg: '#ffffff',
            colorItemText: 'rgba(0, 0, 0, 0.88)',
            colorItemTextSelected: '#1890ff',
            colorItemBgSelected: '#e6f7ff',
            colorItemBgHover: '#f5f5f5',
            colorSubItemBg: '#ffffff',
            colorActiveBarWidth: 0,
          }
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};