import { useState } from 'react';
import { Card, Button, Space, App } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import type { CodeEditorPropsType } from '../model/types';



export const CodeEditor = ({ defaultCode, code, setCode, language='javascript', title, ...props }: CodeEditorPropsType) => {
  const [isCopied, setIsCopied] = useState(false);
  const { message } = App.useApp();

  const handleEditorChange = (value: string | undefined) => {
    if (value)
      setCode(value);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      message.success('Код скопирован!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      message.error('Не удалось скопировать код');
    }
  };

  return (
    <Card 
      title={title}
      extra={
        <Space>
          <Button 
            icon={isCopied ? <CheckOutlined /> : <CopyOutlined />}
            onClick={handleCopyCode}
          />
        </Space>
      }
      {...props}
    >
      <div style={{ height: '300px', border: '1px solid #d9d9d9', borderRadius: '6px' }}>
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            automaticLayout: true,
            minimap: { enabled: false },
          }}
          theme="vs-light"
        />
      </div>
    </Card>
  );
};