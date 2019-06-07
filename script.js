// DATA CONTROLLER
var dataController = (function() {
	var questions, correctAns, userAns, arrays;
	
	questions = [
		{
			question: 'What was Leonardo DiCaprio\'s first movie?',
			choices: ['Titanic', 'Critters 3', 'What\'s Eating Gilbert Grape', 'Romeo + Juliet'],
			correct: 1

		},
		{
			question: 'Who starred in the movie Fight Club?',
			choices: ['Jared Leto', 'Johnny Depp', 'Brad Pitt', 'Edward Norton'],
			correct: 3
		},
		{
			question: 'How many infinity stones are there in the Marvel universe?',
			choices: [5, 4, 8, 6],
			correct: 3
		},
		{
			question: 'Who played the first Batman in a movie?',
			choices: ['Michael Caine', 'Michael Jackson', 'Michael Keaton', 'Michael Douglas'],
			correct: 2
		}
	];

	arrays = {
		correctAnsArr: [1, 3, 3, 2],
		userAnsArr:[]
	}
	


	return {
		getQuestions: function() {
			return questions;
		},

		getArrays: function() {
			return arrays;
		},

		storeAns: function(num) {
			if (!(arrays.userAnsArr[num])) {
				for (var i = 0; i < 4; i++) {
				if (document.getElementById('input-' + i).checked) {
					arrays.userAnsArr.push(i);
					console.log(arrays.userAnsArr);
				} 
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
	var questions, arr;

	var DOMStrings = {
		curQuestion: document.querySelector('.current-question'),
		questionText: document.querySelector('.question-text'),
		allAnswers: document.querySelector('.all-answers'),
		prevBtn: document.querySelector('.prevBtn'),
		nextBtn: document.querySelector('.nextBtn'),
		subBtn: document.querySelector('.subBtn')
	};

	questions = dataCtrl.getQuestions();
	arr = dataCtrl.getArrays();

	return {
		displayQuestion: function(num) {

			DOMStrings.questionText.textContent = questions[num].question;

			for (var i = 0; i < questions[num].choices.length; i++) {
				document.getElementById('label-' + i).textContent = questions[num].choices[i];
			}
		},

		displayUserAns: function(num) {

			for (var i = 0; i < 4; i++) {
				if (num === i) {
					document.getElementById('input-' + arr.userAnsArr[num]).checked = true;
				}
			}
		},

		clearUserAns: function(num) {
			var inp = document.querySelectorAll('input');

			if (!(arr.userAnsArr[num])) {
				for (var i = 0; i < inp.length; i++) {
					inp[i].checked = false;
				}
				
			}
		},

		displayPrevBtn: function() {
			DOMStrings.prevBtn.style.display = 'inline';
			
		},

		hidePrevBtn: function() {
			DOMStrings.prevBtn.style.display = 'none';
		},

		displaySubBtn: function() {
			DOMStrings.nextBtn.style.display = 'none';
			DOMStrings.subBtn.style.display = 'inline';
		},

		hideSubBtn: function() {
			DOMStrings.subBtn.style.display = 'none';
			DOMStrings.nextBtn.style.display = 'inline';
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
	var ans;

	var nextQuestion = function() {

		// 1. Store answer in data structure
		dataCtrl.storeAns(currentQ);

		// 2. If user already selected a question for an answer display it
		UICtrl.displayUserAns(currentQ);

		// 3. Uncheck radios
		UICtrl.clearUserAns(currentQ);
		
		// 4. Change to the next question
		currentQ += 1
		if (currentQ < 4) {
			UICtrl.displayQuestion(currentQ);
		}

		// 5. Display previous button
		if (currentQ > 0) {
			UICtrl.displayPrevBtn();
		} 
		// 6. Display submit button if on the last question
		if (currentQ === 3)
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

		// 3. If user already selected a question for an answer display it
		UICtrl.displayUserAns(currentQ);

		//4. When going back to previous questions display the next button again and hide the submit button
		if (!(currentQ === 3)) {
			UICtrl.hideSubBtn();
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









