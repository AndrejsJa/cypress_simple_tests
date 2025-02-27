beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

describe('Visual tests for registration form 3', () => {

    it('Check that CH logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-testid="picture"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('[data-testid="picture"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('User can submit form with all fields filled', () => {
        cy.get('#name').clear().type('Andrejs')
        cy.get('input[type="email"]').type('fixspur@gmail.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('input[type="date"]').eq(0).click().type('1984-01-01')
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
        cy.get('input[type="date"]').eq(1).click().type('1984-01-01')
        cy.get('input[type="checkbox"]').eq(0).click()
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).click()
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')
        cy.get('input[type="submit"]').eq(1).should('be.enabled')
        cy.get('input[type="submit"]').eq(1).click()
        cy.get('h1').should('contain', "Submission received")
    })

    it('Country dropdown is correct', () => {
        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').eq(0).should('have.text', '')
        const selectListOptions = ['', 'Spain', 'Estonia', 'Austria']
        cy.get('#country option').each(($el, index) =>
            cy.wrap($el).should('have.text', selectListOptions[index])
        )
    })

    it('City dropdown is correct for Spain', () => {
        cy.get('#country').select(1)
        cy.get('#city').children().should('have.length', 5)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        const selectListOptions = ['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo']
        cy.get('#city option').each(($el, index) =>
            cy.wrap($el).should('have.text', selectListOptions[index])
        )
    })

    it('City dropdown is correct for Estonia', () => {
        cy.get('#country').select(2)
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        const selectListOptions = ['', 'Tallinn', 'Haapsalu', 'Tartu']
        cy.get('#city option').each(($el, index) =>
            cy.wrap($el).should('have.text', selectListOptions[index])
        )
    })
    it('City dropdown is correct for Austria', () => {
        cy.get('#country').select(3)
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        const selectListOptions = ['', 'Vienna', 'Salzburg', 'Innsbruck']
        cy.get('#city option').each(($el, index) =>
            cy.wrap($el).should('have.text', selectListOptions[index])
        )
    })
    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')
        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })
    it('Check that checkboxes work correctly', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[name="email"]').type('fixspur@gmail.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.disabled')
        cy.get('[type="checkbox"]').eq(0).check()
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.enabled')
        cy.get('[type="checkbox"]').eq(0).uncheck()
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.disabled')
        cy.get('[type="checkbox"]').eq(1).check()
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.disabled')
        cy.get('[type="checkbox"]').eq(0).check()
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.enabled')
    })
    it('Check that link works correctly', () => {
        // Array of found elements with given selector has 4 elements in total
        //cy.get('button').should('have.attr', 'href').should('include', 'cookiePolicy')
        cy.get('button').should('have.attr', 'href').should('include', 'cookiePolicy');
    });



    it('Accepts Privacy and Cookie Policies', () => {
        // Check the privacy policy checkbox
        cy.get('#privacy-policy-checkbox').check();

        // Check the cookie policy checkbox
        cy.get('#cookie-policy-checkbox').check();
        
        // Add assertions to verify that the checkboxes are checked
        cy.get('#privacy-policy-checkbox').should('be.checked');
        cy.get('#cookie-policy-checkbox').should('be.checked');
    });




})
