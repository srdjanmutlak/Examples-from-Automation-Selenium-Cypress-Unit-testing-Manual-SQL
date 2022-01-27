describe('Make an HTTP requestX', () => {


    it('Admin can post tweets', () => {

        for (var i=1; i<=100; i++) {
            cy.postTweet("http://twitter.com/AceMirrorFlash/statuses/11806337320650",i+"oneclock", "2019-10-05T23:59:51")
            }

          // creation of 100 tweets through quick for command   

    });

// check commands.js for command postTweet
})