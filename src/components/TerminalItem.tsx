import React, {useState} from 'react'

interface Props {
    title: string
    content: string
}

function TerminalItem(props: Props) {

    // Click and Press
    const [touchTimeOut, setTouchTimeOut] = useState(setTimeout(()=>{},0))
    const [isClick, setIsClick] = useState(true)

    function handleTouchStart() {
        clearTimeout(touchTimeOut)
        setTouchTimeOut(setTimeout(() => {
            setIsClick(false)

            // Long Press
            alert('Press')
        }, 500))
    }

    function handleTouchEnd() {
        clearTimeout(touchTimeOut)
        if (isClick) {
            // Click
            alert('Click')
        } else {
            setIsClick(true)
        }
    }

    function handleTouchMove() {
        clearTimeout(touchTimeOut)
        setIsClick(false)
    }

    function handleRun(e: React.TouchEvent<HTMLAnchorElement>|React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.stopPropagation()
        alert('Run')
    }

    return (
        <div className='terminal-item'  onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove} onMouseDown={handleTouchStart} onMouseUp={handleTouchEnd}>
            <div className='terminal-text'>
                <div className='terminal-text-title'>{props.title}</div>
                <div className='terminal-text-content'>{props.content}</div>
            </div>
            <div className='terminal-buttoncontainer'>
                <a onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} onTouchEnd={handleRun} onMouseUp={handleRun} className='terminal-button' href='/#'>Run</a>
            </div>
        </div>
    )
}

export default TerminalItem