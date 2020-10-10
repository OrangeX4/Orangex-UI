import { message } from 'antd'
import React, { useState } from 'react'

import ConfirmDrawer from './ConfirmDrawer'
import InputArea from './InputArea'

interface Props {
    title: string
    content: string
    onChange: (oldTitle: string, newTitle: string, newContent: string) => void
    onRun: (title: string) => void
    onDelete: (title: string) => void
}

function TerminalItem(props: Props) {

    // Click and Press
    const [touchTimeOut, setTouchTimeOut] = useState(setTimeout(() => { }, 0))
    const [isClick, setIsClick] = useState(true)
    const [isTouch, setIsTouch] = useState(false)

    function handleTouchStart() {
        setIsTouch(true)

        clearTimeout(touchTimeOut)
        setTouchTimeOut(setTimeout(() => {
            setIsClick(false)

            // Long Press
            setIsDelete(!isDelete)
        }, 500))
    }

    function handleTouchEnd() {
        clearTimeout(touchTimeOut)
        if (isClick) {
            // Click
            setIsInputDisplay(true)
        } else {
            setIsClick(true)
        }
    }

    function handleTouchMove() {
        clearTimeout(touchTimeOut)
        setIsClick(false)
    }

    function handleMouseDown() {
        if (!isTouch) {
            clearTimeout(touchTimeOut)
            setTouchTimeOut(setTimeout(() => {
                setIsClick(false)

                // Long Press
                setIsDelete(!isDelete)
            }, 500))
        }
    }

    function handleMouseUp() {
        if (!isTouch) {
            clearTimeout(touchTimeOut)
            if (isClick) {
                // Click
                setIsInputDisplay(true)
            } else {
                setIsClick(true)
            }
        }
    }

    // Run or Delete

    const [isDelete, setIsDelete] = useState(false)

    function handleRun(e: React.TouchEvent<HTMLAnchorElement> | React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.stopPropagation()
        props.onRun(props.title)
    }
    function handleDelete(e: React.TouchEvent<HTMLAnchorElement> | React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.stopPropagation()
        setIsDrawerDisplay(true)
    }

    const [isDrawerDisplay, setIsDrawerDisplay] = useState(false)
    const [isInputDisplay, setIsInputDisplay] = useState(false)

    return (
        <div className='terminal-item' onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <div className='terminal-text'>
                <div className='terminal-text-title'>{props.title}</div>
                <div className='terminal-text-content'>{props.content}</div>
            </div>
            <div className='terminal-buttoncontainer'>
                {isDelete ? <a onTouchEnd={(e) => e.stopPropagation()} onMouseUp={handleDelete} onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} className='terminal-button' href='/#'>Delete</a>
                    : <a onTouchEnd={(e) => e.stopPropagation()} onMouseUp={handleRun} onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} className='terminal-button' href='/#'>Run</a>}

            </div>
            <div onMouseUp={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
                <ConfirmDrawer isDisplay={isDrawerDisplay} onConfirm={() => { setIsDrawerDisplay(false); props.onDelete(props.title) }} onCancle={() => setIsDrawerDisplay(false)} onClose={() => setIsDrawerDisplay(false)}>Are you sure to delete the item?</ConfirmDrawer>
            </div>
            <div onMouseUp={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
                <InputArea title={props.title} content={props.content} isDisplay={isInputDisplay} onConfirm={(title, content) => props.onChange(props.title, title, content)} onCancle={() => setIsInputDisplay(false)}></InputArea>
            </div>
        </div>
    )
}

export default TerminalItem