import React from 'react'

import { Drawer, Button, Row, Col } from 'antd'

import '../css/Footer.css'

interface Props {
    isDisplay: boolean
    children: string|JSX.Element|JSX.Element[]
    onConfirm: () => void
    onClose: () => void
}

function ConfirmDrawer(props: Props) {

    function handleConfirm(){
        props.onConfirm()
    }

    return (

            <Drawer placement='bottom'
                onClose={props.onClose}
                closable={false}
                visible={props.isDisplay}
                height={150}>
                <p className='message-text'>{props.children}</p>
                <Row gutter={16}>
                    <Col span={12}><Button onClick={props.onClose} shape="round" size='large' block={true}>Cancle</Button></Col>
                    <Col span={12}><Button onClick={handleConfirm} type="primary" shape="round" size='large' block={true}>Ok</Button></Col>
                </Row>
            </Drawer>

    )
}

export default ConfirmDrawer