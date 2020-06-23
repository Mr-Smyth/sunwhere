describe("This is a thisLocation function", function(){


    describe("check Latitude", function(){
        it("exists", function(){
            expect(thisLocation).toBeDefined();
        });

        it("Should return a float number for latitude", function(){
            let result = thisLocation();
            expect(result).toBe(typeof(float));
        });


    });
});

