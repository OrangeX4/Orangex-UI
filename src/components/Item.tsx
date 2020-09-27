import React from "react"
import '../css/Item.css'

interface Props {
    name: String;
    description: String
}

function Item(props: Props) {
return (
    <div>
        <div className="root">
            {/* <img /> */}
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