/**
 * websocket 
 * 
 * 
 * 
事件
        open	Socket.onopen	连接建立时触发
        message	Socket.onmessage	客户端接收服务端数据时触发
        error	Socket.onerror	通信发生错误时触发
        close	Socket.onclose	连接关闭时触发
method
        Socket.send()	
        使用连接发送数据

        Socket.close()	
        关闭连接
 * 
 */
// export const socket = new WebSocket("ws://localhost:9998/echo");