describe('Make an HTTP requestX', () => {

    it('Admin should not be able to get tweet through this query', () => {

    

    cy.request({                                                                
            method: 'GET',                                                     
            url:  'http://localhost:8080/tweets?id=http://twitter.cRRom/AceMirrorFlash/statuses/1180633732065058816',      
            // query address is wrong

        }).then((response) => {   
              
            expect(response.status).to.eq(200) 

            expect(response.body).to.have.length(100)

            expect(response.body[0]).to.have.property('id', "http://twitter.com/AceMirrorFlash/statuses/1180633732065058816") 
            expect(response.body[0]).to.have.property('content', "@ryuto_dragstar そうなんだ！あー映画楽しみ！ミラクルライトらやくほしい！") 
            expect(response.body[0]).to.have.property('bw_timestamp', "2019-10-05T23:59:51") 
            
          // this works, but it should not. 
          // this GET command just shows all 100 tweets again                             
        })   

    });


})