function encodeQuery(query: { [key: string]: any }): string {
    let queryStr = ''
    let keys = Object.keys(query)
    // a=1&b=2
    keys.forEach((item, index) => {
        queryStr = index
            ? `${queryStr}&${item}=${query[item]}`
            : `${queryStr}${item}=${query[item]}`
    })
    return queryStr
}

// 接收解码
function decodeQuery(queryStr: string): any {
    let query: { [key: string]: any } = {}
    // 中文需解码
    queryStr = decodeURI(queryStr.replace('?', ''))
    let queryArr = queryStr.split('&')
    queryArr.forEach(item => {
        let keyAndValue = item.split('=')
        query[keyAndValue[0]] = keyAndValue[1]
    })
    return query
}

export { encodeQuery, decodeQuery }