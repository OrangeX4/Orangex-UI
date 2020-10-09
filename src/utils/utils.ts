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
    xhr.open('POST', _url, true)
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send(content)
    xhr.onreadystatechange = () => {
        // alert(xhr.readyState + '  ' + xhr.status)
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText))
        }
    }
}