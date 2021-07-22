describe('goGrow', () => {
  beforeEach(() => {
    cy.visit('https://app.gogrow.com/dashboard/98743/')
    cy.get('.STATIC-logIn-email').type('soszeming95@gmail.com')
    cy.get('.STATIC-logIn-password').type('Hongkong1234!')
    cy.get('.sign-in').click()
    })


  it('Test A: Expand Metric', () => {
     cy.intercept('GET', '**/dashboard/*').as('getDashboard')
     //make sire it loads
     cy.wait('@getDashboard').its('response.statusCode').should('eq', 200)
     //and we are in the right website
     cy.url().should('include', 'gogrow')

     //only hover would show the metric menu then click expend
     cy.get('.metricTile---titleBar---icjyQ').trigger('mouseover')
     .children().should('have.class', 'metricMenu---container---1WKRp')
     .get('.metricMenu---expandMetric---zbK7g').click()

     // check it should return the metric
     cy.intercept('GET', '*/metric/*/static').as('getMetric')
     cy.wait('@getMetric')
     cy.get('@getMetric').then(xhr => {
     expect(xhr.response.statusCode).to.equal(200)
     })
     // double check that the dashboard should have the expanded Metric
     cy.get('.dashboard---dashboard---3d1Id').children()
     .should('have.class', 'expandedMetric---dialogWrapper---3jgCR')

     //EXIT the expend metric
     cy.get('.topBar---closeButton---2K74G > .topBar---rightIcon---2GwcE').click()
     //and the expended metric should be gone
     cy.get('.dashboard---dashboard---3d1Id').children()
     .should('not.have.class', 'expandedMetric---dialogWrapper---3jgCR')
  })

})