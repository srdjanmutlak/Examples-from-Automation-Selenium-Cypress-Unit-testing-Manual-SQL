// -- Start: Our Application Code --
function fizzbuzz(num) {
    if (num % 3 === 0 && num % 5 === 0) {
        return 'fizzbuzz'
    }

    if (num % 3 === 0) {
        return 'fizz'
    }

    if (num % 5 === 0) {
        return 'buzz'
    }
}
// -- End: Our Application Code --


// -- Start: Our Cypress Tests --
describe('Unit Test FizzBuzz', () => {
    function numsExpectedToEq(arr, expected) {
        // loop through the array of nums and make
        // sure they equal what is expected
        arr.forEach((num) => {
            expect(fizzbuzz(num)).to.eq(expected)
        })
    }

    // skip test
    it.only('returns "fizz" when number is multiple of 3', () => {
       numsExpectedToEq([9, 12, 18], 'fizz')
    })

    // execute this test
    it('returns "fizz" when number is multiple of 3', () => {
        numsExpectedToEq([9, 12, 18], 'fizz')
    })

    it('returns "buzz" when number is multiple of 5', () => {
        numsExpectedToEq([10, 20, 25], 'buzz')
    })

    it('returns "fizzbuzz" when number is multiple of both 3 and 5', () => {
        numsExpectedToEq([15, 30, 60], 'fizzbuzz')
    })
})

// Kako da budemo sigurni da smo napisali dobar test?
// Stavimo .only i ako se izvrši znamo da je dobar.
// Ako test ne prođe, odraditi refactor i/ili promeniti pristup.

// Jedno od rešenja može da bude prebacivanje koda koji se ponavlja u before ili beforeEach
// ili spajanje više testova u jedan veći.
