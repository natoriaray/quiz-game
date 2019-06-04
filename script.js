// DATA CONTROLLER
var dataController = (function() {
	var questions, correctAns, userAns, arrays;
	
	questions = [
		{
			question: 'What was Leonardo DiCaprio\'s first movie?',
			choices: ['Titanic', 'Critters 3', 'What\'s Eating Gilbert Grape', 'Romeo + Juliet'],
			correct: 2

		},
		{
			question: 'Who starred in the movie Fight Club?',
			choices: ['Jared Leto', 'Johnny Depp', 'Brad Pitt', 'Edward Norton'],
			correct: 4
		},
		{
			question: 'How many infinity stones are there in the Marvel universe?',
			choices: [5, 4, 8, 6],
			correct: 4
		},
		{
			question: 'Who played the first Batman in a movie?',
			choices: ['Michael Caine', 'Michael Jackson', 'Michael Keaton', 'Michael Douglas'],
			correct: 3
		}
	];

	arrays = {
		correctAns: [2, 4, 4, 3],
		userAns:[]
	}
	


	return {
		getQuestions: function() {
			return questions;
		},

		storeAns: function() {
			for (var i = 0; i < 4; i++) {
				if (document.getElementById('input-' + i).checked) {
					arrays.userAns.push(i);
					console.log(arrays.userAns)
				} 
			}
		},

		test: function() {
			console.log('this is is working')
		}
	}


})();

// UI CONTROLLER 
var UIController = (function(dataCtrl) {
	var questions;

	var DOMStrings = {
		curQuestion: document.querySelector('.current-question'),
		questionText: document.querySelector('.question-text'),
		allAnswers: document.querySelector('.all-answers'),
		prevBtn: document.querySelector('.prevBtn'),
		nextBtn: document.querySelector('.nextBtn')
	};

	questions = dataCtrl.getQuestions();

	return {
		displayQuestion: function(num) {

			DOMStrings.questionText.textContent = questions[num].question;

			for (var i = 0; i < questions[num].choices.length; i++) {
				document.getElementById('label-' + i).textContent = questions[num].choices[i];
			}

	
		},

		displayPrevBtn: function() {
			DOMStrings.prevBtn.style.display = 'inline';
			
		},

		hidePrevBtn: function() {
			DOMStrings.prevBtn.style.display = 'none';
		},

		displaySubBtn: function() {

		},
		
		getDOMStrings: function() {
			return DOMStrings;
		}
	}
	
})(dataController);

var controller = (function(dataCtrl, UICtrl) {
	var DOM = UICtrl.getDOMStrings();
	var currentQ = 0;

	var start = function() {
		window.onload = function() {
			UICtrl.displayQuestion(currentQ);
			UICtrl.hidePrevBtn();


		}
	}

	var eventListeners = function() {
		DOM.nextBtn.addEventListener('click', nextQuestion);
		DOM.prevBtn.addEventListener('click', prevQuestion);
	};

	var questions = dataCtrl.getQuestions();
	


	var nextQuestion = function() {

		// 1. Store answer in data structure
		dataCtrl.storeAns();
		// 2. Change to the next question
		currentQ += 1
		if (currentQ < 4) {
			UICtrl.displayQuestion(currentQ);
		}
		// 3. Display previous button
		if (currentQ > 0) {
			UICtrl.displayPrevBtn();
		} 
		// 3. Display submit button if on the last question
		UICtrl.displaySubBtn();
	}

	var prevQuestion = function() {
		currentQ -= 1;
		
		//1. Display previous button
		if (currentQ > -1) {
			UICtrl.displayQuestion(currentQ);
		}
		//2. If using this previous button, hide previous button when going back to first question
		if (currentQ === 0){
			UICtrl.hidePrevBtn();
		}
	};

	return{
		init: function() {
			start();
			eventListeners();
		}
	}

})(dataController, UIController);

controller.init();









