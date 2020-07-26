const ORDER_STATUS = {
    open : 'OPEN',
    accepted: 'ACCEPTED',
    preparing: 'PREPARING',
    served: 'SERVED',
    billed: 'BILLED'
}

const QRCODE_TYPE = {
    table: 'TABLE',
    room: 'ROOM'
}

const WEBSITEURL = process.env.NODE_ENV == 'development'? 'http://localhost:2017/': 'https://www.qrcode.com'

module.exports= {
    ORDER_STATUS,
    WEBSITEURL
}
