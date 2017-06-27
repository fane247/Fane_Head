$(function () {

	var p1FaceDown =[];
	var p1FaceUp =[];
	var p1Hand =[];

	var p2FaceDown =[];
	var p2FaceUp =[];
	var p2Hand =[];

	var hearts = 'images/hearts.png'
	var clubs = 'images/clubs.png'
	var diamonds = 'images/diamonds.png'
	var spades = 'images/spades.png'

	var $p2cardSlot1 = $('#p2card-slot-1');
	var $p2cardSlot2 = $('#p2card-slot-2');
	var $p2cardSlot3 = $('#p2card-slot-3');

	p2cardSlots = [$p2cardSlot1, $p2cardSlot2, $p2cardSlot3];

	var $p1cardSlot1 = $('#p1card-slot-1');
	var $p1cardSlot2 = $('#p1card-slot-2');
	var $p1cardSlot3 = $('#p1card-slot-3');

	p1cardSlots = [$p1cardSlot1, $p1cardSlot2, $p1cardSlot3];

	var $p2HandElement = $('#p2-hand');
	var $p1HandElement = $('#p1-hand');

	var cardsInPlayIndexs = [];

	var $p1ShowCards = $('#p1ShowCards');
	var $p2ShowCards = $('#p2ShowCards');

	var $p1Ready = $('#p1-ready');
	var $p2Ready = $('#p2-ready');

	var $p1CardSlots = $('#p1-card-slots');
	var $p2CardSlots = $('#p2-card-slots');
	//this might get a bit confusing 

	var $p1SwapCards = $('#p1-swap-cards');
	var $p2SwapCards = $('#p2-swap-cards');

	var isPlayer1Turn = true;
	var $errorBox = $('#error-box');

	var roundCounter = 3; //set this to 0 when playing from the begining 

	var $cardsInPlayElement = $('#cards-in-play');
	var cardsInPlay = [];

	var $gameBoardRow = $('#game-board-row');


	//attempt to refactor functions to make them more dry
	var player1 = {

		faceDown: p1FaceDown,
		faceUp: p1FaceUp,
		hand: p1Hand,
		cardSlots: p1cardSlots,
		handElement: $p1HandElement,
		showCards: $p1ShowCards,
		ready: $p1Ready,
		cardSlotsElement: $p1CardSlots,
		swapCards: $p1SwapCards,
		playerName: 'p1'

	};

	var player2 = {

		faceDown: p2FaceDown,
		faceUp: p2FaceUp,
		hand: p2Hand,
		cardSlots: p2cardSlots,
		handElement: $p2HandElement,
		showCards: $p2ShowCards,
		ready: $p2Ready,
		cardSlotsElement: $p2CardSlots,
		swapCards: $p2SwapCards,
		playerName: 'p2'
	
	};

	var currentPlayer = player2;

	

	function chooseRandomCard(){

		// var cardIsTaken = true;
		// var randomNumber = 0;

		// if (cardsInPlayIndexs.length === 0) {

		var initalRandomNumber = Math.floor(Math.random() * (deck.length -1)) + 0

		var randomNumber = initalRandomNumber === deck.length ? deck.length -1 : initalRandomNumber;


		deck.splice(deck.indexOf(deck[initalRandomNumber]), 1);


		// cardsInPlayIndexs.push(randomNumber);

		//  } else while(cardIsTaken){

		// 	var randomNumber = Math.floor(Math.random() * (52 - 0)) + 0;

		// 	if (!cardsInPlayIndexs.includes(randomNumber)) {

		// 		cardsInPlayIndexs.push(randomNumber);
		// 		cardIsTaken=false;
		// 	}

		// }

		return randomNumber;

	}

	function chooseFaceDownCards(){


		p1FaceDown.push(deck[chooseRandomCard()]);
		p1FaceDown.push(deck[chooseRandomCard()]);
		p1FaceDown.push(deck[chooseRandomCard()]);

		p2FaceDown.push(deck[chooseRandomCard()]);
		p2FaceDown.push(deck[chooseRandomCard()]);
		p2FaceDown.push(deck[chooseRandomCard()]);


	}


	function chooseFaceUpCards(){

		p1FaceUp.push(deck[chooseRandomCard()]);
		p1FaceUp.push(deck[chooseRandomCard()]);
		p1FaceUp.push(deck[chooseRandomCard()]);

		p2FaceUp.push(deck[chooseRandomCard()]);
		p2FaceUp.push(deck[chooseRandomCard()]);
		p2FaceUp.push(deck[chooseRandomCard()]);

	}

	function chooseHands(){

		p1Hand.push(deck[chooseRandomCard()]);
		p1Hand.push(deck[chooseRandomCard()]);
		p1Hand.push(deck[chooseRandomCard()]);

		p2Hand.push(deck[chooseRandomCard()]);
		p2Hand.push(deck[chooseRandomCard()]);
		p2Hand.push(deck[chooseRandomCard()]);

	}

	function getCardByName(cardNameString) {

		for (var i = 0; i <deck.length; i++) {

			if(deck[i].name === cardNameString){

				return	deck[i];
			}
		}
	}


	function swapCardHandToFaceUp(cardFromHand, cardFromFaceUp, playerObject){

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

	//need to redo view functions to only use player objects

	function updateView() {
		
		updateGameBoardRow();
		updateP2View();
		updateP1View();
		hideHands();
		
	}

	function updateGameBoardRow(){

		$gameBoardRow.find('.card-in-play').remove();

		if (cardsInPlay.length!==0) {

			debugger

			for (var i = 0; i < cardsInPlay.length; i++) {

				var $cardInPlay = generateFaceUpCardImage(cardsInPlay[i]);
				$cardInPlay.addClass('card-in-play');
				$cardsInPlayElement.append($cardInPlay);
			}
		}

	}

	function updateP2View(){

		updateP2FaceUpView();
		updateP2HandView();

	}

	function updateP2FaceUpView(){

		$p2CardSlots.find('.face-up-card').remove();

		for (var i = 0; i < p2FaceUp.length; i++) {

			var $faceUpCard = generateFaceUpCardImage(p2FaceUp[i]);
			$faceUpCard.addClass('face-up-card');
			p2cardSlots[i].append($faceUpCard);
		}

	}

	function updateP2HandView(){

		$p2HandElement.find('.card-hand-container').remove();

		var handLeftOffset = 0;
		var handTopOffset = 17;
		var cardCount = 0; 



		for (var i = 0; i < p2Hand.length; i++) {

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

			var $faceUpCard  = generateFaceUpCardImage(p2Hand[i]);

			$faceUpCard.addClass('p2hand-face-up-card');

			$handCardContainer.append($faceDown).append($faceUpCard);

			$handCardContainer.css('top', handTopOffset + 'px');

			if (cardCount !==0) {

				handLeftOffset += 21;
				
			}

			$handCardContainer.css('left',handLeftOffset + 'px');

			$p2HandElement.append($handCardContainer);

			cardCount++;
		}

	}

	function updateP1View() {

		updateP1FaceUpView();
		updateP1HandView();
		
	}

	function updateP1FaceUpView(){

		$p1CardSlots.find('.face-up-card').remove();

		for (var i = 0; i < p1FaceUp.length; i++) {


			if(typeof p1FaceUp[i] === 'undefined'){

				debugger;

			}

			var $faceUpCard = generateFaceUpCardImage(p1FaceUp[i]);
			$faceUpCard.addClass('face-up-card');
			p1cardSlots[i].append($faceUpCard);
		}

	}

	function updateP1HandView(){

		$p1HandElement.find('.card-hand-container').remove();

		var handLeftOffset = 0;
		var handTopOffset = 17;
		var cardCount = 0; 

		for (var i = 0; i < p1Hand.length; i++) {

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

			var $faceUpCard  = generateFaceUpCardImage(p1Hand[i]);

			$faceUpCard.addClass('p1hand-face-up-card');

			$handCardContainer.append($faceDown).append($faceUpCard);

			$handCardContainer.css('top', handTopOffset + 'px');

			if (cardCount !==0) {

				handLeftOffset += 21;
				
			}

			$handCardContainer.css('left',handLeftOffset + 'px');

			$p1HandElement.append($handCardContainer);

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
		// body...
	}

	function initalSetup() {

		chooseFaceDownCards();
		chooseFaceUpCards();
		chooseHands();
		updateView();

	}

	function setupRound() {

		updateView();
		swapPlayer();
		currentPlayer.handElement.on('click', '#' + currentPlayer.playerName + '-show-cards', toggleShowHand);
		currentPlayer.handElement.on('click', '.' + currentPlayer.playerName + 'hand-face-up-card', highlightCard);
		currentPlayer.cardSlotsElement.on('click', '.face-up-card', highlightCard);
		currentPlayer.swapCards.click({handElement: currentPlayer.handElement, cardsSlots: currentPlayer.cardSlotsElement}, verifyCardSwap)
		currentPlayer.ready.click(currentPlayerRemoveListeners);
		roundCounter++;


	}

	function currentPlayerRemoveListeners(){

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

		isPlayer1Turn = isPlayer1Turn ? false : true;
		currentPlayer = (currentPlayer.playerName === player1.playerName) ? player2 : player1;
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

		currentPlayer.handElement.on('click', '#' + currentPlayer.playerName + '-show-cards', toggleShowHand);
		currentPlayer.handElement.on('click', '.' + currentPlayer.playerName + 'hand-face-up-card', highlightCard);
		currentPlayer.ready.click({handElement: currentPlayer.handElement}, verifyChosenCards);

		if (roundCounter >=1 ) {

			$gameBoardRow.on('click', '.card-in-play', {cardsInPlayList: cardsInPlay, currentPlayer: currentPlayer}, pickUpCardsInPlay);

		}

	}

	function verifyChosenCards(event){

		var $chosenCards = event.data.handElement.find('.highlighted')
		var sameRank = identical($chosenCards);
		var validMove = false;
		var errorMessage = '';

		if (!sameRank) {

			errorMessage = 'you can only play more than one card of the same rank!';

		}

		if (cardsInPlay.length === 0) {

			validMove = true;

		}else if(cardsInPlay[cardsInPlay.length-1].value <= parseInt(event.data.handElement.find('.highlighted').data('value'))){

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

			debugger

			var cardName = $chosenCards.eq(i).data('name');

			cardsToPlay.push(getCardByName(cardName));

		}

		cardsInPlay = cardsInPlay.concat(cardsToPlay);

		debugger

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

		currentPlayer.hand.push(deck[chooseRandomCard()]);
	
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
		pickUpCards()
		
	}

	function pickUpCards() {
			
		console.log(cardsInPlay);
		console.log(currentPlayer);

		currentPlayer.hand = currentPlayer.hand.concat(cardsInPlay);

		cardsInPlay = [];

		debugger

		updateView();

		debugger
		currentPlayerRemoveListeners();
		playOneRound();

	}

	initalSetup();
	
	// setupRound();
	playOneRound();

	




});

