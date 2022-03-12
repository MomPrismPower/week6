var expect = chai.expect;
describe('Print the face of a card', function(){
	describe('#Card.toString', function(){
		var deck = new Deck();
		deck.resetDeck();
		var pickACard = deck.pullTopCard();
		it("prints out the suit and value of the this.card", function() {
			expect(pickACard.toString()).to.equal('King of ♦️');
		});
		
	});
	
});