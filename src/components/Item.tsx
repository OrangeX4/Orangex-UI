import React from 'react'
import '../css/Item.css'
import folderImg from '../assets/folder.png'
import fileImg from '../assets/file.png'

interface Props {
    name: string;
    description: string;
    icon: string
}

function Item(props: Props) {

    function selectImg(name: string) {
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
        <div>
            <div className="root">
                <img src={selectImg(props.icon)} alt={props.icon} />
                <div className="text">
                    <span className="name">{props.name}</span>
                    <br />
                    <span className="description">{props.description}</span>
                </div>
            </div>
        </div>
    )
}

export default Item