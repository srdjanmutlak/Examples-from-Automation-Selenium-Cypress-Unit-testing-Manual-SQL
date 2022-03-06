describe('API POST PUT  DELETE chain requset,response assertions', () => {
    let accessToken = '5581d895cb3e59d293a5c65443eff9882b0ca999a905cdbe233a2fa2ba0f9d84'
  
    let randomText = ""
    let testEmail = ""
    var pattern = "abcdefghijklmnopqrstuvwxyz"
    for (var i = 0; i < 10; i++)
    randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
    testEmail = randomText + '@haha.com'
  
  it('POST PUT DELETE', () => {
    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public/v2/users',
        headers:{
            'authorization':'Bearer '+ accessToken
        },
        body:{
              "name": "test user40",
              "email": testEmail,
              "gender": "male",
              "status": "active"
          }

    }).then(res=>{
        expect(res.status).to.eq(201)
        expect(res.body).has.property('name','test user40')
        expect(res.body).has.property('email',testEmail)
        expect(res.body).has.property('gender','male')
        expect(res.body).has.property('status','active')
  }).then((res)=>{
        const userId = res.body.id 
        console.log("User ID is : "+userId)

        cy.request({
            method: 'PUT',
            url: 'https://gorest.co.in/public/v2/users/'+userId,
            headers:{
                authorization: 'Bearer '+ accessToken
            },
            body:{
                "name": "test user50",
                //"email": testEmail,
                //"gender": "male",
                "status": "inactive"
            }

        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body).has.property('name','test user50')
            expect(res.body).has.property('email',testEmail)
            expect(res.body).has.property('gender','male')
            expect(res.body).has.property('status','inactive')
        })

        cy.request({
            method: 'DELETE',
            url: 'https://gorest.co.in/public/v2/users/'+userId,
            headers:{
                authorization: 'Bearer '+ accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(204)
        })
  })
})
})
        