import React from 'react'
import '../css/Item.css'
import folderImg from '../assets/folder.png'

interface Props {
    name: String;
    description: String
}

function Item(props: Props) {
return (
    <div>
        <div className="root">
            <img src={folderImg} alt='folder' />
            <div className="text">
                <span className="name">{ props.name }</span>
                <br />
                <span className="description">{ props.description }</span>
            </div>
        </div>
    </div>
)
}

export default Item