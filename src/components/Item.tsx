import React from 'react'
import '../css/Item.css'
import folderImg from '../assets/folder.png'
import fileImg from '../assets/file.png'
import selectPng from '../assets/select.png'

interface Props {
    name: string;
    description: string;
    icon: string;
    isSelect?: boolean;
    onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined
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

    return (
        <div onClick={props.onClick}>
            <div className="item-root">
                <img className="item-icon" src={selectImg(props.icon)} alt={props.icon} />
                <div className="item-text">
                    <span className="item-name">{props.name}</span>
                    <br />
                    <span className="item-description">{props.description}</span>
                </div>
                {props.isSelect?<img className="item-select" src={selectPng} alt="select" />:null}
            </div>
        </div>
    )
}

export default Item