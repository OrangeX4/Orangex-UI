import React, { useState } from 'react'

import { Drawer, Button, Row, Col } from 'antd'

import '../css/Footer.css'

import deleteImg from '../assets/delete.png'

interface Props {
    onDelete: () => void
}

function DeleteButton(props: Props) {

    const [isDisplay, setIsDisplay] = useState(false)
    function handleDelete(){
        setIsDisplay(false)
        props.onDelete()
    }

    return (
        <div className='footer-button'>
            <div onClick={() => setIsDisplay(true)}>
                <img className='footer-img' src={deleteImg} alt='delete' />
                <span className='footer-text'>Delete</span>
            </div>
            <Drawer placement='bottom'
                onClose={() => setIsDisplay(false)}
                closable={false}
                visible={isDisplay}
                height={150}
                key='drawer'>
                <p className='message-text'>Are you sure to delete the item?</p>
                <Row gutter={16}>
                    <Col span={12}><Button onClick={() => setIsDisplay(false)} shape="round" size='large' block={true}>Cancle</Button></Col>
                    <Col span={12}><Button onClick={handleDelete} type="primary" shape="round" size='large' block={true}>Ok</Button></Col>
                </Row>
            </Drawer>

        </div>
    )
}

export default DeleteButton