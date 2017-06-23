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

	{name: 'h2',suit: 'h',value: 2},
	{name: 'h3',suit: 'h',value: 3},
	{name: 'h4',suit: 'h',value: 4},
	{name: 'h5',suit: 'h',value: 5},
	{name: 'h6',suit: 'h',value: 6},
	{name: 'h7',suit: 'h',value: 7},
	{name: 'h8',suit: 'h',value: 8},
	{name: 'h9',suit: 'h',value: 9},
	{name: 'h10',suit: 'h',value: 10},
	{name: 'hJ',suit: 'h',value: 11},
	{name: 'hQ',suit: 'h',value: 12},
	{name: 'hK',suit: 'h',value: 13},
	{name: 'hA',suit: 'h',value: 14},
	{name: 'c2',suit: 'c',value: 2},
	{name: 'c3',suit: 'c',value: 3},
	{name: 'c4',suit: 'c',value: 4},
	{name: 'c5',suit: 'c',value: 5},
	{name: 'c6',suit: 'c',value: 6},
	{name: 'c7',suit: 'c',value: 7},
	{name: 'c8',suit: 'c',value: 8},
	{name: 'c9',suit: 'c',value: 9},
	{name: 'c10',suit: 'c',value: 10},
	{name: 'cJ',suit: 'c',value: 11},
	{name: 'cQ',suit: 'c',value: 12},
	{name: 'cK',suit: 'c',value: 13},
	{name: 'cA',suit: 'c',value: 14},
	{name: 's2',suit: 's',value: 2},
	{name: 's3',suit: 's',value: 3},
	{name: 's4',suit: 's',value: 4},
	{name: 's5',suit: 's',value: 5},
	{name: 's6',suit: 's',value: 6},
	{name: 's7',suit: 's',value: 7},
	{name: 's8',suit: 's',value: 8},
	{name: 's9',suit: 's',value: 9},
	{name: 's10',suit: 's',value: 10},
	{name: 'sJ',suit: 's',value: 11},
	{name: 'sQ',suit: 's',value: 12},
	{name: 'sK',suit: 's',value: 13},
	{name: 'sA',suit: 's',value: 14},
	{name: 'd2',suit: 'd',value: 2},
	{name: 'd3',suit: 'd',value: 3},
	{name: 'd4',suit: 'd',value: 4},
	{name: 'd5',suit: 'd',value: 5},
	{name: 'd6',suit: 'd',value: 6},
	{name: 'd7',suit: 'd',value: 7},
	{name: 'd8',suit: 'd',value: 8},
	{name: 'd9',suit: 'd',value: 9},
	{name: 'd10',suit: 'd',value: 10},
	{name: 'dJ',suit: 'd',value: 11},
	{name: 'dQ',suit: 'd',value: 12},
	{name: 'dK',suit: 'd',value: 13},
	{name: 'dA',suit: 'd',value: 14}

]



$(function () {

	var p1FaceDown =[];
	var p1FaceUp =[];
	var p1Hand =[];

	var p2FaceDown =[];
	var p2FaceUp =[];
	var p2Hand =[];

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


	function chooseFaceUpCards(){}

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






});

