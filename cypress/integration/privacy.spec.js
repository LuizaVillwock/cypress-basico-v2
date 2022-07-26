it('teste a pagina de provacidade de forma independente', function(){
    cy.visit('./src/privacy.html')
    cy.contains('Talking About').should('be.visible')
})