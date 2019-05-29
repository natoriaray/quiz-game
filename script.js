// DATA CONTROLLER
var dataController = (function() {
	
	var questions = [
		{
			number: 0,
			question: 'What was Leonardo DiCaprio\'s first movie?',
			choices: ['Titanic', 'Critters 3', 'What\s Eating Gilbert Grape', 'Romeo + Juliet'],
			correct: 2

		},
		{
			number: 1,
			question: 'Who starred in the movie Fight Club?',
			choices: ['Jared Leto', 'Johnny Depp', 'Brad Pitt', 'Edward Norton'],
			correct: 4
		},
		{
			number: 2,
			question: 'How many infinity stones are there in the Marvel universe?',
			choices: [5, 4, 8, 6],
			correct: 4
		},
		{
			number: 3,
			question: 'Who played the first Batman in a movie?',
			choices: ['Michael Caine', 'Michael Jacskson', 'Michael Keaton', 'Michael Douglas'],
			correct: 3
		}
	]

	return {
		getQuestions: function() {
			return questions;
		},

		test: function() {
			console.log('this is is working')
		}
	}


})();

// UI CONTROLLER 
var UIController = (function(dataCtrl) {

	var DOMStrings = {
		curQuestion: document.querySelector('.current-question'),
		questionText: document.querySelector('.question-text'),
		allAnswers: document.querySelector('.all-answers'),
		prevBtn: document.querySelector('.prevBtn')
	};

	var questions = dataCtrl.getQuestions();

	return {
		displayQuestion: function(num) {

			console.log(num)


			//var text = document.createTextNode(questions[0].question);
			//DOMStrings.questionText.appendChild(text);

		

		},

		displayPrevBtn: function() {
			DOMStrings.prevBtn.style.display = 'inline';
		},

		hidePrevBtn: function() {
			DOMStrings.prevBtn.style.display = 'none';
		},
		
		getDOMStrings: function() {
			return DOMStrings;
		}
	}
	
})(dataController);

var controller = (function(dataCtrl, UICtrl) {
	var currentQ = 0;

	var start = function() {
		window.onload = function() {
			UICtrl.displayQuestion(currentQ);
			UICtrl.hidePrevBtn();


		}
	}

	var eventListeners = function() {
		document.querySelector('.nextBtn').addEventListener('click', nextQuestion);
		
	};

	var questions = dataCtrl.getQuestions();
	var DOM = UICtrl.getDOMStrings();


	var nextQuestion = function() {

		// 1. Get checked input
		
		// 2. Store answer in data structure

		// 3. Change to the next question
		currentQ += 1
		UICtrl.displayQuestion(currentQ);

		// 4. Display previous button
		if (!(currentQ === 0)) {
			UICtrl.displayPrevBtn();
			DOM.prevBtn.addEventListener('click', prevQuestion);
		}
	}

	var prevQuestion = function() {
		currentQ -= 1;
		console.log(currentQ)
	};

	return{
		init: function() {
			start();
			eventListeners();
		}
	}

})(dataController, UIController);

controller.init();









