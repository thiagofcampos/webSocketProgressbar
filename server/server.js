const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

io.on('connection', socket => {
    console.log('[IO] Connection => Server has a new connection')
    socket.on('percent', data => {
        let i = 0;
        function loop() {
            setTimeout(function () {
                i++;
                if (i <= 100) {
                    console.log('[SOCKET] percent => ', data)
                    io.emit('percent', data = {
                        ...data,
                        percent: i
                    })
                    loop();
                }
            }, 500)
        }
        loop();
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
    console.log('[HTTP] Listen => Press CTRL+C to stop it')
})
