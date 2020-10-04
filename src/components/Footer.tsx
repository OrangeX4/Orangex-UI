import React, { useState } from 'react'

import { Drawer, Button, Row, Col } from 'antd'

import '../css/Footer.css'

import copyImg from '../assets/copy.png'
import moveImg from '../assets/move.png'
import renameImg from '../assets/rename.png'
import deleteImg from '../assets/delete.png'

interface Props {
    onDelete: () => void
}

function Footer(props: Props) {
    // Delete Button
    const [isDeleteShow, setIsDeleteShow] = useState(false)
    function handleDelete(){
        setIsDeleteShow(false)
        props.onDelete()
    }

    return (
        <div className='footer'>
            <div className='footer-button'>
                <img className='footer-img' src={copyImg} alt='copy' />
                <span className='footer-text'>Copy</span>
            </div>
            <div className='footer-button'>
                <img className='footer-img' src={moveImg} alt='move' />
                <span className='footer-text'>Move</span>
            </div>

            {/* Rename Button */}
            <div className='footer-button'>
                <img className='footer-img' src={renameImg} alt='rename' />
                <span className='footer-text'>Rename</span>
            </div>
            <Drawer placement='bottom'
                onClose={() => setIsDeleteShow(false)}
                closable={false}
                visible={isDeleteShow}
                height={150}
                key='drawer'>
                <p className='message-text'>Are you sure to delete the item?</p>
                <Row gutter={16}>
                    <Col span={12}><Button onClick={() => setIsDeleteShow(false)} shape="round" size='large' block={true}>Cancle</Button></Col>
                    <Col span={12}><Button onClick={handleDelete} type="primary" shape="round" size='large' block={true}>Ok</Button></Col>
                </Row>
            </Drawer>

            {/* Delete Button */}
            <div onClick={() => setIsDeleteShow(true)} className='footer-button'>
                <img className='footer-img' src={deleteImg} alt='delete' />
                <span className='footer-text'>Delete</span>
            </div>
            <Drawer placement='bottom'
                onClose={() => setIsDeleteShow(false)}
                closable={false}
                visible={isDeleteShow}
                height={150}
                key='drawer'>
                <p className='message-text'>Are you sure to delete the item?</p>
                <Row gutter={16}>
                    <Col span={12}><Button onClick={() => setIsDeleteShow(false)} shape="round" size='large' block={true}>Cancle</Button></Col>
                    <Col span={12}><Button onClick={handleDelete} type="primary" shape="round" size='large' block={true}>Ok</Button></Col>
                </Row>
            </Drawer>

        </div>
    )
}

export default Footer