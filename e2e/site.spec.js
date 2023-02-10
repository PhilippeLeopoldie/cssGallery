/// <reference types="cypress" />

describe('the news site', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  describe('html', () => {
    it('should have 1 header and 1 main', () => {
      cy.root().find('header').should('have.length', 1);
      cy.root().find('main').should('have.length', 1);
    });

    it('should have 3 news sections in main', () => {
      cy.get('main').find('section').should('have.length', 3);
    });

    it('should have 12 news articles in main', () => {
      cy.get('main').find('article').should('have.length', 12);
    });

    it('each article should have an image', () => {
      cy.get('article').each(($el, index, $list)  => {
        cy.wrap($el).find('img').should('be.visible');
      });
    });
  });

  describe('visual effects', () => {
    it('buttons have a hover effect', () => {
      cy.get('button').each(($el, index, $list)  => {
        cy.wrap($el).realHover()
        cy.wrap($el).should('not.have.css', 'background-color', 'rgb(255, 255, 255)')
      })
    });
  });

  describe('is responsive', () => {
    describe('mobile - small screen', () => {
      beforeEach(() => {
        cy.viewport(320, 667);
      });

      it('only shows top 1 articles', () => {
        cy.get('article').first().should('be.inViewport');
        cy.get('article').eq(1).should('not.be.inViewport');
        cy.get('article').last().should('not.be.inViewport');
      });

      it('does not have a nav bar', () => {
        cy.get('nav').should('not.be.visible');
      });
    });

    describe('tablet - medium sized screen', () => {
      beforeEach(() => {
        cy.viewport(768,	1024);
      });

      it('shows first 4 articles', () => {
        cy.get('article').each(($el, index, $list)  => {
          if(index <= 3) {
            cy.wrap($el).should('be.inViewport');
          } else {
            cy.wrap($el).should('not.be.inViewport');
          }
        });
        cy.get('article').last().should('not.be.inViewport');
      });

      it('has nav bar', () => {
        cy.get('nav').should('be.visible');
      });
    });

    describe('desktop - large screen', () => {
      beforeEach(() => {
        cy.viewport(1536, 1024);
      });

      it('shows first 8 articles', () => {
        cy.get('article').each(($el, index, $list)  => {
          if(index <= 7) {
            cy.wrap($el).should('be.inViewport');
          } else {
            cy.wrap($el).should('not.be.inViewport');
          }
        });
        cy.get('article').last().should('not.be.inViewport');
      });

      it('has nav bar', () => {
        cy.get('nav').should('be.visible');
      });
    });
  });
});