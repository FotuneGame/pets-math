import { useState } from 'react';
import { Card, Button, Space, App } from 'antd';
import { CopyOutlined, CheckOutlined, PlayCircleOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import type { CodeEditorPropsType } from '../model/types';



export const CodeEditor = ({ defaultCode, apply, title, language='javascript', ...props }: CodeEditorPropsType) => {
  const [code, setCode] = useState(defaultCode);
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

  const handleRunCodeSafe = () => {
    try {
      const func = new Function(`return ${code}`);
      apply(func());
      message.success('Код готов');
    } catch (error) {
      if(error instanceof Error)
        message.error(`Ошибка выполнения: ${error.message}`);
      else
        message.error(`Ошибка выполнения`);
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
          <Button 
            icon={<PlayCircleOutlined />}
            onClick={handleRunCodeSafe}
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