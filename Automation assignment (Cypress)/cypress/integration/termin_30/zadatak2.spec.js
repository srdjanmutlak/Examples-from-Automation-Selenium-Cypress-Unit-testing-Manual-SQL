describe('Make an HTTP request', () => {
    beforeEach(() => {
        cy.loginRequest('admin@gmail.com', 'Bar5slova')     // Prijava na sistem preko cy.request u okviru beforeEach, jer se stanje između testova briše
    });

    it('Admin can delete tenant from the flat', () => {
        cy.deleteTenant(1, 3);                              // Brisanje stanara sa id: 3 iz stana sa brojem: 1 preko cy.request

        // Ovde možemo da ubacimo pretpostavku da obrisani stanar više nije u tabeli  
    });
})
