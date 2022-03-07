import {Common} from "../../Scenario/common";


const token = "5581d895cb3e59d293a5c65443eff9882b0ca999a905cdbe233a2fa2ba0f9d84"

describe("TestSuite01", () => {
    it('Scenario 01', function () {
        cy.request({
            method: "GET",
            url: "https://gorest.co.in/public/v2/users/",
        }).then(response => {
            Common().assert().checkEqual(response.status, 200)
            Common().assert().haveLength(response.body, 20)
        });
    });

    it('Scenario 02', function () {
        let date = new Date()
        let mail = `test${date.getMilliseconds()}@mail.com`

        cy.request({
            headers: {
                "Authorization": `Bearer ${token}`
            },

            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            body: {
                "name": `Jhon Jones`,
                "email": mail,
                "gender": "male",
                "status": "active"
            },
        }).then(response => {
            // expect(response.status).to.be.eq(201)
            Common().assert().checkEqual(response.status, 201)

            let id = response.body.id
            let mail = response.body.email
            let name = response.body.name
            let gender = response.body.gender
            let status = response.body.status

            cy.request({
                headers: {
                    "Authorization": `Bearer ${ token }`
                },

                method: "GET",
                url: `https://gorest.co.in/public/v2/users/${ id }`

            }).then(assert => {
                Common().assert().checkEqual(assert.status, 200)
                Common().assert().checkEqual(assert.body.name, name)
                Common().assert().checkEqual(assert.body.email, mail)
                Common().assert().checkEqual(assert.body.gender, gender)
                Common().assert().checkEqual(assert.body.status, status)


                cy.request({
                    headers: {
                        "Authorization": `Bearer ${ token }`
                    },

                    method: "DELETE",
                    url: `https://gorest.co.in/public/v2/users/${ id }`
                }).then(response => {
                    // expect(response.status).to.be.eq(204)
                    Common().assert().checkEqual(response.status, 204)
                })
            });
        });
    });

    it('Scenario 03', function () {
        cy.request({
            headers: {
                "Authorization": `Bearer ${ token }`
            },

            method: "POST",
            url: `https://gorest.co.in/public/v2/users`,
            body: {
                "name": "Test",
                "email": "test46789@mail.com",
                "gender": "male",
                "status": "active"
            }
        }).then(response => {
            // expect(response.status).to.be.eq(201)
            Common().assert().checkEqual(response.status, 201)

            cy.request({
                headers: {
                    "Authorization": `Bearer ${ token }`
                },

                method: "PATCH",
                body: {
                    "name": "NewTest",
                    "email": "test46789@mail.com",
                    "status": "active"
                },
                url: `https://gorest.co.in/public/v2/users/${ response.body.id }`
            }).then(response => {
                // expect(response.status).to.be.eq(200)
                // expect(response.body.name).to.be.eq("NewTest")
                Common().assert().checkEqual(response.status, 200)
                Common().assert().checkEqual(response.body.name, "NewTest")

                cy.request({
                    headers: {
                        "Authorization": `Bearer ${ token }`
                    },

                    method: "DELETE",
                    url: `https://gorest.co.in/public/v2/users/${ response.body.id }`
                }).then(response => {
                    Common().assert().checkEqual(response.status, 204)
                })
            })
        })
    });

    it('Scenario 04', function () {
        cy.request({
            headers: {
                "Authorization": `Bearer ${ token }`
            },

            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            body: {
                "name": "Markeloff",
                "gender": "male",
                "email": "mark.ell@mail.com",
                "status": "active"
            }
        }).then(response => {
            // expect(response.status).to.be.eq(201)
            Common().assert().checkEqual(response.status, 201)

            cy.request({
                headers: {
                    "Authorization": `Bearer ${ token }`
                },

                method: "PATCH",
                url: `https://gorest.co.in/public/v2/users/${ response.body.id }`,
                body: {
                    "name": "Markeloff",
                    "gender": "male",
                    "email": "mark.ell@mail.com",
                    "status": "inactive"
                }
            }).then(response => {
                // expect(response.status).to.be.eq(200)
                // expect(response.body.status).to.be.eq("inactive")
                Common().assert().checkEqual(response.status, 200)
                Common().assert().checkEqual(response.body.status, "inactive")

                cy.request({
                    headers: {
                        "Authorization": `Bearer ${ token }`
                    },

                    method: "DELETE",
                    url: `https://gorest.co.in/public/v2/users/${ response.body.id }`
                }).then(response => {
                    // expect(response.status).to.be.eq(204)
                    Common().assert().checkEqual(response.status, 204)
                })
            })
        })
    });

    it('Scenario 05', function () {
        let date = new Date()
        let mail = `test${date.getMilliseconds()}@mail.bin`

        cy.request({
            headers: {
                "Authorization": `Bearer ${ token }`
            },

            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            body: {
                "name": "Jan Duda",
                "gender": "male",
                "email": mail,
                "status": "active"
            }
        }).then(response => {
            // expect(response.status).to.be.eq(201)
            Common().assert().checkEqual(response.status, 201)

            cy.request({
                headers: {
                    "Authorization": `Bearer ${token}`
                },

                method: "PUT",
                url: `https://gorest.co.in/public/v2/users/${response.body.id}`,
                body: {
                    "name": "Januzay Duda",
                    "gender": "female",
                    "email": "janu.du@mail.com",
                    "status": "inactive"
                }
            }).then(response => {
                // expect(response.status).to.be.eq(200)
                // expect(response.body.status).to.be.eq("inactive")
                // expect(response.body.name).to.be.eq("Januzay Duda")
                Common().assert().checkEqual(response.status, 200)
                Common().assert().checkEqual(response.body.status, "inactive")
                Common().assert().checkEqual(response.body.name, "Januzay Duda")

                cy.request({
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },

                    method: "DELETE",
                    url: `https://gorest.co.in/public/v2/users/${response.body.id}`,
                }).then(response => {
                    // expect(response.status).to.be.eq(204)
                    Common().assert().checkEqual(response.status, 204)
                })
            })
        })
    });

    it('Scenario 06', function () {
        cy.request({
            headers: {
                "Authorization": `Bearer ${ token + 1}`
            },
            failOnStatusCode: false,
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            body: {
                "name": "Jan Duda",
                "gender": "male",
                "email": "janduda.du@mail.com",
                "status": "active"
            }
        }).then(err => {
            // expect(err.status).to.be.eq(401)
            // expect(err.body.message).to.be.eq("Authentication failed")
            Common().assert().checkEqual(err.status, 401)
            Common().assert().checkEqual(err.body.message, "Authentication failed")
        })
    });

    it("Scenario 07", function (){
        cy.request({
            headers: {
                "Authorization": `Bearer ${ token }`
            },
            failOnStatusCode: false,
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            body: {
                "name": "Jan Duda",
                "gender": "male",
                "email": "janduda.dumail.com",
                "status": "active"
            }
        }).then(response => {
            // expect(response.body[0].message).to.be.eq("is invalid")
            // expect(response.status).to.be.eq(422)
            Common().assert().checkEqual(response.body[0].message, "is invalid")
            Common().assert().checkEqual(response.status, 422)
        })
    });

    it("Scenario 08", function (){
       cy.request({
           headers: {
               "Authorization": `Bearer ${ token }`
           },
           failOnStatusCode: false,
           method: "POST",
           url: "https://gorest.co.in/public/v2/users",
           body: {
               "name": "Anish Giri",
               "gender": "male",
               "email": "janduda.du@mail.com",
               "status": "invalid activity"
           }
       }).then(response => {
           // expect(response.status).to.be.eq(422)
           // expect(response.body[0].message).to.be.eq("can't be blank")
           Common().assert().checkEqual(response.status, 422)
           Common().assert().checkEqual(response.body[0].message, "can't be blank")
       })
    });

    it('Scenario 09', function () {
        cy.request({
            headers: {
                "Authorization": `Bearer ${ token }`
            },
            failOnStatusCode: false,
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            body: {
                "name": "Anish Giri",
                "gender": "not_oriented",
                "email": "janduda.du@gmail.com",
                "status": "active"
            }
        }).then(response => {
            Common().assert().checkEqual(response.status, 422)
            Common().assert().checkEqual(response.body[0].message, "can't be blank")
        })
    });

    it('Scenario 10', function () {
        let date = new Date()
        let mail = `test${date.getMilliseconds()}@gmail.rambler`

        cy.request({
            headers: {
                "Authorization": `Bearer ${ token }`
            },
            failOnStatusCode: false,
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            body: {
                name: 'some name',
                gender: 'male',
                email: mail,
                status: 'active'
            },
        }).then(response => {
            // expect(response.status).to.be.eq(201)
            Common().assert().checkEqual(response.status, 201)
        })
    });

    it('Scenario 11', function () {
        cy.request({
            headers: {
                "Content-tip": "invalid/content_type",
            },
            failOnStatusCode: false,
            method: "GET",
            url: "https://gorest.co.in/public/v2/users"
        }).then(response => {
            // expect(response.status).to.be.eq(200)
            Common().assert().checkEqual(response.status, 200)
        })
    });

    it('Scenario 12', function () {
        let date = new Date()
        let mail = `test${date.getMilliseconds()}@gmail.rambler`

        cy.request({
            headers: {
                "Authorization": `Bearer ${ token }`
            },

            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            body: {
                "name": "Alvaro Tevez",
                "email": mail,
                "gender": "male",
                "status": "active"
            }
        }).then(response => {
            // expect(response.status).to.be.eq(201)
            Common().assert().checkEqual(response.status, 201)
            let id = response.body.id

            cy.request({
                failOnStatusCode: false,
                method: "GET",
                url: `https://gorest.co.in/public/v2/users/${id}`
            }).then(response => {
                // expect(response.status).to.be.eq(404)
                // expect(response.body.message).to.be.eq("Resource not found")
                Common().assert().checkEqual(response.status, 404)
                Common().assert().checkEqual(response.body.message, "Resource not found")
            })
        })
    });
});
