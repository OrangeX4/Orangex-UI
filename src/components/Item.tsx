import React from 'react'
import '../css/Item.css'
import folderImg from '../assets/folder.png'
import fileImg from '../assets/file.png'
import selectPng from '../assets/select.png'

interface Props {
    name: string
    description: string
    icon: string
    isSelect?: boolean
    onClick?: () => void | undefined
    onLongPress?: () => void | undefined

}

function Item(props: Props) {

    function selectImg(name: string): string {
        switch (name) {
            case 'folder':
                return folderImg
            case 'file':
                return fileImg
            default:
                return fileImg
        }
    }

    let touchTimeStamp: number
    let isTouch: boolean = true

    function handleTouchStart() {
        isTouch = true
        touchTimeStamp = new Date().getTime()
    }

    function handleTouchEnd() {
        let currentTimeStamp = new Date().getTime()
        if(isTouch){
            if (currentTimeStamp - touchTimeStamp < 500) {
                if (props.onClick) props.onClick()
            } else {
                // alert('press')
                if (props.onLongPress) props.onLongPress()
            }
        }
    }

    function handleTouchMove() {
        isTouch = false
    }

    // function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    //     e.preventDefault()
    //   }

    return (
        <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove} onMouseDown={handleTouchStart} onMouseUp={handleTouchEnd}>
            <div className="item-root">
                <img className="item-icon" src={selectImg(props.icon)} alt={props.icon} />
                <div className="item-text">
                    <span className="item-name">{props.name}</span>
                    <br />
                    <span className="item-description">{props.description}</span>
                </div>
                {props.isSelect ? <img className="item-select" src={selectPng} alt="select" /> : null}
            </div>
        </div>
    )
}

export default Item