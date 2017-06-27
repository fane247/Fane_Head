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

	var currentPlayer = player1



	function chooseRandomCard(){

		var cardIsTaken = true;
		var randomNumber = 0;

		if (cardsInPlayIndexs.length === 0) {

		var randomNumber = Math.floor(Math.random() * (52 - 0)) + 0;
		cardsInPlayIndexs.push(randomNumber);

		 } else while(cardIsTaken){

			var randomNumber = Math.floor(Math.random() * (52 - 0)) + 0;

			if (!cardsInPlayIndexs.includes(randomNumber)) {

				cardsInPlayIndexs.push(randomNumber);
				cardIsTaken=false;
			}

		}

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

	function updateView(argument) {
		
		updateP2View();
		updateP1View();
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
		// $p1CardSlots.find('.highlighted').remove();

		for (var i = 0; i < p1FaceUp.length; i++) {

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

			p2HideHand();

		} else {

			p2ShowHand();
		}


	}

	function p2HideHand() {

		$('.' + currentPlayer.playerName + 'hand-face-up-card').css('z-index', '-1');

	}

	function p2ShowHand() {

		$('.' + currentPlayer.playerName + 'hand-face-up-card').css('z-index', '0');
	}


	

	function p1ToggleShowHand(){

		var zIndex = $('.p1hand-face-up-card').css('z-index')

		if (zIndex === '0') {

			p1HideHand();

		} else {

			p1ShowHand();
		}


	}

	function p1HideHand() {

		$('.p1hand-face-up-card').css('z-index', '-1');

	}

	function p1ShowHand() {

		$('.p1hand-face-up-card').css('z-index', '0');
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

		// p1ToggleShowHand();
		// p2ToggleShowHand();
		toggleShowHand();
		swapPlayer();
		toggleShowHand();
		swapPlayer();
		debugger;

	}

	function setupRound() {

		currentPlayer.handElement.on('click', '#p1-show-cards', toggleShowHand);
		currentPlayer.handElement.on('click', '.p1hand-face-up-card', highlightCard);
		currentPlayer.cardSlotsElement.on('click', '.face-up-card', highlightCard);
		currentPlayer.swapCards.click({handElement: currentPlayer.handElement, cardsSlots: currentPlayer.cardSlotsElement}, verifyCardSwap)
		currentPlayer.ready.click(p1FinishSetup)

	}

	function p1FinishSetup(){

		$p1HandElement.off();
		$p1CardSlots.off();
		$p1SwapCards.off();
		$p1Ready.off();
		p1HideHand();
		swapPlayer();
		p2setupRound();

	}

	function p2setupRound(){

		$p2HandElement.on('click', '#p2-show-cards', toggleShowHand);
		$p2HandElement.on('click', '.p2hand-face-up-card', highlightCard);
		$p2CardSlots.on('click', '.face-up-card', highlightCard);
		$p2SwapCards.click({handElement: $p2HandElement, cardsSlots: $p2CardSlots}, verifyCardSwap);
		$p2Ready.click(p2FinishSetup);

	}

	function p2FinishSetup(){

		$p2HandElement.off();
		$p2CardSlots.off();
		$p2SwapCards.off();
		$p2Ready.off();
		p2HideHand();

	}

	function verifyCardSwap(event) {


		if (!isPlayer1Turn) {

			debugger;
		}

		var validSwap = event.data.handElement.find('.highlighted').length === event.data.cardsSlots.find('.highlighted').length;

		if (validSwap) {

			var $selectedHand = event.data.handElement.find('.highlighted');
			var $selectedFaceUp = event.data.cardsSlots.find('.highlighted');

			for (var i = 0; i < $selectedHand.length; i++) {

					swapCardHandToFaceUp($selectedHand.eq(i).data('name'), $selectedFaceUp.eq(i).data('name'), currentPlayer);

			}

		}else{

			// debugger;
			$errorBox.fadeIn();
			$errorBox.html('you must swap an equal amount of cards from your hand to your face up cards')
			setTimeout(fadeOutErrorBox, 3000);

		}

		if (isPlayer1Turn) {

			updateP1View();

		}else{

			updateP2View();
		}

	}

	function swapPlayer() {

		isPlayer1Turn = isPlayer1Turn ? false : true;
		currentPlayer = (currentPlayer === player1) ? player2 : player1;
	}

	function fadeOutErrorBox() {

		$errorBox.fadeOut();

	}

	// function initialiseCurrentPlayerRound(){

	// 	$p2HandElement.on('click', '#p2-show-cards', p2ToggleShowHand);
	// 	$p2HandElement.on('click', '.p2hand-face-up-card', highlightCard);

	// 	currentPlayer.handElement.on('click', '#' + currentPlayer.playerName + '-show-cards', p2sToggleShowHand);

	// }


	initalSetup();
	setupRound();

	







});

