describe("This is a whatCanIDrink function", function(){

    /* BEFORE EACH BLOCK TEST, A NEW INSTANCE WILL BE CREATED TO TEST, SO NO RESIDUE FROM PREVIOUS TEST */
    beforeEach(function (){
        drink = new whatCanIDrink();
    });

    describe("checks age", function(){
        it("exists", function(){
            expect(whatCanIDrink).toBeDefined();
        });

        it("Should return incorrect value if i enter a letter", function(){
            let result = whatCanIDrink("a")
            expect(result).toBe("Sorry. I can’t tell what drink because that age is incorrect!");
        });

         it("should return drink beer when called with whatCanIDrink(18)", function () {
            let result = whatCanIDrink(18)
            expect(result).toBe("Drink Beer");
        });
    });
});