describe('Happy Paws', () => {
    beforeEach(()=>{
        cy.visit('/subscribe')
    })
    it('Visits the Happy Paws subscribe page', () => {
      cy.contains('Basic Subscription')

      cy.contains("Given name").type("Ben")
      cy.contains("Family name").type("Arrow")
      cy.contains("Email").type("ba@uk.com")
    })
    context('Form submission', ()=>{
        it('Adds a new subscription', ()=>{
            cy.server()
            cy.route('POST', 'api/subscribe', {
                given_name: 'Bob',
                family_name: 'Walter',
                email: 'bq@test.com',
            })
            cy.get('#given_name')
            .type("Bob")

            cy.get('#family_name')
            .type("Walter")
            cy.get('#email')
            .type("bq@test.com")
            
            cy.get('button[type="submit"]').click()
        })

        it.only('Shows an error message on a failed submission ', ()=>{
            cy.server()
            cy.route({
                url: 'api/subscribe',
                method: 'POST',
                status: 500,
                response: {}
            })
            cy.get('#given_name')
            .type("Bob")

            cy.get('#family_name')
            .type("Walter")
            cy.get('#email')
            .type("bq@test.com")
            
            cy.get('button[type="submit"]').click()

            cy.get('.error').should("be.visible")
        })
    })
  })