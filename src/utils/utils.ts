import { message } from 'antd'
import suffixJson from '../json/suffix.json'

let _url = 'http://127.0.0.1:8080/'

export function setUrl(url: string) {
    _url = url
}

export function get(suffix: string, callback: (res: any) => void) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', _url + suffix, true)
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send()
    xhr.onreadystatechange = () => {
        // alert(xhr.readyState + '  ' + xhr.status)
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText))
        }
    }
}
export function post(suffix: string, content: string, callback: (res: any) => void) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', _url + suffix, true)
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send(content)
    xhr.onreadystatechange = () => {
        // alert(xhr.readyState + '  ' + xhr.status)
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText))
        }
    }
}

// file type
export function getFileType(name: string) {

    let type = 'file' as 'file' | 'document' | 'video' | 'image'
    if (name.lastIndexOf('.') === -1) {
        return type
    }
    const suffix = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
    suffixJson.document.forEach((value) => {
        if (suffix === value) type = 'document'
    })
    suffixJson.image.forEach((value) => {
        if (suffix === value) type = 'image'
    })
    suffixJson.video.forEach((value) => {
        if (suffix === value) type = 'video'
    })
    return type
}

interface SuffixJson {
    mime: {
        [name: string]: string
    }
    document: string[]
    image: string[]
    video: string[]
}

export function getMIME(name: string) {
    const suffix = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
    return (suffixJson as SuffixJson).mime[suffix]
}

export function getSuffix(name: string) {
    return name.substring(name.lastIndexOf('.') + 1).toLowerCase()
}

export function replace(content: string, current: string, fileName: string) {
    return content.replace(new RegExp('&{current}','g'), current)
        .replace(new RegExp('&{file}','g'), fileName)
        .replace(new RegExp('&{file-without-suffix}','g'), fileName.substring(0, fileName.lastIndexOf('.')))
}

export function getFirstCode(content: string, current: string, fileName: string) {
    let retValue = ''
    const codes = content.split('\n')
    if (codes.length === 0) return retValue
    if (codes.length === 1) return codes[0]
    codes.forEach((code) => {
        const slices = code.split(' ')
        if (slices.length > 0 && slices[0] !== 'cd' && retValue === '') {
            retValue = replace(code, current, fileName)
        }
    })
    return retValue
}
