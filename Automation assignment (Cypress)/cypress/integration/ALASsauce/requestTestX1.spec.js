
describe('Make an HTTP requestX', () => {

    it.only('Admin can create a new user', () => {


        cy.request({                                                                
            method: 'POST',                                                    
            url:  'https://gorest.co.in/public/v2/users',      
            headers: {                                                          
                authorization: "Bearer"+' 5581d895cb3e59d293a5c65443eff9882b0ca999a905cdbe233a2fa2ba0f9d84',
            },      //token from gorest.co
            body: {
                name:"BabyBlue",
                email:"BabyBlue@gmail.com",
                gender:"female",
                status:"active"
              }
        }).then((response) => {     
            expect(response.status).to.eq(201) 
            expect(response.body).to.have.property('name', "BabyBlue") 
            expect(response.body).to.have.property('email', "BabyBlue@gmail.com") 
            expect(response.body).to.have.property('gender', "female") 
            expect(response.body).to.have.property('status', "active") 
            cy.log(JSON.stringify(response.body))                
        })
         
        //We read an ID from log, then change it.only to it.skip 
    });

    it('Admin can get a new user', () => {


        cy.request({                                                                
            method: 'GET',                                                    
            url:  'https://gorest.co.in/public/v2/users/4005',   //We enter an ID at the end of the url (in my case it is 4005)  
            headers: {                                                          
                authorization: "Bearer"+' 5581d895cb3e59d293a5c65443eff9882b0ca999a905cdbe233a2fa2ba0f9d84',
            },
            body: {
                name:"BabyBlue" 

              }
        }).then((response) => {     
            expect(response.status).to.eq(200) 
            expect(response.body).to.have.property('name', "BabyBlue") 
            expect(response.body).to.have.property('email', "BabyBlue@gmail.com") 
            expect(response.body).to.have.property('gender', "female") 
            expect(response.body).to.have.property('status', "active") 
                                       
        })                
               //We check if we got the correct user in response

    });

    it('Admin can update and delete new user', () => {


        cy.request({                                                                
            method: 'PUT',                                                    
            url:  'https://gorest.co.in/public/v2/users/4005',      //We enter an ID at the end of the url (in my case it is 4005)
            headers: {                                                          
                authorization: "Bearer"+' 5581d895cb3e59d293a5c65443eff9882b0ca999a905cdbe233a2fa2ba0f9d84',
            },
            body: {
                name:"Baby FaceXX", //We change a name of the user

              }
        }).then((response) => {     
            expect(response.status).to.eq(200) 
            expect(response.body).to.have.property('name', "Baby FaceXX") 
            expect(response.body).to.have.property('email', "BabyBlue@gmail.com") 
            expect(response.body).to.have.property('gender', "female") 
            expect(response.body).to.have.property('status', "active") 
                                       
        })  //We check if we got the correct response
        
        cy.request({                                                                
            method: 'DELETE',                                                    
            url:  'https://gorest.co.in/public/v2/users/4005',      //We enter an ID at the end of the url (in my case it is 4005)
            headers: {                                                          
                authorization: "Bearer"+' 5581d895cb3e59d293a5c65443eff9882b0ca999a905cdbe233a2fa2ba0f9d84',
            },
            body: {
                name:"Baby FaceXX",

              }
        }).then((response) => {     
            expect(response.status).to.eq(204) 
                                       
        }) //We delete the user
               

    });





})