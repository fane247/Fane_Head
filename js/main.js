$(function () {

	var hearts = 'images/hearts.png'
	var clubs = 'images/clubs.png'
	var diamonds = 'images/diamonds.png'
	var spades = 'images/spades.png'

	var $errorBox = $('#error-box');

	var roundCounter = 0; //set this to 0 when playing from the begining 

	var $cardsInPlayElement = $('#cards-in-play');
	var cardsInPlay = [];

	var $gameBoardRow = $('#game-board-row');

	//attempt to refactor functions to make them more dry

	var p1CardSlot1 = $('p1card-slot-1');
	var p1CardSlot2 = $('p1card-slot-1');
	var p1CardSlot3 = $('p1card-slot-1');

	var p1CardSlots = [p1CardSlot1, p1CardSlot2, p1CardSlot3];

	var player1 = {

		faceDown: [],
		faceUp: [],
		hand: [],
		cardSlots: [$('#p1card-slot-1'),$('#p1card-slot-2'),$('#p1card-slot-3')],
		handElement: $('#p1-hand'),
		showCards: $('#p1ShowCards'),
		ready: $('#p1-ready'),
		cardSlotsElement: $('#p1-card-slots'),
		swapCards: $('#p1-swap-cards'),
		playerName: 'p1',
		playerRow: $('#p1-row')

	};

	var player2 = {

		faceDown: [],
		faceUp: [],
		hand: [],
		cardSlots: [$('#p2card-slot-1'),$('#p2card-slot-2'),$('#p2card-slot-3')],
		handElement: $('#p2-hand'),
		showCards: $('#p2ShowCards'),
		ready: $('#p2-ready'),
		cardSlotsElement: $('#p2-card-slots'),
		swapCards: $('#p2-swap-cards'),
		playerName: 'p2',
		playerRow: $('#p2-row')
	
	};

	var currentPlayer = player2;

	var chosenDeckIndexs = [];

	

	function chooseRandomCard(){

		// 	var initalRandomNumber = Math.floor(Math.random() * (deck.length -1)) + 0

		// var randomNumber = initalRandomNumber === deck.length ? deck.length -1 : initalRandomNumber;

		// chosenDeckIndexs.push(randomNumber);

		// deck.splice(deck.indexOf(deck[randomNumber]), 1);

		var cardIsTaken = true;
		var randomNumber = 0;


		while(cardIsTaken){

			var randomNumber = Math.floor(Math.random() * (52 - 0)) + 0;

			if (!chosenDeckIndexs.includes(randomNumber)) {

				chosenDeckIndexs.push(randomNumber);
				cardIsTaken=false;
			}

		}

		return randomNumber;

	}




	function chooseFaceDownCards(){

		player1.faceDown.push(deck[chooseRandomCard()]);

		player1.faceDown.push(deck[chooseRandomCard()]);
		player1.faceDown.push(deck[chooseRandomCard()]);

		player2.faceDown.push(deck[chooseRandomCard()]);
		player2.faceDown.push(deck[chooseRandomCard()]);
		player2.faceDown.push(deck[chooseRandomCard()]);

	}


	function chooseFaceUpCards(){

		player1.faceUp.push(deck[chooseRandomCard()]);
		player1.faceUp.push(deck[chooseRandomCard()]);
		player1.faceUp.push(deck[chooseRandomCard()]);

		player2.faceUp.push(deck[chooseRandomCard()]);
		player2.faceUp.push(deck[chooseRandomCard()]);
		player2.faceUp.push(deck[chooseRandomCard()]);

	}

	function chooseHands(){

		player1.hand.push(deck[chooseRandomCard()]);
		player1.hand.push(deck[chooseRandomCard()]);
		player1.hand.push(deck[chooseRandomCard()]);

		player2.hand.push(deck[chooseRandomCard()]);
		player2.hand.push(deck[chooseRandomCard()]);
		player2.hand.push(deck[chooseRandomCard()]);

	}

	function getCardByName(cardNameString) {

		for (var i = 0; i <deck.length; i++) {

			if(deck[i].name === cardNameString){

				return	deck[i];
			}
		}
	}


	function swapCardHandToFaceUp(cardFromHand, cardFromFaceUp, playerObject){

		debugger;

		var HandCard = getCardByName(cardFromHand);
		var FaceUpCard = getCardByName(cardFromFaceUp);

		cardFromHandIndex = playerObject.hand.indexOf(HandCard);
		cardFromFaceUpIndex = playerObject.faceUp.indexOf(FaceUpCard);

		playerObject.hand.splice(cardFromHandIndex,1);
		playerObject.faceUp.splice(cardFromFaceUpIndex,1);

		playerObject.hand.push(FaceUpCard);
		playerObject.faceUp.push(HandCard);

	}

	// function swapCardHandToFaceUpP2(cardFromHand, cardFromFaceUp){

	// 	var p2HandCard = getCardByName(cardFromHand);
	// 	var p2FaceUpCard = getCardByName(cardFromFaceUp);

	// 	cardFromHandIndex = p2Hand.indexOf(p2HandCard);
	// 	cardFromFaceUpIndex = p2FaceUp.indexOf(p2FaceUpCard);

	// 	p2Hand.splice(cardFromHandIndex,1);
	// 	p2FaceUp.splice(cardFromFaceUpIndex,1);

	// 	p2Hand.push(p2FaceUpCard);
	// 	p2FaceUp.push(p2HandCard);

	// }


	function generateFaceUpCardImage(cardObject){

		var cardName = cardObject.name;
		var cardSuit = cardObject.suit;
		var cardRank = cardObject.rank;
		var cardValue = cardObject.value.toString();
		var cardSuitImage = getSuitImage(cardSuit);

		var $faceUpCard = $('<div class="" data-name='+ cardName+' data-suit='+cardSuit+' data-value='+cardValue+'>'
								+'<div class="card-value">'
									+cardRank
								+'</div>'
								+'<div class="card-suit-container-small-top">'
									+'<img src='+ cardSuitImage+'>'
								+'</div>'
								+'<div class="card-suit-container-large">'
									+'<img src='+ cardSuitImage+'>'
								+'</div>'
								+'<div class="card-suit-container-small-bottom">'
									+'<img src='+ cardSuitImage+'>'
								+'</div>'
							+'</div>');

		return $faceUpCard;
	}

	function generateFaceDownCardImage(cardObject){

		//possibly not needed and can be replaces with a function that creates a faceup card when the 

		var cardName = cardObject.name;
		var cardSuit = cardObject.suit;
		var cardRank = cardObject.rank;
		var cardValue = cardObject.value.toString();
		var cardSuitImage = getSuitImage(cardSuit);

		var $faceDown = $('<div class="face-down-card" data-name="' + cardName + ' " data-suit="' + cardSuit + '" data-value="' + cardValue + '">'
							+'<img src="images/back.jpg">'
						+'</div>');

		return $faceDown;

	}

	function generateHandCardContainer(){

		return $('<div class="card-hand-container"></div>');

	}



	function updateView() {
		
		updateGameBoardRow();
		updateHandView();
		updateFaceUpView();
		hideHands();
		
	}

	function updateViewAll() {

		updateGameBoardRow();
		updateHandViewAll();
		updateFaceUpViewAll();
		hideHands();

	}

	function updateGameBoardRow(){

		$gameBoardRow.find('.card-in-play').remove();

		if (chosenDeckIndexs.length === 52) {

			$('#deck').remove();

		}

		if (cardsInPlay.length!==0) {

			for (var i = 0; i < cardsInPlay.length; i++) {

				var $cardInPlay = generateFaceUpCardImage(cardsInPlay[i]);
				$cardInPlay.addClass('card-in-play');
				$cardsInPlayElement.append($cardInPlay);
			}
		}

	}

	// function updateP2View(){

	// 	updateP2FaceUpView();
	// 	updateP2HandView();

	// }

	function updateFaceUpViewAll() {

		player1.cardSlotsElement.find('.face-up-card').remove();

		// if (player1.faceUp.length > 0) {
		// 	console.log(player1.faceUp);
		// } else {
		// 	console.log("undefined");
		// }

		for (var i = 0; i < player1.faceUp.length; i++) {

			var $faceUpCard = generateFaceUpCardImage(player1.faceUp[i]);
			$faceUpCard.addClass('face-up-card');
			player1.cardSlots[i].append($faceUpCard);

		}


		player2.cardSlotsElement.find('.face-up-card').remove();

		// if (player1.faceUp.length > 0) {
		// 	console.log(player1.faceUp);
		// } else {
		// 	console.log("undefined");
		// }

		for (var i = 0; i < player2.faceUp.length; i++) {

			var $faceUpCard = generateFaceUpCardImage(player2.faceUp[i]);
			$faceUpCard.addClass('face-up-card');
			player2.cardSlots[i].append($faceUpCard);

		}


	}

	function updateFaceUpView() {

		currentPlayer.cardSlotsElement.find('.face-up-card').remove();

		// if (currentPlayer.faceUp.length > 0) {
		// 	console.log(currentPlayer.faceUp);
		// } else {
		// 	console.log("undefined");
		// }

		for (var i = 0; i < currentPlayer.faceUp.length; i++) {

			var $faceUpCard = generateFaceUpCardImage(currentPlayer.faceUp[i]);
			$faceUpCard.addClass('face-up-card');
			currentPlayer.cardSlots[i].append($faceUpCard);

		}

	}

	function updateHandViewAll(){

		player1.handElement.find('.card-hand-container').remove();

		var handLeftOffset = 0;
		var handTopOffset = 17;
		var cardCount = 0; 



		for (var i = 0; i < player1.hand.length; i++) {

			if(cardCount > 20) {

				//move next cards to the next row
				handLeftOffset = 0;
				handTopOffset += 36;
				cardCount = 0;
			}

			var $handCardContainer = generateHandCardContainer();

			var $faceDown = $('<div class="hand-face-down-card">'
								+'<img src="images/back.jpg">'
							+'</div>');

			var $faceUpCard  = generateFaceUpCardImage(player1.hand[i]);

			$faceUpCard.addClass(player1.playerName + 'hand-face-up-card');

			$handCardContainer.append($faceDown).append($faceUpCard);

			$handCardContainer.css('top', handTopOffset + 'px');

			if (cardCount !==0) {

				handLeftOffset += 21;
				
			}

			$handCardContainer.css('left',handLeftOffset + 'px');

			player1.handElement.append($handCardContainer);

			cardCount++;
		}

		player2.handElement.find('.card-hand-container').remove();

		var handLeftOffset = 0;
		var handTopOffset = 17;
		var cardCount = 0; 



		for (var i = 0; i < player2.hand.length; i++) {

			if(cardCount > 20) {

				//move next cards to the next row
				handLeftOffset = 0;
				handTopOffset += 36;
				cardCount = 0;
			}

			var $handCardContainer = generateHandCardContainer();

			var $faceDown = $('<div class="hand-face-down-card">'
								+'<img src="images/back.jpg">'
							+'</div>');

			var $faceUpCard  = generateFaceUpCardImage(player2.hand[i]);

			$faceUpCard.addClass(player2.playerName + 'hand-face-up-card');

			$handCardContainer.append($faceDown).append($faceUpCard);

			$handCardContainer.css('top', handTopOffset + 'px');

			if (cardCount !==0) {

				handLeftOffset += 21;
				
			}

			$handCardContainer.css('left',handLeftOffset + 'px');

			player2.handElement.append($handCardContainer);

			cardCount++;
		}

	}


	function updateHandView(){

		currentPlayer.handElement.find('.card-hand-container').remove();

		var handLeftOffset = 0;
		var handTopOffset = 17;
		var cardCount = 0; 



		for (var i = 0; i < currentPlayer.hand.length; i++) {

			if(cardCount > 20) {

				//move next cards to the next row
				handLeftOffset = 0;
				handTopOffset += 36;
				cardCount = 0;
			}

			var $handCardContainer = generateHandCardContainer();

			var $faceDown = $('<div class="hand-face-down-card">'
								+'<img src="images/back.jpg">'
							+'</div>');

			var $faceUpCard  = generateFaceUpCardImage(currentPlayer.hand[i]);

			$faceUpCard.addClass(currentPlayer.playerName + 'hand-face-up-card');

			$handCardContainer.append($faceDown).append($faceUpCard);

			$handCardContainer.css('top', handTopOffset + 'px');

			if (cardCount !==0) {

				handLeftOffset += 21;
				
			}

			$handCardContainer.css('left',handLeftOffset + 'px');

			currentPlayer.handElement.append($handCardContainer);

			cardCount++;
		}

	}

	// function updateP2HandView(){

	// 	$p2HandElement.find('.card-hand-container').remove();

	// 	var handLeftOffset = 0;
	// 	var handTopOffset = 17;
	// 	var cardCount = 0; 



	// 	for (var i = 0; i < p2Hand.length; i++) {

	// 		if(cardCount > 20) {

	// 			//move next cards to the next row
	// 			handLeftOffset = 0;
	// 			handTopOffset += 36;
	// 			cardCount = 0;
	// 		}

	// 		var $handCardContainer = generateHandCardContainer();

	// 		var $faceDown = $('<div class="hand-face-down-card">'
	// 							+'<img src="images/back.jpg">'
	// 						+'</div>');

	// 		var $faceUpCard  = generateFaceUpCardImage(p2Hand[i]);

	// 		$faceUpCard.addClass('p2hand-face-up-card');

	// 		$handCardContainer.append($faceDown).append($faceUpCard);

	// 		$handCardContainer.css('top', handTopOffset + 'px');

	// 		if (cardCount !==0) {

	// 			handLeftOffset += 21;
				
	// 		}

	// 		$handCardContainer.css('left',handLeftOffset + 'px');

	// 		$p2HandElement.append($handCardContainer);

	// 		cardCount++;
	// 	}

	// }

	// function updateP1View() {

	// 	updateP1FaceUpView();
	// 	updateP1HandView();
		
	// }



	// function updateP1FaceUpView(){

	// 	$p1CardSlots.find('.face-up-card').remove();

	// 	for (var i = 0; i < p1FaceUp.length; i++) {


	// 		if(typeof p1FaceUp[i] === 'undefined'){

	// 			debugger;

	// 		}

	// 		var $faceUpCard = generateFaceUpCardImage(p1FaceUp[i]);
	// 		$faceUpCard.addClass('face-up-card');
	// 		p1cardSlots[i].append($faceUpCard);
	// 	}

	// }

	// function updateP1HandView(){

	// 	$p1HandElement.find('.card-hand-container').remove();

	// 	var handLeftOffset = 0;
	// 	var handTopOffset = 17;
	// 	var cardCount = 0; 

	// 	for (var i = 0; i < p1Hand.length; i++) {

	// 		if(cardCount > 20) {

	// 			//move next cards to the next row
	// 			handLeftOffset = 0;
	// 			handTopOffset += 36;
	// 			cardCount = 0;
	// 		}

	// 		var $handCardContainer = generateHandCardContainer();

	// 		var $faceDown = $('<div class="hand-face-down-card">'
	// 							+'<img src="images/back.jpg">'
	// 						+'</div>');

	// 		var $faceUpCard  = generateFaceUpCardImage(p1Hand[i]);

	// 		$faceUpCard.addClass('p1hand-face-up-card');

	// 		$handCardContainer.append($faceDown).append($faceUpCard);

	// 		$handCardContainer.css('top', handTopOffset + 'px');

	// 		if (cardCount !==0) {

	// 			handLeftOffset += 21;
				
	// 		}

	// 		$handCardContainer.css('left',handLeftOffset + 'px');

	// 		$p1HandElement.append($handCardContainer);

	// 		cardCount++;
	// 	}

	// }

	function toggleShowHand(){

		var zIndex = $('.' + currentPlayer.playerName + 'hand-face-up-card').css('z-index')

		if (zIndex === '0') {

			hideHand();

		} else {

			showHand();
		}


	}

	function hideHand() {

		$('.' + currentPlayer.playerName + 'hand-face-up-card').css('z-index', '-1');

	}


	function showHand() {

		$('.' + currentPlayer.playerName + 'hand-face-up-card').css('z-index', '0');

	}

	function hideHands() {

		$('.' + player1.playerName + 'hand-face-up-card').css('z-index', '-1');
		$('.' + player2.playerName + 'hand-face-up-card').css('z-index', '-1');

	}

	function getSuitImage(suitString){

		var suitImage = '';

		switch(suitString){

			case 'h':
				suitImage = hearts;
				break;

			case 's':
				suitImage = spades;
				break;

			case 'd':
				suitImage = diamonds;
				break;

			case 'c':
				suitImage = clubs;
				break;
		}

		return suitImage;

	}

	function highlightCard() {

		$(this).toggleClass('highlighted');
		// body...
	}

	function initalSetup() {

		chooseFaceDownCards();
		chooseFaceUpCards();
		chooseHands();
		updateViewAll();

	}

	function setupRound() {

		swapPlayer();
		getCurrentPlayer();
		console.log('round : ' + roundCounter);
		currentPlayer.handElement.on('click', '#' + currentPlayer.playerName + '-show-cards', toggleShowHand);
		currentPlayer.handElement.on('click', '.' + currentPlayer.playerName + 'hand-face-up-card', highlightCard);
		currentPlayer.cardSlotsElement.on('click', '.face-up-card', highlightCard);
		currentPlayer.swapCards.click({handElement: currentPlayer.handElement, cardsSlots: currentPlayer.cardSlotsElement}, verifyCardSwap)
		currentPlayer.ready.click(currentPlayerRemoveListeners);
	}

	function currentPlayerRemoveListeners(){

		updateView();
		currentPlayer.handElement.off();
		currentPlayer.cardSlotsElement.off();
		currentPlayer.swapCards.off();
		currentPlayer.ready.off();
		// $gameBoardRow.off();
		if (roundCounter <= 1) {

			setupRound();

		}else{

			playOneRound();
		}	

	}


	function verifyCardSwap(event) {


		var validSwap = event.data.handElement.find('.highlighted').length === event.data.cardsSlots.find('.highlighted').length;

		if (validSwap) {

			var $selectedHand = event.data.handElement.find('.highlighted');
			var $selectedFaceUp = event.data.cardsSlots.find('.highlighted');

			for (var i = 0; i < $selectedHand.length; i++) {

				swapCardHandToFaceUp($selectedHand.eq(i).data('name'), $selectedFaceUp.eq(i).data('name'), currentPlayer);

			}

		}else{

			displayError('you must swap an equal amount of cards from your hand to your face up cards')

		}

		updateView();

	}

	function swapPlayer() {
		roundCounter++;
	}

	function getCurrentPlayer() {
		currentPlayer = (roundCounter % 2 === 0) ?  player2 : player1;

	}

	function displayError(text) {

		$errorBox.fadeIn();
		$errorBox.html(text);
		setTimeout(fadeOutErrorBox, 3000);
	
	}

	function fadeOutErrorBox() {

		$errorBox.fadeOut();

	}

	function playOneRound() {
		
		swapPlayer();
		getCurrentPlayer();
		console.log('round : ' + roundCounter);
		currentPlayer.handElement.on('click', '#' + currentPlayer.playerName + '-show-cards', toggleShowHand);
		currentPlayer.handElement.on('click', '.' + currentPlayer.playerName + 'hand-face-up-card', highlightCard);
		currentPlayer.ready.click({playerRow: currentPlayer.playerRow}, verifyChosenCards);

		// $gameBoardRow.on('click', '.card-in-play', {cardsInPlayList: cardsInPlay, currentPlayer: currentPlayer}, pickUpCardsInPlay);
		$('.card-in-play').click(pickUpCardsInPlay);

		if (currentPlayer.hand.length === 0) {

			currentPlayer.cardSlotsElement.on('click', '.face-up-card', highlightCard);

		}

	}

	function verifyChosenCards(event){

		debugger

		var $chosenCards = event.data.playerRow.find('.highlighted')
		var sameRank = identical($chosenCards);
		var validMove = false;
		var errorMessage = '';

		if (!sameRank) {

			errorMessage = 'you can only play more than one card of the same rank!';

		}

		if (cardsInPlay.length === 0) {

			validMove = true;

		}else if(cardsInPlay[cardsInPlay.length-1].value <= parseInt($chosenCards.data('value'))){

			validMove = true;

		}else {

			errorMessage += "\n you must play a card equal to or higher than the one on the board!"
		}

		if (validMove && sameRank) {

			playMove($chosenCards);
			removeCardsFromHand($chosenCards);

			while(currentPlayer.hand.length < 3){
				drawOneCard();
			}

			updateView();
			currentPlayerRemoveListeners();

		}else {

			displayError(errorMessage)

		}

	}


	function identical($array) {

	    for(var i = 0; i < $array.length - 1; i++) {
	        if($array.eq(i).data('value') !== $array.eq(i+1).data('value')) {

	            return false;
	        }
	    }

	    return true;
	}

	function playMove($chosenCards){

		var cardsToPlay = []

		for (var i = 0; i < $chosenCards.length; i++) {



			var cardName = $chosenCards.eq(i).data('name');

			cardsToPlay.push(getCardByName(cardName));

		}

		cardsInPlay = cardsInPlay.concat(cardsToPlay);



	}

	function removeCardsFromHand($chosenCards){

		for (var i = 0; i < $chosenCards.length; i++) {

			$chosenCards.eq(i)

			for (var j = 0; j < currentPlayer.hand.length; j++) {
			
				if($chosenCards.eq(i).data('name') === currentPlayer.hand[j].name){

					playedCardIndex = currentPlayer.hand.indexOf(currentPlayer.hand[j])

					currentPlayer.hand.splice(playedCardIndex, 1);

				}

			}

		}

	}

	function drawOneCard() {

		if (chosenDeckIndexs.length !== 52) {

			currentPlayer.hand.push(deck[chooseRandomCard()]);

		}
	
	}

	function pickUpCardsInPlay(event) {

		

		//concat currentPlayerHand with cards in play and assign to currentplayerHand
		// event.data.currentPlayer.hand = event.data.currentPlayer.hand.concat(event.data.cardsInPlayList);

		//cardsInPlay appears to be empty on click

		//empty cards in play
		// event.data.cardsInPlayList = [];

		// updateView();
		// currentPlayerRemoveListeners();
		// playOneRound();

		//so for some reason i need to call another function to get currentPlayer.hand and cardsInPlay...
		pickUpCards();
		updateView();
		currentPlayerRemoveListeners();
		
	}

	function pickUpCards() {

		currentPlayer.hand = currentPlayer.hand.concat(cardsInPlay);
		cardsInPlay = [];

	}

	initalSetup();
	setupRound();


});

