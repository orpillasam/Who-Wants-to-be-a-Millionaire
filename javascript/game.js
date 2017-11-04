$(document).ready(function() {

	var trivia = [
		question01=	{
			question: "In what place was Christmas once illegal?",
			answers: ["A: England", "B: France", "C: Brazil", "D: Russia"],
			correctAnswer: 0,
		},
		question02= {
			question: "In California, it is illegal to eat oranges while doing what?",
			answers: ["A: Gardening", "B: Bathing", "C: Working on a computer", "D: Driving"],
			correctAnswer: 1
		},
		question03= {
			question: "Coulrophobia means fear of what?",
			answers: ["A: Monsters", "B: Sacred things", "C: Clowns", "D: Old People"],
			correctAnswer: 2
		},
		question04= {
			question: "How many dimples are there on a regular golf ball?",
			answers: ["A: 377", "B: 418", "C: 294", "D: 336"],
			correctAnswer: 3,
		},
		question05= {
			question: "Which of the following is the longest running American animated TV show?",
			answers: ["A: Simpsons", "B: Rugrats", "C: Bonanza", "D: Pokemon"],
			correctAnswer: 0,
		},
		question06= {
			question: "Every year, over 8,800 people injure themselves with what apparently harmless, tiny object?",
			answers: ["A; Spoon", "B: Toothpick", "c: Baseball bat", "D: Pencil"],
			correctAnswer: 1,
		},
		question07=	{
			question: "How many pounds of pressure do you need to rip off your ear?",
			answers: ["A: 17", "B: 2", "C: 7", "D: 12"],
			correctAnswer: 2,
		},
		question08= {
			question: "At what temperature are Fahrenheit and Celsius the same?",
			answers: ["A: 0", "B: 50", "C: 92", "D: -40"],
			correctAnswer: 3
		},
		question09= {
			question: "What are the odds of being killed by space debris?",
			answers: ["A: 1 in 5 billion", "B: 1 in 10 billion", "C: 1 in a trillion", "D: 1 in 5 million"],
			correctAnswer: 0
		},
		question10= {
			question: "How much does Earth weigh?",
			answers: ["A: 26,877,000,000,000,000,000,000,000,000,000,000,000,000 tons", "B: 6,588,000,000,000,000,000,000,000,000 tons", "C: 10,000,000,000,000,000,000,000,000 tons", "D: 5 pounds"],
			correctAnswer: 1
		},
		question11= {
			question: "When glass breaks, the cracks move up to how many mph?",
			answers: ["A: 5,000", "B: 1,000", "C: 3,000", "D: 10,000"],
			correctAnswer: 2
		},
		question12= {
			question: "The NY phone book had 22 Hitlers before WWII. How many did it have at the end of the twentieth century?",
			answers: ["A: 4", "B: 13", "C: 11", "D: 0"],
			correctAnswer: 3
		}];

	var questionValue = [100, 1000, 5000, 10000, 32000, 64000, 125000, 250000, 500000, 1000000]
	var timer = 30;
	var gameStart = false;
	var difficulty = 1;
	var totalQuestions = 10;
	var nextQuestion = true;
	var questionNumber = 0;
	var currentAnswer;
	var money = 0;
	var clockIsRunning = false;
	var buttonAIsOn = false;
	var buttonBIsOn = false;
	var buttonCIsOn = false;
	var buttonDIsOn = false;
	var mainTheme = new Audio ("assets/audio/main_theme.mp3");
	var selectButton = new Audio ("assets/audio/select_button.mp3");
	var wrongButton = new Audio ("assets/audio/wrong_button.mp3");
	var wonMillion = new Audio ("assets/audio/won_million.mp3");
	var musicOne = new Audio ("assets/audio/music_01.mp3");
	var musicTwo= new Audio ("assets/audio/music_02.mp3");
	var musicThree = new Audio ("assets/audio/music_03.mp3");
	var fiftyFiftyOn = false;
	var phoneFriend = false;
	var audienceHelp = false;
	

	// mainTheme.play();


	function startTrivia(){
		if  (gameStart === false){
			mainTheme.pause();
			buttonIsOn();
			fiftyFiftyOn = true;
			phoneFriend = true;
			audienceHelp = true;
			gameStart = true;
			lifelineSwitch();
			run();
			startClock();
		generateQuestion();
			console.log("game start is " + gameStart);
			console.log("question number is " + questionNumber);
		}else{
			console.log('start button didnt work')
		}
	}

	$('#start-button').on("click", function(){
		startTrivia();
	});
	
	function run() {
	      intervalId = setInterval(startClock, 1000);
 	}

 	//starts the timer
	function startClock(){
		timer--;
		// console.log(timer);
		clockIsRunning = true;
		if (timer===0){	
			stop();
			endGame();

		}
		$('#game-timer').html(":" + timer);
	}

	function stop(){
		clearInterval(intervalId);
		clockIsRunning = false;
	}

	 function reset() {
	    timer = 31;

	    // DONE: Change the "display" div to "00:00."
	    $("#display").text(":00");

	  }


	function changeMusic() {
		if (gameStart === true){
			if(questionNumber <5){
				musicOne.play();
			}else if (questionNumber >=5 && questionNumber <8){
				musicTwo.play();
				musicOne.pause();
			}else if (questionNumber > 7){
				musicThree.play();
				musicTwo.pause();
			}
		}else {
			musicOne.pause();		
			musicTwo.pause();
			musicThree.pause();
		}
	};

	function calculateMoney(){
		money = questionValue[questionNumber] ;
		console.log("total money is " + money);
		$('#money').text('$' + money);
		if (money >=999999){
			gameWin();
		}
		else {
			generateQuestion();
		}
	}

	function gameLose(){
		//display you lose
		stop();
		musicOne.pause();		
		musicTwo.pause();
		musicThree.pause();
		gameStart = false;
		console.log("you lose");
	}

	function gameWin(){
		musicOne.pause();		
		musicTwo.pause();
		musicThree.pause();
		wonMillion.play();
		stop();
		gameStart = false;
		//diplay you win
		console.log("you win");

	}
	
	function buttonIsOn(){
		buttonAIsOn = true;
		buttonBIsOn = true;
		buttonCIsOn = true;
		buttonDIsOn = true;
		console.log('button a is ' + buttonAIsOn);
		console.log('button b is ' + buttonBIsOn);
		console.log('button c is ' + buttonCIsOn);
		console.log('button d is ' + buttonDIsOn);
		$('#answerA').removeClass('disabled');
		$('#answerB').removeClass('disabled');
		$('#answerC').removeClass('disabled');
		$('#answerD').removeClass('disabled');
	}

	// generateQuestion();
	function generateQuestion () {	
		if (gameStart === true){
			changeMusic();		
			$('#question').text(trivia[questionNumber].question);
			$('#answerA').text(trivia[questionNumber].answers[0]);
			$('#answerB').text(trivia[questionNumber].answers[1]);
			$('#answerC').text(trivia[questionNumber].answers[2]);
			$('#answerD').text(trivia[questionNumber].answers[3]);
			currentAnswer = trivia[questionNumber].correctAnswer;
			console.log("current answer is " + currentAnswer);
		}else {
			console.log("game is over");
		}
	}


	$("#answerA").on("click", function() {
		if (gameStart === false){
		console.log("nothing")
		}
		else if (gameStart === true && currentAnswer === 0 && buttonAIsOn === true){
			selectButton.play();
			buttonIsOn();
			questionNumber++;
			console.log('q # is ' + questionNumber);
			reset();
			calculateMoney();
		} 	else {
				wrongButton.play();
				gameLose();
				console.log("game loss from answerA");
				console.log("gameStart is " + gameStart);
				console.log("current answer is " + currentAnswer);
				console.log("button a is on is " + buttonAIsOn);
			}
	});

	$("#answerB").on("click", function() {
		if (gameStart === false){
		console.log("nothing")
		}
		else if (gameStart === true && currentAnswer === 1 && buttonBIsOn === true){
			questionNumber++;
			console.log('q # is ' + questionNumber);
			buttonIsOn();
			selectButton.play();
			reset();
			calculateMoney();
		}else {
				wrongButton.play();
				gameLose();
				console.log("game loss from answerB");

		}
		
			
	});

	$("#answerC").on("click", function() {
		if (gameStart === false){
		console.log("nothing")
		}
		else if (gameStart === true && currentAnswer === 2 && buttonCIsOn === true){
			questionNumber++;
			console.log('q # is ' + questionNumber);
			buttonIsOn();
			selectButton.play();
			calculateMoney();
			reset();
		} 	else {
				wrongButton.play();
				gameLose();
				console.log("game loss from answerC");
			}
	});

	$("#answerD").on("click", function() {
		if (gameStart === false){
			console.log("nothing")
		}
		else if (gameStart === true && currentAnswer === 3 && buttonDIsOn === true){
			questionNumber++;
			console.log('q # is ' + questionNumber);
			buttonIsOn();
			selectButton.play();
			calculateMoney();
			reset();
		} 	else {
				wrongButton.play();
				gameLose();
				console.log("game loss from answerD");
			}
	});

	//These are the three lifeline buttons
	//5050, call a friend, and audience

	$("#5050").on("click", function() {
		if (fiftyFiftyOn === true){
			console.log('button 5050 was pressed');
			selectButton.play();
			fiftyFiftyOn = false;
			lifelineSwitch();
			//play sound
			//display 5050 screen
			if (currentAnswer === 0) {
				buttonDIsOn = false;
				$('#answerD').addClass('disabled');
				$('#answerB').addClass('disabled');
				buttonBIsOn = false;
				// disable button b and d
			}else if (currentAnswer === 1){
				buttonAIsOn = false;
				$('#answerA').addClass('disabled');
				$('#answerC').addClass('disabled');
				buttonCIsOn = false;
				//disable button a and c
			}else if (currentAnswer === 2){
				//disable a and b
				buttonAIsOn = false;
				$('#answerA').addClass('disabled');
				buttonBIsOn = false;
				$('#answerB').addClass('disabled');
			}else{
				//disable b & c
				buttonBIsOn = false;
				$('#answerB').addClass('disabled');
				buttonCIsOn = false;
				$('#answerC').addClass('disabled');
			}
		}else{
			console.log("5050 button doesn't work");
		}	
	});


	$("#friend").on("click", function() {
		console.log('button friend was pressed');
		stop();
		phoneFriend = false;
		lifelineSwitch();
		selectButton.play();
		//play sound
		//display friend screen
	});


	$("#audience").on("click", function() {
		console.log('button audience was pressed');
		selectButton.play();
		audienceHelp = false;
		lifelineSwitch();
		//display audience 

	});

	function lifelineSwitch(){
		if (fiftyFiftyOn === false){
			$('#5050').addClass('disabled');
		}else{
			$('#5050').removeClass('disabled');
		}
			if (phoneFriend === false){
			$('#friend').addClass('disabled');
		}else{
			$('#friend').removeClass('disabled');
		}
			if (audienceHelp === false){
			$('#audience').addClass('disabled');
		}else{
			$('#audience').removeClass('disabled');
		}
	}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




});