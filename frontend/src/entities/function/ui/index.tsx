import { App, Form, Flex, Input, Button, ColorPicker } from "antd";
import type {FunctionPropsType, AxisType, FunctionType} from "../model/types";
import {CodeEditor} from "@shared/ui/";
import { useEffect } from "react";
import { useIsMobile } from "@shared/hooks";
import {CheckOutlined, DeleteOutlined} from "@ant-design/icons";



export const FunctionFrom = ({func, update, remove}:FunctionPropsType) => {
    const isMobile = useIsMobile();
    const { message } = App.useApp();
    const [form] = Form.useForm();

    const onFinish = (values: FunctionType & {fn: string}) => {
        try{

            func = {...func, ...values};
            const newFunc = new Function(`return ${values.fn}`);
            func.fn = newFunc() as ((variables: AxisType) => Promise<Array<number>>);
            console.log(values, func)
            update(func);
            message.success(`Функция ${values.name} готова`);
        } catch (error) {
            if(error instanceof Error)
                message.error(`Ошибка выполнения: ${error.message}`);
            else
                message.error(`Ошибка выполнения`);
        }
    };


    useEffect(()=>{
        form.setFieldsValue({...func , fn: func.fn.toString()});
        console.log(form.getFieldsValue())
    }, [func])


    return (
       <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
       >
        <Form.Item
            label="Название функции"
            name="name"
            rules={[{ required: true, message: 'Обязатльное поле!' }]}
        >
            <Input placeholder="y=2x+3" />
        </Form.Item>

        <Form.Item
            label="Цвет"
            name="color"
            rules={[{ required: true, message: 'Обязатльное поле!' }]}
        >
            <ColorPicker showText format="hex" onChange={(color) => form.setFieldsValue({ color: "#"+color.toHex() })}/>
        </Form.Item>

        <Form.Item
            name="fn"
            rules={[{ required: true, message: 'Обязатльное поле!' }]}
        >
            <CodeEditor 
                title={"Функция js"} 
                defaultCode={func.fn.toString()} 
                code={form.getFieldValue("fn")} 
                setCode={(value:string)=>form.setFieldValue("fn",value)}
            />
        </Form.Item>


        <Form.Item>
            <Flex justify={"center"} gap={"1rem"} style={{paddingTop: "1rem"}}>
                <Button type={"primary"} htmlType="submit" icon={<CheckOutlined />} style={{width: "100%", maxWidth:"200px"}}/>
                <Button danger icon={<DeleteOutlined />} style={{width: "100%", maxWidth:"200px"}} onClick={remove}/>
            </Flex>
        </Form.Item>
       </Form> 
    )
}