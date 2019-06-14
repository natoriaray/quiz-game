// DATA CONTROLLER
var dataController = (function() {
	var questions, correctAns, userAns, arrays, correct;

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

	correct = 0

	return {
		getQuestions: function() {
			return questions;
		},

		getArrays: function() {
			return arrays;
		},

		storeAns: function(num) {
				for (var i = 0; i < 4; i++) {
					if (document.getElementById('input-' + i).checked) {
						arrays.userAnsArr[num] = i;
						console.log(arrays.userAnsArr);
					}
				}
		},

		getCorrect: function() {
			for (var i = 0; i < 4; i++) {
				if (arrays.userAnsArr[i] === arrays.correctAnsArr[i]) {
					correct += 1;
				} 
			}
			return correct;
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
		subBtn: document.querySelector('.subBtn'),
		resultBox: document.querySelector('.result-box'),
		quizBox: document.querySelector('.quiz-box')
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
				if (arr.userAnsArr[num] >= 0) {
					document.getElementById('input-' + arr.userAnsArr[num]).checked = true;
					//break;
				}
			}
		},

		clearUserAns: function(num) {
			var inp = document.querySelectorAll('input');

			if (arr.userAnsArr[num + 1] >= 0) {
				document.getElementById('input-' + arr.userAnsArr[num + 1]).checked = true;
			} else {
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

		displayResults: function(correctNum) {
			var html, newHTML;

			//1. Create HTML string with placeholder text
			if (correctNum > 1) {
				html = '<p>You got %num% questions right! Way to go!</p>';
			} else if (correctNum === 0) {
				html = '<p>You didn\'t get any questions right.</p>'
			} else {
				html = '<p>You got %num% question right! Way to go!</p>';
			}
			
			//2. Replace placeholder text with the correct number
			newHTML = html.replace('%num%', correctNum);

			//3. Insert new HTML into the DOM
			DOMStrings.resultBox.insertAdjacentHTML('beforeend', newHTML);

			//4. Make result box visible
			DOMStrings.resultBox.style.display = 'flex';
		},

		changeQuesNum: function(num) {
			DOMStrings.curQuestion.textContent = 'Question ' + (num + 1) + ' of 4';

		},

		playAgain: function() {
			// Insert new HTML into the DOM
			DOMStrings.quizBox.innerHTML = '<button class="playAgain" type="button" name="again">Play Again</button>';

			//Change formmating of button
			DOMStrings.quizBox.style.justifyContent = 'center';
			DOMStrings.quizBox.style.alignItems = 'center';
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
			UICtrl.changeQuesNum(currentQ);
			UICtrl.hidePrevBtn();
		}
	}

	var eventListeners = function() {
		DOM.nextBtn.addEventListener('click', nextQuestion);
		DOM.prevBtn.addEventListener('click', prevQuestion);
		DOM.subBtn.addEventListener('click', submitAns)
	};

	var questions = dataCtrl.getQuestions();
	var arrays = dataCtrl.getArrays();

	var nextQuestion = function() {

		// 1. Store answer in data structure
		dataCtrl.storeAns(currentQ);

		// 2. If user already selected an answer for a question display it
		UICtrl.displayUserAns(currentQ);

		// 3. Uncheck radios
		UICtrl.clearUserAns(currentQ);

		// 4. Change to the next question
		currentQ += 1
		if (currentQ < 4) {
			UICtrl.displayQuestion(currentQ);
		}

		//5. Change the number of the question on UI
		UICtrl.changeQuesNum(currentQ);

		// 6. Display previous button
		if (currentQ > 0) {
			UICtrl.displayPrevBtn();
		}
		// 7. Display submit button if on the last question
		if (currentQ === 3)
		UICtrl.displaySubBtn();
	}

	var prevQuestion = function() {
		// 1. Store ans in data structure if they click an answer and then click the previous button
		dataCtrl.storeAns(currentQ);
		currentQ -= 1;

		//2. Display question
		if (currentQ > -1) {
			UICtrl.displayQuestion(currentQ);
		}

		//3. Change the number of the question on UI
		UICtrl.changeQuesNum(currentQ);

		//4. If using this previous button, hide previous button when going back to first question
		if (currentQ === 0) {
			UICtrl.hidePrevBtn();
		}

		//5. If user already selected a question for an answer display it
		UICtrl.displayUserAns(currentQ);

		//6. When going back to previous questions display the next button again and hide the submit button if on last question
		if (!(currentQ === 3)) {
			UICtrl.hideSubBtn();
		}
	};

	var submitAns = function() {
		//1. Store last answer in data structure array
		currentQ = 3
		dataCtrl.storeAns(3);

		//2. Compare user answer array with the correct answer arr
		var correct = dataCtrl.getCorrect();

		//3. Display results
		UICtrl.displayResults(correct);

		//4. Display play again button and remove all other children from the quiz-box
		UICtrl.playAgain();
	};

	return{
		init: function() {
			start();
			eventListeners();
		}
	}

})(dataController, UIController);

controller.init();
