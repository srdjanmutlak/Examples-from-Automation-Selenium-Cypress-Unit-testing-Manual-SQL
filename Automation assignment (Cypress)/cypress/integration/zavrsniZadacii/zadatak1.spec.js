/**
 * 1. Testirati registrovanje firme:

 */

describe('Dodavanje date firme', () => {

    beforeEach(() => {
        cy.login('admin@gmail.com', 'Bar5slova');
        cy.contains('Firme').click()
    })

    it('pozitivan test na kom dodajemo datu firmu', () => {

        cy.addFirma('firma1@gmail.com', 'Bar5slova', 'Firma 1', 'Novi Sad', 'Laze Nancica', '36', '1122334455')

        cy.get("button[type='submit']").click()           //zakomentarisano u suportu zbog negativnih testova

        cy.get('.toast-message')
            .should('contain', 'Uspesno ste registrovali firmu')      //hvatamo success poruku

        cy.contains('Pregled').click()    //idemo na pregled firmi

        cy.get('#filter')   //u polje pretraga unosime email
            .type('firma1@gmail.com')

        cy.get('.row > .btn').click()       //klik na dugme za potvrdu pretrage

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'firma1@gmail.com')     //proveravamo da li nam tabela sadrzi dati email

    })

    it('dodajemo vec postojecu firmu', () => {

        cy.addFirma('firma1@gmail.com', 'Bar5slova', 'Firma 1', 'Novi Sad', 'Laze Nancica', '36', '1122334455')

        cy.get("button[type='submit']").click()

        cy.get('.toast-message')
            .should('contain', 'E-mail adresa: firma1@gmail.com je zauzeta!')
    })

    it('Testiramo input polje za email: Neispravan email', () => {

        cy.get('#email')
            .clear()
            .type('aaaaaa')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a')        //samo sa @

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a.')       //sa tackom

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a.a')      //sa jednim karakterom posle tacke

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna email adresa!')
        //-------------------------------------------------------------------------------
        cy.get('#email')
            .clear()
            .type('a@a.aa')      //sa dva karaktera posle tacke i ovo bi trebalo da prodje

        cy.get('.invalid-feedback')
            .should('not.be.exist')
    })

    it('Testiramo input polje za lozinku: Neispravna lozinka', () => {

        cy.get('#lozinka')
            .clear()
            .type('aaaaaaa')     //samo mala slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('AAAAAAA')        //samo velika slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('1111111')       //samo brojevi

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('aaaa111')      //bez velikog slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('AAAA111')      //bez malih slova

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
        //-------------------------------------------------------------------------------
        cy.get('#lozinka')
            .clear()
            .type('aaaaAAA')      //bez  BROJEVA

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')
    })

    it('space-ovi na input poljima za naziv, mesto i ulicu', () => {

        cy.addFirma('sud@gmail.com', 'Bar5slova', ' ', ' ', ' ', '36', '1122334455')  //na tex polja saljemo samo jedan space

        //ovo ce pasti jer u aplikaciji postoji bag jer space karakteri ne bi trebalo da prodju, a prolaze
        cy.get("button[type='submit']")
            .should('be.disabled')
    })

    it('Granicne vrednosti za lozinku: 5 karaktera', () => {

        cy.addFirma('pet@gmail.com', 'Bar6s', 'aaaaa', 'Novi Sad', 'Bulevar Oslobodjenja', '10', '1122334455')

        cy.get('.invalid-feedback')
            .should('contain', 'Neispravna lozinka!')

        cy.get("button[type='submit']")
            .should('be.disabled')

    })

    it('Granicne vrednosti za lozinku: 6 karaktera', () => {

        cy.addFirma('sest@gmail.com', 'Bar6sl', 'aaaaaaa', 'Novi Sad', 'Bulevar Oslobodjenja', '9', '1122334455')

        cy.get("button[type='submit']")
            .click()

        cy.get('.toast-message')
            .should('contain', 'Uspesno ste registrovali firmu')      //hvatamo success poruku

        cy.contains('Pregled').click()    //idemo na pregled firmi

        cy.get('#filter')   //u polje pretraga unosime email
            .type('sest@gmail.com')


        cy.get('.row > .btn').click()       //klik na dugme za potvrdu pretrage

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'sest@gmail.com')
    })

    it('Granicne vrednosti za lozinku: 7 karaktera', () => {

        cy.addFirma('sedam@gmail.com', 'Bar6slo', 'aaaaaaa', 'Novi Sad', 'Bulevar Oslobodjenja', '9', '1122334455')

        cy.get("button[type='submit']")
            .click()

        cy.get('.toast-message')
            .should('contain', 'Uspesno ste registrovali firmu')      //hvatamo success poruku

        cy.contains('Pregled').click()    //idemo na pregled firmi

        cy.get('#filter')   //u polje pretraga unosime email
            .type('sedam@gmail.com')


        cy.get('.row > .btn').click()       //klik na dugme za potvrdu pretrage

        cy.get('table')
            .find('tbody>tr')
            .should('contain', 'sedam@gmail.com')
    })

    it('Prazna polja u svim inputima', () => {

        cy.get('#email')
            .clear()

        cy.get('#lozinka')
            .clear()

        cy.get('#naziv')
            .clear()

        cy.get('#mesto')
            .clear()

        cy.get('#ulica')
            .clear()

        cy.get('#broj')
            .clear()

        cy.get('#brojTelefona')
            .clear()

        cy.get('.invalid-feedback')
            .should('contain', 'Ovo polje ne sme biti prazno!')

        cy.get("button[type='submit']")
            .should('be.disabled')
    })

    it('Pokusamo uneti nesto sto nije broj u polja za broj', () => {

        cy.get('#broj')
            .clear()
            .type('dva')
            .should('be.empty')         //unsoimo string dva, ali polje ostaje prazno

        cy.get('#brojTelefona')
            .clear()
            .type('dva')
            .should('be.empty')

    })

    after(() => {
        cy.contains('Izlogujte se').click()      //klik na izlogovati se

        cy.get('.loginForm')
            .should('contain', 'Logovanje') //provera da smo ipak na stranici za logovanje

        cy.url()
            .should('include', '/logovanje')    //provera da li url sadrzi logovanje
    })
})

