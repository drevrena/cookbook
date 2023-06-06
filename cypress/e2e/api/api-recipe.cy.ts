beforeEach(() => {
    cy.visit('http://localhost:3000/')
})

before(() => {
    //Load mock data
    cy.fixture("recipe").then(data => {
        this.recipeData = data
    })
})


describe('Cookbook REST API Test', () => {
    let recipeId: string | null = null

    it('Add Recipe - POST', () => {
        cy.request('POST', '/api/v1/recipes', this.recipeData).as('req');
        cy.get<Cypress.ObjectLike>('@req').then(ans => {
            expect(ans.status).to.eq(200);
            recipeId = ans.body.recipeId
        });
    });

    it('Get all recipes - GET', () => {
        cy.request('api/v1/recipes').as('req');
        cy.get<Cypress.ObjectLike>('@req').then(ans => {
            expect(ans.status).to.eq(200);
            assert.isArray(ans.body, 'Recipes response is populated')
        });
    });
    
    it('Edit Recipe - PUT', () => {
        cy.request('PUT', `api/v1/recipes/${recipeId}`, {...this.recipeData, name: "SomeTestName"}).as('req');
        cy.get<Cypress.ObjectLike>('@req').then(ans => {
            expect(ans.status).to.eq(200);
            expect(ans.body.recipeId).to.eq(recipeId)
        });
    });
    
    it('Get given recipe - GET', () => {
        cy.request(`api/v1/recipes/${recipeId}`).as('req');
        cy.get<Cypress.ObjectLike>('@req').then(ans => {
            expect(ans.status).to.eq(200);
            expect(ans.body.recipe).to.deep.eq({...this.recipeData, name: "SomeTestName"})
        });
    });

 
    it('Delete given Recipe - DELETE', () => {
        cy.request('DELETE', `/api/v1/recipes/${recipeId}`).as('req');
        cy.get<Cypress.ObjectLike>('@req').then(ans => {
            expect(ans.status).to.eq(200);
            expect(ans.body.deletedRecipe).to.eq(recipeId)
        });
    });
 });