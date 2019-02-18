var mathLibrary = require('../lib/myMathLibrary')

describe("multipication", function () {
    it("can multiply two numbers", function () {
        var twenty = mathLibrary.product(4, 5);
        expect(twenty).toBe(20);
    })
});

