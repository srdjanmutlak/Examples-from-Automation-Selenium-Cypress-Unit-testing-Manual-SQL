describe('Make an HTTP requestX', () => {

    it('Admin can get tweets and its values are id, content and bw_timestamp', () => {

    

    cy.request({                                                                
            method: 'GET',                                                      
            url:  'http://localhost:8080/tweets',      
            followRedirect: false,
            headers: {
                'accept': 'application/json' 
            }
        }).then((response) => {   
              
            expect(response.status).to.eq(200) //we test the response

            expect(response.body).to.have.length(100) //we test to check if the number of tweets is 100

            expect(response.body[0]).to.have.property('id', "http://twitter.com/AceMirrorFlash/statuses/1180633732065058816") 
            expect(response.body[0]).to.have.property('content', "@ryuto_dragstar そうなんだ！あー映画楽しみ！ミラクルライトらやくほしい！") 
            expect(response.body[0]).to.have.property('bw_timestamp', "2019-10-05T23:59:51") 

            expect(response.body[99]).to.have.property('id', "http://twitter.com/zJb6KC4ga93Gbbm/statuses/1180633736808824833") 
            expect(response.body[99]).to.have.property('content', "RT @BH_Hong2 아 백현이 엑소 사진찍을때 자리로 무의식중에 갔다가 돌아가는거 왤케 기엽냐ㅠㅠㅠㅠ갓더니 카이도 엑소때 자리에 있엌ㅋㅋㅋㅋㅋㅋ \nhttps://t.co/yv5pJwuzVG") 
            expect(response.body[99]).to.have.property('bw_timestamp', "2019-10-05T23:59:52") 
            // we test the proper response of the first and the last tweet

            expect(response.body).to.not.be.null;
            // response body is not null
                                       
        })   

    });


})