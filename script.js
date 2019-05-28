// DATA CONTROLLER
var dataController = (function() {
	var userAnswers, correctAnswers1;

	correctAnswers1 = []
	userAnswers = [];


})();

// UI CONTROLLER 
var UIController = (function() {
	var questions1, questions1Arr;

	questionsLeo = {
		1: document.getElementById('1'),
		2: document.getElementById('2'),
		3: document.getElementById('3'),
		4: document.getElementById('4')
	}

	questionsLeoArr = [document.getElementById('1'), document.getElementById('2'), document.getElementById('3'), document.getElementById('4')];
	return {
		getInput: function(question, arr) {
			if (question === 'question-1') {
				arr.forEach(function(el) {
					if (el.checked) {
						return el.id
					};
				});
			};
				
		}
	};

})();

var contoller = (function(dataCtrl, UICtrl) {

	var eventListeners = function() {
		document.querySelector('.nextBtn').addEventListener('click', nextQuestion);
	};

	var nextQuestion = function() {
		// 1. Get checked input
		UICtrl.getInput();
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