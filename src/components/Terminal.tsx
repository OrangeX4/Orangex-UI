import React from 'react'


import { Divider } from 'antd'

import TerminalItem from './TerminalItem'

import '../css/Terminal.css'

interface Props {

}

function Terminal(props: Props) {

    return (
        <div className='terminal'>
            <div className='terminal-out'>Out:</div>

            <Divider>File</Divider>
            <TerminalItem title='Title' content='content'></TerminalItem>
            <TerminalItem title='Title' content='content'></TerminalItem>

            <Divider>Current</Divider>
            <TerminalItem title='Title' content='content'></TerminalItem>
            <TerminalItem title='Title' content='content'></TerminalItem>

            <Divider>Default</Divider>
            <TerminalItem title='Title' content='content'></TerminalItem>
            <TerminalItem title='Title' content='content'></TerminalItem>

        </div>
    )
}

export default Terminal