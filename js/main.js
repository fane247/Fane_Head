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

	var $p1SwapCards = $('#p1-swap-cards');
	var $p2SwapCards = $('#p2-swap-cards');

	var isPlayer1Turn = true;

	function chooseRandomCard(){

		var cardIsTaken = true;
		var randomNumber = 0;

		if (cardsInPlayIndexs.length === 0) {

		var randomNumber = Math.floor(Math.random() * (52 - 0)) + 0;
		cardsInPlayIndexs.push(randomNumber);

		 }else while(cardIsTaken){

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


	function swapCardHandToFaceUpP1(cardFromHand, cardFromFaceUp){

		var p1HandCard = getCardByName(cardFromHand);
		var p1FaceUpCard = getCardByName(cardFromFaceUp);

		cardFromHandIndex = p1Hand.indexOf(p1HandCard);
		cardFromFaceUpIndex = p1FaceUp.indexOf(p1FaceUpCard);

		p1Hand.splice(cardFromHandIndex,1);
		p1FaceUp.splice(cardFromFaceUpIndex,1);

		p1Hand.push(p1FaceUpCard);
		p1FaceUp.push(p1HandCard);

	}

	function swapCardHandToFaceUpP2(cardFromHand, cardFromFaceUp){

		var p2HandCard = getCardByName(cardFromHand);
		var p2FaceUpCard = getCardByName(cardFromFaceUp);

		cardFromHandIndex = p2Hand.indexOf(p2HandCard);
		cardFromFaceUpIndex = p2FaceUp.indexOf(p2FaceUpCard);

		p2Hand.splice(cardFromHandIndex,1);
		p2FaceUp.splice(cardFromFaceUpIndex,1);

		p2Hand.push(p2FaceUpCard);
		p2FaceUp.push(p2HandCard);

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

	function p2ToggleShowHand(){

		var zIndex = $('.p2hand-face-up-card').css('z-index')

		if (zIndex === '0') {

			p2HideHand();

		} else {

			p2ShowHand();
		}


	}

	function p2HideHand() {

		$('.p2hand-face-up-card').css('z-index', '-1');

	}

	function p2ShowHand() {

		$('.p2hand-face-up-card').css('z-index', '0');
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

		p1ToggleShowHand();
		p2ToggleShowHand();

	}

	function p1setupRound() {

		$p1HandElement.on('click', '#p1-show-cards', p1ToggleShowHand);
		$p1HandElement.on('click', '.p1hand-face-up-card', highlightCard);
		$p1CardSlots.on('click', '.face-up-card', highlightCard);
		$p1SwapCards.click({handElement: $p1HandElement, cardsSlots: $p1CardSlots}, verifyCardSwap)
		$p1Ready.click(p1FinishSetup)

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

		$p2HandElement.on('click', '#p2-show-cards', p2ToggleShowHand);
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

				if (isPlayer1Turn) {

					swapCardHandToFaceUpP1($selectedHand.eq(i).data('name'),$selectedFaceUp.eq(i).data('name'));

				}else {

					swapCardHandToFaceUpP2($selectedHand.eq(i).data('name'),$selectedFaceUp.eq(i).data('name'));

				}

			}

		}

		if (isPlayer1Turn) {

			updateP1View();

		}else{

			updateP2View();
		}

	}

	function swapPlayer() {

		isPlayer1Turn = isPlayer1Turn ? false : true;
	}


	initalSetup();
	p1setupRound();

	







});

