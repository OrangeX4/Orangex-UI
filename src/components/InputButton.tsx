import React, { useState } from 'react'

import { Drawer, Button, Input, Row, Col } from 'antd'

import '../css/Footer.css'



interface Props {
    onConfirm: (text: string) => void
    name: string
    icon: string
    default?: string
    placeholder?: string
}

function InputButton(props: Props) {

    const [isDisplay, setIsDisplay] = useState(false)
    function handleRename(newName: string) {
        setIsDisplay(false)
        props.onConfirm(newName)
    }

    const [inputValue, setInputValue] = useState('')
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    function handleClick() {
        setInputValue(props.default ? props.default : '')
        setIsDisplay(true)
    }

    return (
        <div className='footer-button'>
            <div onClick={handleClick}>
                <img className='footer-img' src={props.icon} alt={props.name} />
                <span className='footer-text'>{props.name}</span>
            </div>
            <Drawer placement='bottom'
                onClose={() => setIsDisplay(false)}
                closable={false}
                visible={isDisplay}
                height={150}
                key='drawer'>
                <Row><Col span={24}><Input value={inputValue} onChange={handleChange} placeholder={props.placeholder ? props.placeholder : 'Please enter new name'} /></Col></Row>
                <br />
                <Row gutter={16}>
                    <Col span={12}><Button onClick={() => setIsDisplay(false)} shape="round" size='large' block={true}>Cancle</Button></Col>
                    <Col span={12}><Button onClick={() => handleRename(inputValue)} type="primary" shape="round" size='large' block={true}>Ok</Button></Col>
                </Row>
            </Drawer>

        </div>
    )
}

export default InputButton