beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {


    it('User can use only same both first and validation passwords', () => {
        // Fill in all mandatory fields
        cy.get('#username').type('Andrejs_Ja')
        cy.get('#email').type('fixspur@mail.com')
        cy.get('[data-cy="name"]').type('Andrejs')
        cy.get('#lastName').type('Jarmolovics')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('qwerty123');
        cy.get('[name="confirm"]').type('DifferentQwerty123')  // Type confirmation password which is different from the first password

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that error message is visible
        cy.get('#password_error_message').should('have.css', 'display', 'none')

    })



    it('User can submit form with all fields added', () => {

        cy.get('#username').type('Andrejs_Ja')
        cy.get('#email').type('fixspur@mail.com')
        cy.get('[data-cy="name"]').type('Andrejs')
        cy.get('#lastName').type('Jarmolovics')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#htmlFavLanguage[value="HTML"]').click()
        cy.get('#vehicle2[value="Car"]').click()
        cy.get('#cars').select('Audi')
        cy.get('#animal').select('Horse')
        cy.get('input[name="password"]').type('qwerty123')
        cy.get('[name="confirm"]').type('qwerty123')
        // in order to activate submit button, user has to click somewhere outside of the input fields
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain', " User successfully submitted registration")
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
    })
    it('User can submit form with valid data and only mandatory fields added', () => {

        cy.get('#username').type('Andrejs_Ja')
        cy.get('#email').type('fixspur@mail.com')
        cy.get('[data-cy="name"]').type('Andrejs')
        cy.get('#lastName').type('Jarmolovics')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('qwerty123')
        cy.get('[name="confirm"]').type('qwerty123')
        // in order to activate submit button, user has to click somewhere outside of the input fields
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message
        // example, how to use function
        inputValidData('Andrejs_Ja')
    })
    it('User can not submit form without username', () => {
        cy.get('#username').clear()
        cy.get('#email').type('fixspur@mail.com')
        cy.get('[data-cy="name"]').type('Andrejs')
        cy.get('#lastName').type('Jarmolovics')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#cars').select('Audi')
        cy.get('#animal').select('Snake')
        cy.get('input[name="password"]').type('qwerty124')
        cy.get('[name="confirm"]').type('qwerty124')
        // in order to activate submit button, user has to click somewhere outside of the input fields
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('be.not.visible')
    })
    it('User can not submit form without email', () => {
        inputValidData('Andrejs_Ja', ' ', 'Andrejs', 'Jarmolovics', '555666777', 'qwerty123', 'qwerty123')
        cy.get('#username').type('Andrejs_Ja')
        cy.get('#email').clear()
        cy.get('[data-cy="name"]').type('Andrejs')
        cy.get('#lastName').type('Jarmolovics')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#cars').select('Audi')
        cy.get('#animal').select('Horse')
        cy.get('input[name="password"]').type('qwerty123')
        cy.get('[name="confirm"]').type('qwerty123')
        // in order to activate submit button, user has to click somewhere outside of the input fields
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('be.not.visible')
    })
    // Add at least 1 test for checking some mandatory field's absence
    it('User can not submit form without lastname', () => {
        inputValidData('Andrejs_Ja ', 'fixspur@gmail.com', 'Andrejs', ' ', '555666777', 'qwerty123', 'qwerty123')
        cy.get('#username').type('Andrejs_Ja')
        cy.get('#email').type('fixspur@gmail.com')
        cy.get('[data-cy="name"]').type('Andrejs')
        cy.get('#lastName').clear()
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#cars').select('Audi')
        cy.get('#animal').select('Horse')
        cy.get('input[name="password"]').type('qwerty123')
        cy.get('[name="confirm"]').type('qwerty123')
        // in order to activate submit button, user has to click somewhere outside of the input fields
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('be.not.visible')
    })
    /*
    Assignement 5: create more visual tests
    */
    describe('Section 2: Visual tests', () => {
        it('Check that logo is correct and has correct size', () => {
            cy.log('Will check logo source and size')
            cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
            // get element and check its parameter height, to less than 178 and greater than 100
            cy.get('img').invoke('height').should('be.lessThan', 178)
                .and('be.greaterThan', 100)
        })
    })
    it('My test for second picture', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
    // Create similar test for checking the second link 
    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')
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
    // Create test similar to previous one verifying check boxes
    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })
    // Create test similar to previous one
})
function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('fixspur@gmail.com')
    cy.get('[data-cy="name"]').type('Andrejs')
    cy.get('#lastName').type('Jarmolovics')
    cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('qwerty123')
    cy.get('#confirm').type('qwerty123')
    cy.get('h2').contains('Password').click()
}
