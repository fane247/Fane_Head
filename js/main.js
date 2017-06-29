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
		playerRow: $('#p1-row'),
		playerNameElement : $('#p1-name')

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
		playerRow: $('#p2-row'),
		playerNameElement : $('#p2-name')

	
	};

	var $annoucerElement = $('#annoucer')

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

			var randomNumber = Math.floor(Math.random() * (deck.length - 0)) + 0;

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

		// debugger;

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

	function generateFaceDownCard(cardObject){


		var cardName = cardObject.name;
		var cardSuit = cardObject.suit;
		var cardRank = cardObject.rank;
		var cardValue = cardObject.value.toString();
		var cardSuitImage = getSuitImage(cardSuit);

		var $faceDown = $('<div class="face-down-card" data-name="' + cardName + '" data-suit="' + cardSuit + '" data-value="' + cardValue + '">'
							+'</div>'
						+'<img class="face-down-card-img" src="images/back.jpg">');

		return $faceDown;

	}

	function generateHandCardContainer(){

		return $('<div class="card-hand-container"></div>');

	}



	function updateView() {
		
		updateGameBoardRow();
		updateHandView();
		updateFaceDownView();
		updateFaceUpView();
		hideHands();
		
	}

	function updateViewAll() {

		updateGameBoardRow();
		updateHandViewAll();
		updateFaceDownViewAll();
		updateFaceUpViewAll();
		hideHands();

	}

	function updateGameBoardRow(){

		$gameBoardRow.find('.card-in-play').remove();

		if (chosenDeckIndexs.length === deck.length) {

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

		if (currentPlayer.faceUp.length !== 0) {

			for (var i = 0; i < currentPlayer.faceUp.length; i++) {

				var $faceUpCard = generateFaceUpCardImage(currentPlayer.faceUp[i]);
				$faceUpCard.addClass('face-up-card');
				currentPlayer.cardSlots[i].append($faceUpCard);

			}
		}
	}

	function updateFaceDownView() {

		currentPlayer.cardSlotsElement.find('.face-down-card').remove();
		currentPlayer.cardSlotsElement.find('.face-down-card-img').remove();

		if (currentPlayer.faceUp.length === 0) {

			debugger;

		}

		for (var i = 0; i < currentPlayer.faceDown.length; i++) {

			var $faceDownCard = generateFaceDownCard(currentPlayer.faceDown[i]);
			// $faceDownCard.addClass('face-down-card');
			currentPlayer.cardSlots[i].append($faceDownCard);

		}

	}

	function updateFaceDownViewAll() {

		player1.cardSlotsElement.find('.face-down-card').remove();
		player1.cardSlotsElement.find('.face-down-card-img').remove();

		for (var i = 0; i < player1.faceUp.length; i++) {

			var $faceDownCard = generateFaceDownCard(player1.faceUp[i]);
			// $faceDownCard.addClass('face-down-card');
			player1.cardSlots[i].append($faceDownCard);

		}

		player2.cardSlotsElement.find('.face-down-card').remove();
		player2.cardSlotsElement.find('.face-down-card-img').remove();

		for (var i = 0; i < player2.faceUp.length; i++) {

			var $faceDownCard = generateFaceDownCard(player2.faceUp[i]);
			// $faceDownCard.addClass('face-down-card');
			player2.cardSlots[i].append($faceDownCard);

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

			if (currentPlayerHasWon()){ 	

				displayWinner();

			}else{

				playOneRound();
			}
	
			
		}	

	}

	function displayWinner(){

		var playerNumber = currentPlayer.playerName.charAt(1);
		$annoucerElement.html('player ' + playerNumber + ' has won!' )
		$annoucerElement.fadeIn();

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

		if (currentPlayer.faceUp.length === 0) {

			currentPlayer.cardSlotsElement.on('click', '.face-down-card', highlightCard);

		}



	}

	function verifyChosenCards(event){

		if(currentPlayer.hand.length === 0){

			debugger

		}

		debugger

		var $chosenCards = event.data.playerRow.find('.highlighted')
		var sameRank = identical($chosenCards);
		var validMove = false;
		var errorMessage = '';
		var hasPlayedNoCards = typeof $chosenCards.data() === 'undefined';

		if (!sameRank) {

			errorMessage = 'you can only play more than one card of the same rank!';

		}

		if (hasPlayedNoCards) {

			errorMessage = 'you must play at least one card!';


		}

		if (cardsInPlay.length === 0 && !hasPlayedNoCards) {

			validMove = true;

		}else if(!hasPlayedNoCards){

			if (cardsInPlay[cardsInPlay.length-1].value <= parseInt($chosenCards.data('value'))) {

				validMove = true;

			}	

		}else {

			errorMessage += "\n you must play a card equal to or higher than the one on the board!"
		}

		//if a facedown  card is played errormessage gets assigned by accident

		if (currentPlayer.faceUp.length === 0 && currentPlayer.hand.length === 0) {

			playMove($chosenCards);
			removeCardsFromFaceDown($chosenCards);

			if (!validMove) {

				pickUpCards();

			}

			updateView();
			currentPlayerRemoveListeners();


		} else if (validMove && sameRank && !hasPlayedNoCards) {

			playMove($chosenCards);

			if (currentPlayer.hand.length !== 0) {
				
				removeCardsFromHand($chosenCards);

			}else if(currentPlayer.faceUp.length !== 0){

				removeCardsFromFaceUp($chosenCards);

			}

			// }else if(currentPlayer.faceUp.length === 0){

			// 	removeCardsFromFaceDown($chosenCards);

			// }
			

			while(currentPlayer.hand.length < 3 && (chosenDeckIndexs.length < deck.length)){

				drawOneCard();
			}

			updateView();
			currentPlayerRemoveListeners();

		} else {

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

	function removeCardsFromFaceUp($chosenCards){

		if (currentPlayer.faceUp.length === 0 ) {

			debugger

		}

		for (var i = 0; i < $chosenCards.length; i++) {

			$chosenCards.eq(i)

			for (var j = 0; j < currentPlayer.faceUp.length; j++) {
			
				if($chosenCards.eq(i).data('name') === currentPlayer.faceUp[j].name){

					playedCardIndex = currentPlayer.faceUp.indexOf(currentPlayer.faceUp[j])

					currentPlayer.faceUp.splice(playedCardIndex, 1);

				}

			}

		}

	}

	function removeCardsFromFaceDown($chosenCards){

		for (var i = 0; i < $chosenCards.length; i++) {

			$chosenCards.eq(i)

			for (var j = 0; j < currentPlayer.faceDown.length; j++) {
			
				if($chosenCards.eq(i).data('name') === currentPlayer.faceDown[j].name){

					playedCardIndex = currentPlayer.faceUp.indexOf(currentPlayer.faceDown[j])

					currentPlayer.faceDown.splice(playedCardIndex, 1);

				}

			}

		}

	}

	function drawOneCard() {

		debugger

		if (chosenDeckIndexs.length < deck.length) {

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

	function currentPlayerHasWon() {

		return (currentPlayer.hand.length === 0 && currentPlayer.faceUp.length === 0 && currentPlayer.faceDown.length ===0)
		
	}


	initalSetup();
	setupRound();


});

