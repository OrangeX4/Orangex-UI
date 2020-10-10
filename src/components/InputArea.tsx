import React, { useState } from 'react'

import { Drawer, Button, Input, Row, Col } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

interface Props {
    title: string
    content: string
    isDisplay: boolean
    onClose?: () => void
    onCancle?: () => void
    onConfirm: (title: string, content: string) => void
}

function InputArea(props: Props) {

    const [titleValue, setTitleValue] = useState(props.title)
    const [contentValue, setContentValue] = useState(props.content)

    return (
        <div className='input-area'>
            <Drawer placement='bottom'
                onClose={props.onClose}
                closable={false}
                visible={props.isDisplay}
                height={400}
                key='drawer'>
                <Row><Col span={24}><Input placeholder='Title' value={titleValue} onChange={(e) => setTitleValue(e.target.value)}/></Col></Row>
                <br />
                <Row><Col span={24}><TextArea placeholder='Content' value={contentValue} onChange={(e) => setContentValue(e.target.value)} rows={10}></TextArea></Col></Row>
                <br />
                <Row gutter={16}>
                    <Col span={12}><Button onClick={props.onCancle} shape="round" size='large' block={true}>Cancle</Button></Col>
                    <Col span={12}><Button onClick={() => props.onConfirm(titleValue, contentValue)} type="primary" shape="round" size='large' block={true}>Confirm</Button></Col>
                </Row>
            </Drawer>
        </div>
    )
}

export default InputArea