export type CodeEditorPropsType = {
    defaultCode: string,
    language: 'javascript',
    code: string,
    setCode: React.Dispatch<React.SetStateAction<string>>,
    title?: string,
}