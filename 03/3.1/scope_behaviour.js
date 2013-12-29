function asyncFunction(callback) {
	setTimeout(function(){
		callback()
	}, 200)
}

var color = 'blue';

/*	P.56
	To "freeze" the contents of the color variable you can 
	modify your logic and use a JavaScript closure. 
 	You wrap the call to asyncFunction in an anonymous function 
 	that takes a color argument. 
 	You then immediately execute the anonymous function, 
 	sending it the current contents of color. 
 	By making color an argument for the anonymous function, 
 	it becomes local to the scope of that function and when 
 	the value of color is changed outside of the anonymous function,
 	the local version is unaffected.
*/
(function(color){
	asyncFunction(function(){
		console.log('The color is ' + color);
	});	
})(color); 	/* 	This is the moment the anonymous function is called, 
				sending the variable color as the parameter.
			*/	


color = 'green';