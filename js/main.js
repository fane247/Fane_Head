console.log('linked');



var testDeck = {

	cards: {

		h2:{  
		  name:'h2',
		  suit:'h',
		  value:2
		},
		h3:{  
		  name:'h3',
		  suit:'h',
		  value:3
		},
		h4:{  
		  name:'h4',
		  suit:'h',
		  value:4
		},
		h5:{  
		  name:'h5',
		  suit:'h',
		  value:5
		},
		h6:{  
		  name:'h6',
		  suit:'h',
		  value:6
		},
		h7:{  
		  name:'h7',
		  suit:'h',
		  value:7
		},
		h8:{  
		  name:'h8',
		  suit:'h',
		  value:8
		},
		h9:{  
		  name:'h9',
		  suit:'h',
		  value:9
		},
		h10:{  
		  name:'h10',
		  suit:'h',
		  value:10
		},
		hJ:{  
		  name:'hJ',
		  suit:'h',
		  value:11
		},
		hQ:{  
		  name:'hQ',
		  suit:'h',
		  value:12
		},
		hK:{  
		  name:'hK',
		  suit:'h',
		  value:13
		},
		hA:{  
		  name:'hA',
		  suit:'h',
		  value:14
		}
	}
}

var deck = [

	{name: 'h2',suit: 'h',rank: '2',value: 2},
	{name: 'h3',suit: 'h',rank: '3',value: 3},
	{name: 'h4',suit: 'h',rank: '4',value: 4},
	{name: 'h5',suit: 'h',rank: '5',value: 5},
	{name: 'h6',suit: 'h',rank: '6',value: 6},
	{name: 'h7',suit: 'h',rank: '7',value: 7},
	{name: 'h8',suit: 'h',rank: '8',value: 8},
	{name: 'h9',suit: 'h',rank: '9',value: 9},
	{name: 'h10',suit: 'h',rank: '10',value: 10},
	{name: 'hJ',suit: 'h',rank: 'J',value: 11},
	{name: 'hQ',suit: 'h',rank: 'Q',value: 12},
	{name: 'hK',suit: 'h',rank: 'K',value: 13},
	{name: 'hA',suit: 'h',rank: 'A',value: 14},
	{name: 'c2',suit: 'c',rank: '2',value: 2},
	{name: 'c3',suit: 'c',rank: '3',value: 3},
	{name: 'c4',suit: 'c',rank: '4',value: 4},
	{name: 'c5',suit: 'c',rank: '5',value: 5},
	{name: 'c6',suit: 'c',rank: '6',value: 6},
	{name: 'c7',suit: 'c',rank: '7',value: 7},
	{name: 'c8',suit: 'c',rank: '8',value: 8},
	{name: 'c9',suit: 'c',rank: '9',value: 9},
	{name: 'c10',suit: 'c',rank: '10',value: 10},
	{name: 'cJ',suit: 'c',rank: 'J',value: 11},
	{name: 'cQ',suit: 'c',rank: 'Q',value: 12},
	{name: 'cK',suit: 'c',rank: 'K',value: 13},
	{name: 'cA',suit: 'c',rank: 'A',value: 14},
	{name: 's2',suit: 's',rank: '2',value: 2},
	{name: 's3',suit: 's',rank: '3',value: 3},
	{name: 's4',suit: 's',rank: '4',value: 4},
	{name: 's5',suit: 's',rank: '5',value: 5},
	{name: 's6',suit: 's',rank: '6',value: 6},
	{name: 's7',suit: 's',rank: '7',value: 7},
	{name: 's8',suit: 's',rank: '8',value: 8},
	{name: 's9',suit: 's',rank: '9',value: 9},
	{name: 's10',suit: 's',rank: '10',value: 10},
	{name: 'sJ',suit: 's',rank: 'J',value: 11},
	{name: 'sQ',suit: 's',rank: 'Q',value: 12},
	{name: 'sK',suit: 's',rank: 'K',value: 13},
	{name: 'sA',suit: 's',rank: 'A',value: 14},
	{name: 'd2',suit: 'd',rank: '2',value: 2},
	{name: 'd3',suit: 'd',rank: '3',value: 3},
	{name: 'd4',suit: 'd',rank: '4',value: 4},
	{name: 'd5',suit: 'd',rank: '5',value: 5},
	{name: 'd6',suit: 'd',rank: '6',value: 6},
	{name: 'd7',suit: 'd',rank: '7',value: 7},
	{name: 'd8',suit: 'd',rank: '8',value: 8},
	{name: 'd9',suit: 'd',rank: '9',value: 9},
	{name: 'd10',suit: 'd',rank: '10',value: 10},
	{name: 'dJ',suit: 'd',rank: 'J',value: 11},
	{name: 'dQ',suit: 'd',rank: 'Q',value: 12},
	{name: 'dK',suit: 'd',rank: 'K',value: 13},
	{name: 'dA',suit: 'd',rank: 'A',value: 14}

]



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

	var $player2HandElement = $('#player2-hand');


	function chooseRandomCard(){

		return Math.floor(Math.random() * (52 - 0 + 1)) + 0;

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


	function swapCardHandToFaceUpP1(cardFromHandIndex, cardFromFaceUpIndex){

		var p1HandCard = p1Hand[cardFromHandIndex];
		var p1FaceUpCard = p1FaceUp[cardFromFaceUpIndex];

		p1Hand.splice(cardFromHandIndex,1);
		p1FaceUp.splice(cardFromFaceUpIndex,1);

		p1Hand.push(p1FaceUpCard);
		p1FaceUp.push(p1HandCard);

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

	function updateP2View(){

		// for (var i = 0; i < p2FaceDown.length; i++) {

		// 	var $faceDownCard = generateFaceDownCardImage(p2FaceDown[i])
		// 	p2cardSlots[i].append($faceDownCard);
		// }

		for (var i = 0; i < p2FaceUp.length; i++) {

			var $faceUpCard = generateFaceUpCardImage(p2FaceUp[i]);
			$faceUpCard.addClass('face-up-card');
			p2cardSlots[i].append($faceUpCard);
		}

		var handLeftOffset = 0;
		var handTopOffset = 17;
		var cardCount = 0; 

		for (var i = 0; i < p2Hand.length; i++) {

			cardCount++


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

			$faceUpCard.addClass('hand-face-up-card');

			$handCardContainer.append($faceDown).append($faceUpCard);


			$handCardContainer.css('top', handTopOffset + 'px');

			if (cardCount !==0) {

				handLeftOffset += 21;
				
			}

			$handCardContainer.css('left',handLeftOffset + 'px');


			$player2HandElement.append($handCardContainer)

		}

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
				suitImage = hearts;
				break;
		}

		return suitImage;

	}



	chooseFaceDownCards();
	chooseFaceUpCards();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();
	chooseHands();

		

	updateP2View();



	// swapCardHandToFaceUpP1(0,0);







});

