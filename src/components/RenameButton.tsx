import React, { useState } from 'react'

import { Drawer, Button, Input, Row, Col } from 'antd'

import '../css/Footer.css'

import renameImg from '../assets/rename.png'

interface Props {
    onRename: (newName: string) => void
}

function RenameButton(props: Props) {

    const [isDisplay, setIsDisplay] = useState(false)
    function handleRename(newName: string){
        setIsDisplay(false)
        props.onRename(newName)
    }

    const [inputValue, setInputValue] = useState('')
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    return (
        <div className='footer-button'>
            <div onClick={() => setIsDisplay(true)}>
                <img className='footer-img' src={renameImg} alt='rename' />
                <span className='footer-text'>Rename</span>
            </div>
            <Drawer placement='bottom'
                onClose={() => setIsDisplay(false)}
                closable={false}
                visible={isDisplay}
                height={150}
                key='drawer'>
                <Row><Col span={24}><Input value={inputValue} onChange={handleChange} placeholder='Please enter new name' /></Col></Row>
                <br />
                <Row gutter={16}>
                    <Col span={12}><Button onClick={() => setIsDisplay(false)} shape="round" size='large' block={true}>Cancle</Button></Col>
                    <Col span={12}><Button onClick={() => handleRename(inputValue)} type="primary" shape="round" size='large' block={true}>Ok</Button></Col>
                </Row>
            </Drawer>

        </div>
    )
}

export default RenameButton