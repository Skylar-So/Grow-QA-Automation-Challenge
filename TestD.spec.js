describe('goGrow', () => {
  beforeEach(() => {
    cy.visit('https://app.gogrow.com/dashboard/98743/')
    cy.get('.STATIC-logIn-email').type('soszeming95@gmail.com')
    cy.get('.STATIC-logIn-password').type('Hongkong1234!')
    cy.get('.sign-in').click()
    })


  it('Test D: Verify Dashboards', () => {
    cy.intercept('GET', '**/dashboard/*').as('getDashboard')
     //make sire it loads
     cy.wait('@getDashboard').its('response.statusCode').should('eq', 200)
     //and we are in the right website
     cy.url().should('include', 'gogrow')

     //go in to setting
     cy.get('.settingsMenu---settingsIcon---3Uq6F > svg').click()
     //go in to dashboard
     cy.get('.settingsManager---settingsManager---1fX5z').contains('Dashboards').click()
     // we are in dashboard
     cy.get('.dashboards---container---1jd-N').contains('Dashboards')

     // check it should return the metric
     cy.request('GET', 'https://app.gogrow.com/api/account/dashboards').as('getAccount')
     cy.get('@getAccount').should((response) => {
     console.log(response)
       expect(response.status).to.equal(200)
       //this is kinda hardcoded but if we just wanna make sure it return the right amount of dashboards we
       // could just add a fixture file to mock the data.
       expect(response.body.data).to.have.length(2)
       expect(response.body.data.[0].name).contains('Dashboard for Sales')
       expect(response).to.have.property('headers')
       expect(response).to.have.property('duration')
     })

  })

})