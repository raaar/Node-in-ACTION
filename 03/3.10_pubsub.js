/*
var events = require('events')
,	net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join' , function (id , client) {
	this.clients[id] = client;
	this.subscriptions[id] = function(senderId , message) {
		if( id != senderId ) {
			this.clients[id].write(message);
		}
	} 
	this.on('broadcast' , this.subscriptions[id]);
});

var server = net.createServer(function(client){
	var id = client.remoteAddress + ':' + client.remotePort;
	client.on('connect', function(){
		channel.emit('join' , id , client);
	});
	client.on('data' , function(data){
		data = data.toString();
		channel.emit('broadcast' , id , data);
	})
})
server.listen(8888);
*/



/* 	
	Simple Telnet Server in Node.js

	http://www.davidmclifton.com/2011/07/22/simple-telnet-server-in-node-js/
*/
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