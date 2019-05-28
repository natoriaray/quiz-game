// DATA CONTROLLER
var dataController = (function() {

	//some code

})();

// UI CONTROLLER 
var UIController = (function() {

//some code

})();

var contoller = (function() {

	var eventListeners = function() {
		document.querySelector('.nextBtn').addEventListener('click', nextQuestion);
	};

	var nextQuestion = function() {
		console.log('event listeners working')
	}

	return{
		init: function() {
			eventListeners();
		}
	}

})();

contoller.init();