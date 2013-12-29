/*
function doSomething () {
	return true;
}


function asyncFunction(failure , success){
	if(doSomething()){
		success();
	} else {
		failure();
	}
}

asyncFunction(
	function() 	{ 	console.log('failure') },
	function()	{	console.log('success')	}
)
*/


function someAsyncFunction(data , cb ) {
	console.log('executing someAsyncFunction');
	setTimeout(cb , 1000 , data);
}

function anotherAsyncFunction(data , cb) {
	console.log('executing anotherAsyncFunction');
	setTimeout(cb , 1000 , data);
}
function finalAsyncFunction(data , cb) {
	console.log('executing finalAsyncFunction')
	setTimeout(cb , 1000 , data);
}

function handleResult(text) {
	console.log("result: " + text);
}

function innerLogic(text) {
	finalAsyncFunction( text , handleResult);
}

function outerLogic(text) {
	anotherAsyncFunction( text , innerLogic);
}

someAsyncFunction('some data' , outerLogic);