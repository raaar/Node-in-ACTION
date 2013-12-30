//.p66 Code is incorrect
var events = require('events')
, net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join' , function(id, client){

	var welcome = "Welcome! \nGuests online: " + this.listeners('broadcast').length;
	client.write(welcome + '\n');
	channel.setMaxListeners(50);

	this.clients[id] = client;
	this.subscriptions[id] = function(senderId , message) {
		if(id != senderId) {
			this.clients[id].write(message);
		}
	}
	this.on('broadcast' , this.subscriptions[id]);
	console.log(channel.subscriptions);
});

channel.on('leave', function(id){
	channel.removeListener(
		'broadcast', this.subscriptions[id]);
	channel.emit('broadcast', id, id + " has left the chat.\n");
});

channel.on('shutdown' , function(){
	channel.emit('broadcast' , '' , 'Chat has shut down.\n' );
	channel.removeAllListeners('broadcast');
});

channel.on('list' , function(){
	channel.emit('broadcast' , '' , "there are currently " + this.listeners('broadcast').length + " member(s)." );
});

var server = net.createServer(function (client){
	var id = client.remoteAddress + ':' + client.remotePort;
	channel.emit('join' , id , client);

	client.on('data' , function(data){
		data = data.toString();
		channel.emit('broadcast' , id , data);
		//console.log(id);
		//console.log(client.bytesRead + " written: " + client.bytesWritten);
	})

	client.on('close' , function(){
		channel.emit('leave', id);
	});

	// Custom Commands
	client.on('data' , function(data){
		data.toString();
		//if(data == "shutdown\r\n"){
		//	channel.emit('shutdown');
		//}
		if(data == "list\r\n") {
			channel.emit('list');	
			//console.log('list function here')
		}
		channel.emit('broadcast', id , data);


	});
})
server.listen(8888);




/* 	
	Simple Telnet Server in Node.js

	http://www.davidmclifton.com/2011/07/22/simple-telnet-server-in-node-js/
*/
/*
var net = require('net');

var sockets = [];

function receiveData(data) {
	for(var i = 0 ; i < sockets.length ; i++){
		sockets[i].write(data);
	}
}
 
function newSocket(socket) {
	sockets.push(socket);
	socket.write('Welcome to the Telnet Server!');
	socket.on('data', function(data){
		receiveData(data);
	})

	socket.on('end', function(){
		closeSocket(socket);
	})
}

function closeSocket(socket) {
	var i = sockets.indexOf(socket);
	if( i != -1) {
		sockets.splice(i , 1);
	}
}

var server = net.createServer(newSocket);

server.listen(8888);
*/