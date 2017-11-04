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
			question: "Every year, over 8,800 people injure themselves with what tiny object?",
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
			answers: ["A: 26,877,000,000,000,000,000,000,000 tons", "B: 6,588,000,000,000,000,000,000,000,000 tons", "C: 10,000,000,000,000,000,000,000,000 tons", "D: 5 pounds"],
			correctAnswer: 1
		},
		question11= {
			question: "When glass breaks, the cracks move up to how many mph?",
			answers: ["A: 5,000", "B: 1,000", "C: 3,000", "D: 10,000"],
			correctAnswer: 2
		},
		question12= {
			question: "The NY phone book had 22 Hitlers before WWII. How many did it have in 2000?",
			answers: ["A: 4", "B: 13", "C: 11", "D: 0"],
			correctAnswer: 3
		},
		question13= {
			question: "What percentage of Japanese citizens are cremated?",
			answers: ["A: 98", "B: 75", "C: 26", "D: 11"],
			correctAnswer: 0
		},
		question14= {
			question: "In what key do most American car-horns honk?",
			answers: ["A: C", "B: F", "C: E", "D: G"],
			correctAnswer: 1
		},
		question15= {
			question: "What is the fear of houses?",
			answers: ["A: Rhabdophobia", "B: Neophobia", "C: Oikophobia", "D: Jedeophobia"],
			correctAnswer: 2
		}];

	var phoneAnswers = ['Sup dude. Uh, the answer is A. I mean B.', "Hello Dear, I don't understand the question. Sorry.", "How long do I have to tell you an answer? I know this one. It's...", 'I know this one. It is D.',  "I'm just guessing, but I think it's C"]
	var questionValue = [100, 1000, 5000, 10000, 32000, 64000, 125000, 250000, 500000, 1000000]
	var timer = 20;
	var gameStart = false;
	var difficulty = 1;
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
	var phoneRing = new Audio ("assets/audio/phone_ring.mp3");
	var letsPlay = new Audio ("assets/audio/lets_play.mp3");
	var fiftyFiftyOn = false;
	var phoneFriend = false;
	var audienceHelp = false;
	

	mainTheme.play();


	function startTrivia(){
		if  (gameStart === false){
			mainTheme.pause();
			musicOne.currentTime = 0;
			musicTwo.currentTime = 0;
			musicThree.currentTime = 0;
			buttonIsOn();
			fiftyFiftyOn = true;
			phoneFriend = true;
			audienceHelp = true;
			gameStart = true;
			questionNumber = 0;
			shuffle(trivia);
			$('.money-bar').removeClass('current-money');
			$('#money01').addClass('current-money');
			reset();
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
		if (timer > 9){
			$('#game-timer').html(":" + timer);
		}
			else {
				$('#game-timer').html(":0" + timer);
			}
		// console.log(timer);
		clockIsRunning = true;
		if (timer===0){	
			stop();
			gameLose();

		}
	}


	function stop(){
		clearInterval(intervalId);
		clockIsRunning = false;
	}

	 function reset() {
	    timer = 31;
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
		if (questionNumber === 1){
			$('#money01').removeClass('current-money');
			$('#money02').addClass('current-money');
		}
		else if (questionNumber === 2){
			$('#money02').removeClass('current-money');
			$('#money03').addClass('current-money');
		}
		else if (questionNumber === 3){
			$('#money03').removeClass('current-money');
			$('#money04').addClass('current-money');
		}
		else if (questionNumber === 4){
			$('#money04').removeClass('current-money');
			$('#money05').addClass('current-money');
		}
		else if (questionNumber === 5){
			$('#money05').removeClass('current-money');
			$('#money06').addClass('current-money');
		}
		else if (questionNumber === 6){
			$('#money06').removeClass('current-money');
			$('#money07').addClass('current-money');
		}
		else if (questionNumber === 7){
			$('#money07').removeClass('current-money');
			$('#money08').addClass('current-money');
		}
		else if (questionNumber === 8){
			$('#money08').removeClass('current-money');
			$('#money09').addClass('current-money');
		}
		else if (questionNumber === 9){
			$('#money09').removeClass('current-money');
			$('#money10').addClass('current-money');
			gameWin();
		}
		else {
		}
	}

	function gameLose(){
		//display you lose
		stop();
		musicOne.pause();		
		musicTwo.pause();
		musicThree.pause();
		letsPlay.play();
		fiftyFiftyOn = false;
		phoneFriend = false;
		audienceHelp = false;
		gameStart = false;
		$('.message').text("Game Over");
		console.log("you lose");
	}

	function gameWin(){
		musicOne.pause();		
		musicTwo.pause();
		musicThree.pause();
		wonMillion.play();
		fiftyFiftyOn = false;
		phoneFriend = false;
		audienceHelp = false;
		stop();
		gameStart = false;
		$('.message').text("You're a Millionaire!");
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

	function shuffle(array) {
		var currentIndex = trivia.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
		}

		return array;
		}
	// generateQuestion();
	function generateQuestion () {	
		if (gameStart === true){
			$('.message').empty();
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
			generateQuestion();
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
			generateQuestion();
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
			generateQuestion();
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
			generateQuestion();
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

	function randomPhoneAnswerGenerator(){
		var randomphoneAnswer = phoneAnswers[Math.floor(Math.random() * phoneAnswers.length)];
		$('.message').text(randomphoneAnswer);
		}
	
	function phoneAFriend(){
		phoneRing.play();
		setTimeout(randomPhoneAnswerGenerator, 2000);
	}

	function audienceHelp(){

	}

	$("#friend").on("click", function() {
		if (phoneFriend === true){
			console.log('button friend was pressed');
			reset();
			phoneFriend = false;
			lifelineSwitch();
			selectButton.play();
			phoneAFriend();
		}else{
			console.log("friend button doesn't work");
		}	
	});


	$("#audience").on("click", function() {
		if (audienceHelp === true){
			console.log('button audience was pressed');
			selectButton.play();
			audienceHelp = false;
			lifelineSwitch();
			audienceHelp();
		}else{
			console.log("audience button doesn't work");
		}	

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