// DATA CONTROLLER
var dataController = (function() {
	
	var questions = [
		{
			question: 'What was Leonardo DiCaprio\'s first movie?',
			choices: ['Titanic', 'Critters 3', 'What\s Eating Gilbert Grape', 'Romeo + Juliet'],
			correct: 2

		},
		{
			question: 'Who starred in the movie Fight Club?',
			choices: ['Jared Leto', 'Johnny Depp', 'Brad Pitt', 'Edward Norton'],
			correct: 4
		}
		{
			question: 'How many infinity stones are there in the Marvel universe?',
			choices: [5, 4, 8, 6],
			correct: 4
		}
		{
			question: 'Who played the first Batman in a movie?',
			choices: ['Michael Caine', 'Michael Jacskson', 'Michael Keaton', 'Michael Douglas'],
			correct: 3
		}
	]


})();

// UI CONTROLLER 
var UIController = (function() {
	
})();

var contoller = (function(dataCtrl, UICtrl) {

	var eventListeners = function() {
		document.querySelector('.nextBtn').addEventListener('click', nextQuestion);
	};

	var nextQuestion = function() {
		// 1. Get checked input
		
		// 2. Store answer in data structure

		// 2. Change to the next question
	}

	return{
		init: function() {
			eventListeners();
		}
	}

})();

contoller.init(dataController, UIController);