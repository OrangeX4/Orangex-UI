import React from 'react'

import { Divider } from 'antd';

import '../css/Terminal.css'

interface Props {

}

function Terminal(props: Props) {

    return (
        <div className='terminal'>
            <div className='terminal-out'>Out:</div>

            <Divider>Current</Divider>
            <div className='terminal-item'>
                <div className='terminal-text'>
                    <div className='terminal-text-title'>Title</div>
                    <div className='terminal-text-content'>Content</div>
                </div>
                <div className='terminal-buttoncontainer'>
                    <a className='terminal-button'>Button</a>
                    <a className='terminal-button'>Button</a>
                </div>
            </div>
            <div className='terminal-item'>Content</div>
            <div className='terminal-item'>Content</div>

            <Divider>File</Divider>
            <div className='terminal-item'>Content</div>
            <div className='terminal-item'>Content</div>
            <div className='terminal-item'>Content</div>

            <Divider>Default</Divider>
            <div className='terminal-item'>Content</div>
            <div className='terminal-item'>Content</div>
            <div className='terminal-item'>Content</div>

        </div>
    )
}

export default Terminal