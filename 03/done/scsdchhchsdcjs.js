var events	= require('events')
,	util	= require('util');

var fs = require('fs')
,	watchDir	= './'
,	processDir	= './';

function Watcher (watchDir, processDir) {
	this.watchDir		= watchDir;
	this.processDir		= processDir;
}
// The Watcher object inherits the EventsEmitter listeners
util.inherits(Watcher, events.EventEmitter);

Watcher.prototype.watch = function() {
	var watcher = this;
	fs.readdir(this.watchDir, function(err , files){
		if(err) throw err;
		for(var index in files) {
			Watcher.emit('process', files[index]);
		}
	})
}

Watcher.prototype.start = function(){
	var watcher = this;
	fs.watchFile(watchDir, function(){
		watcher.watch();
	})
}

var watcher = new Watcher(watchDir , processDir);

watcher.on('process' , function process(file){
	var watchFile = this.watchDir + '/' + file;
	var processedFile = this.processedDir + '/' + file.toLowerCase();

	fs.rename(watchFile, processedFile , function(err){
		if (err) throw err;
	})
})

watcher.start();