

$(function () {

	var hearts = 'images/hearts.png';
	var clubs = 'images/clubs.png';
	var diamonds = 'images/diamonds.png';
	var spades = 'images/spades.png';

	var $errorBox = $('#error-box');

	var roundCounter = 0; //set this to 0 when playing from the begining 

	var $cardsInPlayElement = $('#cards-in-play');
	var cardsInPlay = [];

	var $gameBoardRow = $('#game-board-row');

	var player1 = {

		faceDown: [],
		faceUp: [],
		hand: [],
		cardSlots: [$('#p1card-slot-1'),$('#p1card-slot-2'),$('#p1card-slot-3')],
		$handElement: $('#p1-hand'),
		$showCards: $('#p1ShowCards'),
		$ready: $('#p1-ready'),
		$cardSlotsElement: $('#p1-card-slots'),
		$swapCards: $('#p1-swap-cards'),
		playerName: 'p1',
		$playerRow: $('#p1-row'),
		$playerNameElement : $('#p1-name')

	};

	var player2 = {

		faceDown: [],
		faceUp: [],
		hand: [],
		cardSlots: [$('#p2card-slot-1'),$('#p2card-slot-2'),$('#p2card-slot-3')],
		$handElement: $('#p2-hand'),
		$showCards: $('#p2ShowCards'),
		$ready: $('#p2-ready'),
		$cardSlotsElement: $('#p2-card-slots'),
		$swapCards: $('#p2-swap-cards'),
		playerName: 'p2',
		$playerRow: $('#p2-row'),
		$playerNameElement : $('#p2-name')

	
	};

	var $annoucerElement = $('#annoucer');

	var currentPlayer = player2;

	var chosenDeckIndexs = [];

	var $main = $('main');
	var $instructions = $('#instructions');
	var $showInstructions = $('');
	var validMove = false;
	var errorMessage = '';

	var sameRank = false ;
	var hasPlayedNoCards =false; 

	var powerCardValues = [2, 11]



	$('#play-game').click(function(event){

		$instructions.css('display', 'none');
		$main.css('display', 'block');

	})

	$('#show-instructions').click(function(event){

		$instructions.css('display', 'block');
		$main.css('display', 'none');

	})

	var cardsInPlayJRemoved = [];

	

	function chooseRandomCard(){

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


	//deal out all cards

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

	//used for swapping cards on first round

	function swapCardHandToFaceUp(cardFromHand, cardFromFaceUp, playerObject){

		// get cards to swap

		var HandCard = getCardByName(cardFromHand);
		var FaceUpCard = getCardByName(cardFromFaceUp);

		//get index's of where they are in hand and faceup arrays

		cardFromHandIndex = playerObject.hand.indexOf(HandCard);
		cardFromFaceUpIndex = playerObject.faceUp.indexOf(FaceUpCard);

		//remove from both arrays (hand and faceUp)

		playerObject.hand.splice(cardFromHandIndex,1);
		playerObject.faceUp.splice(cardFromFaceUpIndex,1);

		//add to card to hand and faceUp

		playerObject.hand.push(FaceUpCard);
		playerObject.faceUp.push(HandCard);

	}


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

	//updates both players hands

	function updateViewAll() {

		updateGameBoardRow();
		updateHandViewAll();
		updateFaceDownViewAll();
		updateFaceUpViewAll();
		hideHands();

	}



	function updateGameBoardRow(){

		//remove any cards in play from middle

		$gameBoardRow.find('.card-in-play').remove();

		//if there are no more cards in the deck remove the deck image

		if (chosenDeckIndexs.length === deck.length) {

			$('#deck').remove();

		}

		//if there are cards in play refresh regenerate the cards 

		if (cardsInPlay.length!==0) {

			for (var i = 0; i < cardsInPlay.length; i++) {

				var $cardInPlay = generateFaceUpCardImage(cardsInPlay[i]);
				$cardInPlay.addClass('card-in-play');
				$cardsInPlayElement.append($cardInPlay);
			}
		}

	}

	//updates both players faceup cards. only used for the beginning of the game

	function updateFaceUpViewAll() {

		//remove any cards in play from the players face up cards

		player1.$cardSlotsElement.find('.face-up-card').remove();

		for (var i = 0; i < player1.faceUp.length; i++) {

			var $faceUpCard = generateFaceUpCardImage(player1.faceUp[i]);
			$faceUpCard.addClass('face-up-card');
			player1.cardSlots[i].append($faceUpCard);

		}


		player2.$cardSlotsElement.find('.face-up-card').remove();

		//remove any cards in play from the players face up cards


		for (var i = 0; i < player2.faceUp.length; i++) {

			var $faceUpCard = generateFaceUpCardImage(player2.faceUp[i]);
			$faceUpCard.addClass('face-up-card');
			player2.cardSlots[i].append($faceUpCard);

		}


	}

	function updateFaceUpView() {

		currentPlayer.$cardSlotsElement.find('.face-up-card').remove();

		if (currentPlayer.faceUp.length !== 0) {

			for (var i = 0; i < currentPlayer.faceUp.length; i++) {

				var $faceUpCard = generateFaceUpCardImage(currentPlayer.faceUp[i]);
				$faceUpCard.addClass('face-up-card');
				currentPlayer.cardSlots[i].append($faceUpCard);

			}
		}

	}

	function updateFaceDownView() {

		currentPlayer.$cardSlotsElement.find('.face-down-card').remove();
		currentPlayer.$cardSlotsElement.find('.face-down-card-img').remove();

		if (currentPlayer.faceUp.length === 0) {

			// debugger;

		}

		for (var i = 0; i < currentPlayer.faceDown.length; i++) {

			var $faceDownCard = generateFaceDownCard(currentPlayer.faceDown[i]);
			currentPlayer.cardSlots[i].append($faceDownCard);

		}

	}

	//updates both players faceDown cards. only used for the beginning of the game

	function updateFaceDownViewAll() {

		player1.$cardSlotsElement.find('.face-down-card').remove();
		player1.$cardSlotsElement.find('.face-down-card-img').remove();

		for (var i = 0; i < player1.faceDown.length; i++) {

			var $faceDownCard = generateFaceDownCard(player1.faceDown[i]);
			player1.cardSlots[i].append($faceDownCard);

		}

		player2.$cardSlotsElement.find('.face-down-card').remove();
		player2.$cardSlotsElement.find('.face-down-card-img').remove();

		for (var i = 0; i < player2.faceDown.length; i++) {

			var $faceDownCard = generateFaceDownCard(player2.faceDown[i]);
			player2.cardSlots[i].append($faceDownCard);

		}


	}


	//updates both players hand cards. only used for the beginning of the game

	function updateHandViewAll(){

		player1.$handElement.find('.card-hand-container').remove();

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

			//shift each card in the hand to the left

			if (cardCount !==0) {

				handLeftOffset += 21;
				
			}

			$handCardContainer.css('left',handLeftOffset + 'px');


			player1.$handElement.append($handCardContainer);


			cardCount++;
		}

		player2.$handElement.find('.card-hand-container').remove();

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

			player2.$handElement.append($handCardContainer);

			cardCount++;
		}

	}


	function updateHandView(){

		currentPlayer.$handElement.find('.card-hand-container').remove();

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

			//shift each card in the hand to the left

			if (cardCount !==0) {

				handLeftOffset += 21;
				
			}

			$handCardContainer.css('left',handLeftOffset + 'px');

			currentPlayer.$handElement.append($handCardContainer);

			cardCount++;

		}

	}

	function toggleShowHand(){

	

		var zIndex = $('.' + currentPlayer.playerName + 'hand-face-up-card').css('z-index');

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

	//hide both hands

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

	//called when a player clicks a card to be played into the middle or swapped

	function highlightCard() {

		$(this).toggleClass('highlighted');

	}

	//called when a player clicks a faceDown card to be played into the middle or swapped

	function highlightOneCard(){

		currentPlayer.$playerRow.find('.highlighted').removeClass('highlighted');
		$(this).toggleClass('highlighted');
	}

	function initalSetup() {

		chooseFaceDownCards();
		chooseFaceUpCards();
		chooseHands();
		updateViewAll();

	}

	//used for each player's first round to swap cards from hand to faceUp cards

	function setupRound() {

		swapPlayer();
		getCurrentPlayer();
		highlightCurrentPlayer(currentPlayer);
		console.log('round : ' + roundCounter);
		currentPlayer.$handElement.on('click', '#' + currentPlayer.playerName + '-show-cards', toggleShowHand);
		currentPlayer.$handElement.on('click', '.' + currentPlayer.playerName + 'hand-face-up-card', highlightCard);
		currentPlayer.$cardSlotsElement.on('click', '.face-up-card', highlightCard);
		currentPlayer.$swapCards.click({$handElement: currentPlayer.$handElement, cardsSlots: currentPlayer.$cardSlotsElement}, verifyCardSwap);
		currentPlayer.$ready.click(currentPlayerRemoveListeners);
	}

	//used after each turn to remove listeners and call playOneRound again unless there is a winner

	function currentPlayerRemoveListeners(){

		updateView();
		currentPlayer.$handElement.off();
		currentPlayer.$cardSlotsElement.off();
		currentPlayer.$swapCards.off();
		currentPlayer.$ready.off();
		unHighlightCurrentPlayer(currentPlayer);

		if (roundCounter <= 1) {

			setupRound();

		}else{

			if (!currentPlayerHasWon()){ 	

				playOneRound();

			}
			
		}	

	}

	function displayWinner(){

		var playerNumber = currentPlayer.playerName.charAt(1);
		$annoucerElement.html('player ' + playerNumber + ' has won!' )
		$annoucerElement.fadeIn();

	}


	//used to check a player is swapping the same number of hand cards and faceup cards

	function verifyCardSwap(event) {


		var validSwap = event.data.$handElement.find('.highlighted').length === event.data.cardsSlots.find('.highlighted').length;

		if (validSwap) {

			var $selectedHand = event.data.$handElement.find('.highlighted');
			var $selectedFaceUp = event.data.cardsSlots.find('.highlighted');

			for (var i = 0; i < $selectedHand.length; i++) {

				swapCardHandToFaceUp($selectedHand.eq(i).data('name'), $selectedFaceUp.eq(i).data('name'), currentPlayer);

			}

		}else{

			displayError('you must swap an equal amount of cards from your hand to your face up cards');

		}

		updateView();

	}

	function swapPlayer() {

		roundCounter++;


	}

	function getCurrentPlayer() {

		currentPlayer = (roundCounter % 2 === 0) ?  player2 : player1;
		
	}

	//used for displaying any invalid moves

	function displayError(text) {

		$errorBox.fadeIn();
		$errorBox.html(text);
		setTimeout(fadeOutErrorBox, 3000);
	
	}

	function fadeOutErrorBox() {

		$errorBox.fadeOut();

	}

	//after swap round this is the main function used to setup click listeners for the current player 

	function playOneRound() {

		swapPlayer();
		getCurrentPlayer();
		highlightCurrentPlayer(currentPlayer);
		console.log('round : ' + roundCounter);
		currentPlayer.$handElement.on('click', '#' + currentPlayer.playerName + '-show-cards', toggleShowHand);
		currentPlayer.$handElement.on('click', '.' + currentPlayer.playerName + 'hand-face-up-card', highlightCard);
		currentPlayer.$ready.click({$playerRow: currentPlayer.$playerRow}, verifyChosenCards);

		$('.card-in-play').click(pickUpCardsInPlay);

		if (currentPlayer.hand.length === 0) {

			currentPlayer.$cardSlotsElement.on('click', '.face-up-card', highlightCard);

		}

		if (currentPlayer.faceUp.length === 0 && currentPlayer.hand.length === 0) {

			currentPlayer.$cardSlotsElement.on('click', '.face-down-card', highlightOneCard);

		}

	}


	function highlightCurrentPlayer(currentPlayer){

		currentPlayer.$playerNameElement.addClass('current-player');

	}

	function unHighlightCurrentPlayer(currentPlayer){

		currentPlayer.$playerNameElement.removeClass('current-player');

	}

	//used to verify the card played into the middle of the board

	function isValidMove($chosenCards) {

		//if there are no cards on the board and the user has played at least one card into the middle

		cardsInPlayJRemoved = cardsInPlay;

		for (var i = cardsInPlayJRemoved.length - 1; i >= 0; i--) {
			
			if(cardsInPlayJRemoved[i].value === 11){

				cardsInPlayJRemoved.splice(cardsInPlayJRemoved.indexOf(), 1);
			}

		}


		if (cardsInPlayJRemoved.length === 0) {

			validMove = true;

		//if the user has played a card and there is at least on card on the board
		}else if (cardsInPlayJRemoved[cardsInPlayJRemoved.length - 1].value <= parseInt($chosenCards.data('value'))) { 

			//returns true if card played is equal to or higher than the one on the board
			validMove = true;

		}else {

			validMove = false;
		}


		// if(isAPowerCard($chosenCards) && sameRank && !hasPlayedNoCards){

		// 	validMove = true;
		// }

		return validMove


	}

	function isAPowerCard($chosenCards){

		return powerCardValues.includes($chosenCards.data('value'));

	}

	function isFourOfAKind($chosenCards){

		//not working properly

		var checkingCardsInplay = [];
		var cardsToPlay = []

		for (var i = 0; i < $chosenCards.length; i++) {

			var cardName = $chosenCards.eq(i).data('name');
			cardsToPlay.push(getCardByName(cardName));

		}

		checkingCardsInplay = cardsInPlayJRemoved.concat(cardsToPlay);

		if (checkingCardsInplay.length < 4) {

			return false;

		}else{

			var lastIndex = checkingCardsInplay.length-1;
			var fourthToLastIndex = lastIndex -3;

			var lastFourCards = checkingCardsInplay.slice(fourthToLastIndex,lastIndex)

			return identicalCardsObject(lastFourCards);
		}

	}

	function removeCardsFromPlayer($chosenCards){

		//if you are on your facedown cards
		if (currentPlayer.faceUp.length === 0 && currentPlayer.hand.length === 0){

			removeCardsFromFaceDown($chosenCards);


		//if you have no cards in your hand but you have cards in your faceup
		}else if(currentPlayer.hand.length === 0 && currentPlayer.faceUp.length !== 0){

			removeCardsFromFaceUp($chosenCards);

		}else{

			removeCardsFromHand($chosenCards);

		}

	}

	function verifyChosenCards(event){

		if(currentPlayer.hand.length === 0){

			// debugger			

		}

		debugger


		errorMessage = "";
		var $chosenCards = event.data.$playerRow.find('.highlighted');
		sameRank = identical($chosenCards); // cards are all the same rank
		validMove = isValidMove($chosenCards);
		hasPlayedNoCards = typeof $chosenCards.data() === 'undefined';
		var faceDownCardsPickUp = false; 

		//if you are on your last cards you can play the card nomatter what. the not four of a kind is to make sure play move isn't played twice
		if(currentPlayer.faceUp.length === 0 && currentPlayer.hand.length === 0 && !isFourOfAKind($chosenCards)){

			if (!validMove) {

				faceDownCardsPickUp = true  //this ensures invalid cards are picked up after a facedown card is played
			}


			validMove = true; //allows facedown cards to be played on the board
		}

		if (!sameRank) {

			errorMessage += '\n you can only play more than one card of the same rank!';

		}else if (hasPlayedNoCards) {

			errorMessage = 'you must play at least one card!';

		}else if($chosenCards.data('value') === 10 || isFourOfAKind($chosenCards)){

			cardsInPlay = [];
			updateView();

		}else if(isAPowerCard($chosenCards)){

			playMove($chosenCards);

		}else if(validMove){

			playMove($chosenCards);

		}else if(!validMove){

			errorMessage += "\n you must play a card equal to or higher than a " + cardsInPlayJRemoved[cardsInPlayJRemoved.length - 1].rank ;

		}


		//remove from either hand, faceup or facedown if you have played one card that is valid

		if(errorMessage === ""){

			removeCardsFromPlayer($chosenCards);


			//only picks up on a invalid facedown card play
			if (faceDownCardsPickUp){

				annouceMessage('Oh No! not high enough');
				playSound();
				pickUpCards();

			}



			while (currentPlayer.hand.length < 3 && chosenDeckIndexs.length < deck.length) {



				drawOneCard();

			}

			//if you havent played a 10 or 4 of a kind to burn the pack (or you had to pick up because of a low facedown card) the turn passes over
			if (cardsInPlay.length !==0 || faceDownCardsPickUp) {

				if ($chosenCards.data('value') === 2) {

					annouceMessage('reset!');

				}

				if ($chosenCards.data('value') === 11) {

					annouceMessage('see through!');
				}

				updateView();
				currentPlayerRemoveListeners();

				if (currentPlayerHasWon()) {

					displayWinner();
					
				}

			}else{

				annouceMessage('Burn!');
				updateView();

				if (currentPlayerHasWon()) {

					displayWinner();
					
				}

			}

			
		}else{

			displayError(errorMessage);

		}
	

	}

	function annouceMessage(messageString){

		$annoucerElement.html(messageString);
		$annoucerElement.fadeIn();
		setTimeout(function() {

			$annoucerElement.fadeOut();


		}, 3000);

	}

	function showFaceDownCard($chosenCards){

		//WIP

		// debugger

		var cardName = $chosenCards.eq(0).data('name');

		var $faceUpCard = generateFaceUpCardImage(getCardByName(cardName));

		$faceUpCard.css('display', 'none');

		$faceUpCard.addClass('face-up-card');

		$chosenCards.eq(0).parent().find('.face-down-card-img').remove();

		$chosenCards.eq(0).parent().append($faceUpCard);

		// $('.face-up-card').fadeIn();


	}

	function sleep (time) {

  		return new Promise((resolve) => setTimeout(resolve, time));

	}

	function identicalCardsObject(CardObjectArray) {

	    for(var i = 0; i < CardObjectArray.length - 1; i++) {

	        if(CardObjectArray[i].value !== CardObjectArray[i+1].value ) {

	            return false;
	        }
	    }

	    return true;
	}


	function identical($array) {

	    for(var i = 0; i < $array.length - 1; i++) {
	        if($array.eq(i).data('value') !== $array.eq(i+1).data('value')) {

	            return false;
	        }
	    }

	    return true;
	}

	//gets the card object by name adds it to cards in play (on the board)

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

			$chosenCards.eq(i);

			for (var j = 0; j < currentPlayer.hand.length; j++) {
			
				if($chosenCards.eq(i).data('name') === currentPlayer.hand[j].name){

					playedCardIndex = currentPlayer.hand.indexOf(currentPlayer.hand[j]);

					currentPlayer.hand.splice(playedCardIndex, 1);

				}

			}

		}

	}

	function removeCardsFromFaceUp($chosenCards){

		if (currentPlayer.faceUp.length === 0 ) {

			// debugger

		}

		for (var i = 0; i < $chosenCards.length; i++) {

			$chosenCards.eq(i)

			for (var j = 0; j < currentPlayer.faceUp.length; j++) {
			
				if($chosenCards.eq(i).data('name') === currentPlayer.faceUp[j].name){

					playedCardIndex = currentPlayer.faceUp.indexOf(currentPlayer.faceUp[j]);

					currentPlayer.faceUp.splice(playedCardIndex, 1);

				}

			}

		}

	}

	function removeCardsFromFaceDown($chosenCards){

		debugger;

		for (var i = 0; i < $chosenCards.length; i++) {

			$chosenCards.eq(i);

			for (var j = 0; j < currentPlayer.faceDown.length; j++) {
			
				if($chosenCards.eq(i).data('name') === currentPlayer.faceDown[j].name){

					playedCardIndex = currentPlayer.faceDown.indexOf(currentPlayer.faceDown[j]);

					currentPlayer.faceDown.splice(playedCardIndex, 1);

				}

			}

		}

	}

	function drawOneCard() {

		if (chosenDeckIndexs.length < deck.length) {

			var drawnCard = deck[chooseRandomCard()];

			drawnCard.fadeIn = true;

			currentPlayer.hand.push(drawnCard);

		}
	
	}

	function pickUpCardsInPlay(event) {

		pickUpCards();
		updateView();
		currentPlayerRemoveListeners();
		
	}

	function pickUpCards() {

		currentPlayer.hand = currentPlayer.hand.concat(cardsInPlay);
		cardsInPlay = [];

	}

	function currentPlayerHasWon() {

		return (currentPlayer.hand.length === 0 && currentPlayer.faceUp.length === 0 && currentPlayer.faceDown.length ===0);
		
	}

	function playSound(){

		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src', 'sound/Oh-no_.mp3');	
		audioElement.play();

	}


	initalSetup();
	setupRound();


});


