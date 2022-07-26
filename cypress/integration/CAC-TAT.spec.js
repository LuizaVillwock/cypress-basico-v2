/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function () {
    cy.visit('../../src/index.html')
  })

  it('Check the application title', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Fill in the required fields and submit the form', function () {
    const longText = 'Teste, teste, teste, Teste, teste, teste, Teste, teste, teste, Teste, teste, teste, Teste, teste, teste'
    cy.get('#firstName')
      .type('Luiza')
    cy.get('#lastName')
      .type('Villwock')
    cy.get('#email')
      .type('luizacvillwock@gmail.com')
    cy.get('#open-text-area')
      .type(longText, { delay: 0 })
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.success')
      .should('be.visible')
  })

  it('Displays an error message when submitting the form with an email with invalid formatting', function () {
    cy.get('#firstName')
      .type('Luiza')
    cy.get('#lastName')
      .type('Villwock')
    cy.get('#email')
      .type('luiza@gmail,com')
    cy.get('#open-text-area')
      .type('Teste')
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.error')
      .should('be.visible')
  })

  it('Phone field remains empty when filled with non-numeric value', function () {
    cy.get('#phone')
      .type('TESTE LUIZA')
      .should('have.value', '')
  })

  it('Error when phone number becomes mandatory but message is not filled in before form submission', function () {
    cy.get('#firstName')
      .type('Luiza')
    cy.get('#lastName')
      .type('Villwock')
    cy.get('#email')
      .type('luiza@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area')
      .type('Teste')
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.error')
      .should('be.visible')
  })

  it('Fills and clears the first name, last name, email and phone fields', function () {
    cy.get('#firstName')
      .type('Luiza')
      .should('have.value', 'Luiza')
      .clear('')
      .should('have.value', '')
    cy.get('#lastName')
      .type('Villwock')
      .should('have.value', 'Villwock')
      .clear('')
      .should('have.value', '')
    cy.get('#email')
      .type('luizacvillwock@gmail.com')
      .should('have.value', 'luizacvillwock@gmail.com')
      .clear('')
      .should('have.value', '')
    cy.get('#phone')
      .type('12345')
      .should('have.value', '12345')
      .clear('')
      .should('have.value', '')
  })

  it('Displays an error message when submitting the form without filling the required fields', function () {
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.error')
      .should('be.visible')

  })

  it('Submit the form successfully using a custom command', function () {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success')
      .should('be.visible')

  })

  it('Select a YouTube product by its text', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Select a product (Mentoria) by its value (value)', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Select a product (Blog) by its index', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

  })

  it('Mark the type of service Feedback', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')

  })

  it('Tag each type of service', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')

      })
  })

  it('Check both checkboxes, then uncheck the last one', function(){
    cy.get('input[type="checkbox"]')
      .check()  
        .should('be.checked')
          .last()
            .uncheck()
              .should('not.be.checked')
})

  it('Select a file from the fixtures folder', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
        })
})

  it('selects a file simulating a drag-drop', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop' })
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Select a file using a fixture given an alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a')  
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About').should('be.visible')
  })


})