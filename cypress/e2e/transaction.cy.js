import loginPage from "../support/pageObject/loginPOM"
import cartPage from "../support/pageObject/transactionPOM"

describe('Login ', () => {
    beforeEach(() => {
      
      cy.visit('https://www.saucedemo.com')
      cy.get(loginPage.Username).type('standard_user')
      cy.get(loginPage.psw).type('secret_sauce')
      cy.get(loginPage.btn_login).click()
      cy.url().should('include', 'https://www.saucedemo.com/inventory.html')
        
    })

    it('Transaction Success', () => {
        //memsukan barang ke cart
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('contain.text','Remove')
        
        //verify cart sudah terisi
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible')

        //Masuk ke halaman cart 
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="title"]').should('contain.text','Your Cart')
        cy.get('[data-test="inventory-item-name"]').should('contain.text','Sauce Labs Bike Light')

        //Proses checkout barang
        cy.get(cartPage.Checkout).click()
        cy.get('[data-test="title"]').should('contain.text', 'Checkout: Your Information')
        cy.get(cartPage.First_name).type('Didi')
        cy.get(cartPage.Last_name).type('Maulana')
        cy.get(cartPage.Postal_code).type('6754')
        cy.get(cartPage.Continue).click()

        //Proses Pembayaran
        cy.get('[data-test="title"]').should('contain.text','Checkout: Overview')

        var substring1, substring2, substring3
        var index1, index2, index3

        // get element with id #num-1
        cy.get('[data-test="subtotal-label"]').invoke('text').then(($num1) => {
            cy.log($num1)
            index1 = $num1.indexOf('$')
            if (index1 !== -1) {
                // Extract the substring starting from the character after '$'
                substring1 = $num1.substring(index1 + 1)
                $num1 = parseFloat(substring1)
                cy.log('Extracted substring1: ' + $num1)
            }
        
        // get element id #num2
        cy.get('[data-test="tax-label"]').invoke('text').then(($num2) => {
            cy.log($num2)
            index2 = $num2.indexOf('$')
            if (index2 !== -1) {
                // Extract the substring starting from the character after '$'
                substring2 = $num2.substring(index2 + 1)
                $num2 = parseFloat(substring2)
                cy.log('Extracted substring2: ' + $num2)
            }    
        
        // get element id #num3
        cy.get('[data-test="total-label"]').invoke('text').then(($num3) => {
            cy.log($num3)
            index3 = $num3.indexOf('$')
            if (index3 !== -1) {
                // Extract the substring starting from the character after '$'
                substring3 = $num3.substring(index3 + 1)
                $num3 = parseFloat(substring3)
                cy.log('Extracted substring: ' + substring3)
            }
        
        const sum = parseFloat(($num1 + $num2).toFixed(2));

        // Print the sum to the Cypress Command Log
        cy.log('Extracted substring sum: ' +sum)
        expect(sum).to.equal($num3)
        })
        })
        })
        cy.get(cartPage.Btn_finish).click()
        cy.get(cartPage.Checkout_complate).should('contain.text', 'Thank you for your order!')
        cy.get(cartPage.Backtohome).should('contain.text', 'Back Home').click()
    })

    it('Multiple Transaction', () => {
        //memsukan barang-1 ke cart
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('contain.text','Remove')

        //memsukan barang-2 ke cart
        cy.get(cartPage.Backpack).click()
        cy.get(cartPage.Remove_backpack).should('contain.text','Remove')

        //verify cart sudah terisi
        cy.get('[data-test="shopping-cart-badge"]').should('contain.text', '2')

        //Masuk ke halaman cart    
        cy.get(cartPage.Shopping_cart).click()
        cy.get('[data-test="title"]').should('contain.text','Your Cart')
        cy.get('[data-test="inventory-item-name"]').should('contain.text','Sauce Labs Bike Light')
        cy.get('[data-test="inventory-item-name"]').should('contain.text','Sauce Labs Backpack')

        //Proses checkout barang
        cy.get(cartPage.Checkout).click()
        cy.get('[data-test="title"]').should('contain.text', 'Checkout: Your Information')
        cy.get(cartPage.First_name).type('Andi')
        cy.get(cartPage.Last_name).type('Akbar')
        cy.get(cartPage.Postal_code).type('6754')
        cy.get(cartPage.Continue).click()
        cy.url().should('include', 'https://www.saucedemo.com/checkout-step-two.html')

        //Proses Pembayaran
        cy.get('[data-test="title"]').should('contain.text','Checkout: Overview')

        var substring1, substring2, substring3
        var index1, index2, index3

        // get element with id #num-1
        cy.get('[data-test="subtotal-label"]').invoke('text').then(($num1) => {
            cy.log($num1)
            index1 = $num1.indexOf('$')
            if (index1 !== -1) {
                // Extract the substring starting from the character after '$'
                substring1 = $num1.substring(index1 + 1)
                $num1 = parseFloat(substring1)
                cy.log('Extracted substring1: ' + $num1)
            }
        
        // get element id #num2
        cy.get('[data-test="tax-label"]').invoke('text').then(($num2) => {
            cy.log($num2)
            index2 = $num2.indexOf('$')
            if (index2 !== -1) {
                // Extract the substring starting from the character after '$'
                substring2 = $num2.substring(index2 + 1)
                $num2 = parseFloat(substring2)
                cy.log('Extracted substring2: ' + $num2)
            }    
        
        // get element id #num3
        cy.get('[data-test="total-label"]').invoke('text').then(($num3) => {
            cy.log($num3)
            index3 = $num3.indexOf('$')
            if (index3 !== -1) {
                // Extract the substring starting from the character after '$'
                substring3 = $num3.substring(index3 + 1)
                $num3 = parseFloat(substring3)
                cy.log('Extracted substring: ' + substring3)
            }
        
        const sum = parseFloat(($num1 + $num2).toFixed(2));

        // Print the sum to the Cypress Command Log
        cy.log('Extracted substring sum: ' +sum)
        expect(sum).to.equal($num3)
        })
        })
        })
        cy.get(cartPage.Btn_finish).click()
        cy.get(cartPage.Checkout_complate).should('contain.text', 'Thank you for your order!')
        cy.get(cartPage.Backtohome).should('contain.text', 'Back Home').click()   
    })

    it('Transaction by leaving the information empty', () => {
        //memsukan barang ke cart
        cy.get(cartPage.Backpack).click()
        cy.get(cartPage.Remove_backpack).should('contain.text','Remove')

        //verify cart sudah terisi
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible')

        //Masuk ke halaman cart    
        cy.get(cartPage.Shopping_cart).click()
        cy.get('[data-test="title"]').should('contain.text','Your Cart')
        cy.get('[data-test="inventory-item-name"]').should('contain.text','Sauce Labs Backpack')

        //Proses checkout barang
        cy.get(cartPage.Checkout).click()
        cy.get('[data-test="title"]').should('contain.text', 'Checkout: Your Information')
        cy.get(cartPage.Continue).click()
        cy.get('[data-test="error"]').should('contain.text', 'Error: First Name is required')    
    })

    it('Transaction empty Firts Name', () => {
        //memsukan barang ke cart
        cy.get(cartPage.Onsie).click()
        cy.get(cartPage.Remove_onesie).should('contain.text','Remove')

        //verify cart sudah terisi
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible')

        //Masuk ke halaman cart    
        cy.get(cartPage.Shopping_cart).click()
        cy.get('[data-test="title"]').should('contain.text','Your Cart')
        cy.get('[data-test="inventory-item-name"]').should('contain.text','Sauce Labs Onesie')

       //Proses checkout barang
        cy.get(cartPage.Checkout).click()
        cy.get('[data-test="title"]').should('contain.text', 'Checkout: Your Information')
        cy.get(cartPage.Last_name).type('Akbar')
        cy.get(cartPage.Postal_code).type('6754')
        cy.get(cartPage.Continue).click()
        cy.get('[data-test="error"]').should('contain.text', 'Error: First Name is required')  
    })
    
    it('Transaction empty Last Name', () => {
        //memsukan barang ke cart
        cy.get(cartPage.Onsie).click()
        cy.get(cartPage.Remove_onesie).should('contain.text','Remove')

        //verify cart sudah terisi
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible')

        //Masuk ke halaman cart    
        cy.get(cartPage.Shopping_cart).click()
        cy.get('[data-test="title"]').should('contain.text','Your Cart')
        cy.get('[data-test="inventory-item-name"]').should('contain.text','Sauce Labs Onesie')

       //Proses checkout barang
        cy.get(cartPage.Checkout).click()
        cy.get('[data-test="title"]').should('contain.text', 'Checkout: Your Information')
        cy.get(cartPage.First_name).type('Didi')
        cy.get(cartPage.Postal_code).type('6754')
        cy.get(cartPage.Continue).click()
        cy.get('[data-test="error"]').should('contain.text', 'Error: Last Name is required')
        cy.get('[data-test="error-button"]').click() 
    })

    it('Transaction empty Postal Code', () => {
        //memsukan barang ke cart
        cy.get(cartPage.Onsie).click()
        cy.get(cartPage.Remove_onesie).should('contain.text','Remove')

        //verify cart sudah terisi
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible')

        //Masuk ke halaman cart    
        cy.get(cartPage.Shopping_cart).click()
        cy.get('[data-test="title"]').should('contain.text','Your Cart')
        cy.get('[data-test="inventory-item-name"]').should('contain.text','Sauce Labs Onesie')

       //Proses checkout barang
        cy.get(cartPage.Checkout).click()
        cy.get('[data-test="title"]').should('contain.text', 'Checkout: Your Information')
        cy.get(cartPage.First_name).type('Didi')
        cy.get(cartPage.Last_name).type('Akbar')
        cy.get(cartPage.Continue).click()
        cy.get('[data-test="error"]').should('contain.text', 'Error: Postal Code is required')
        //cy.get('[data-test="error-button"]').click() 
    })

    it.only('Filtering Product', () => {
        cy.get('.product_sort_container').should('have.value', 'az').select('Name (Z to A)')
        cy.get('.product_sort_container').should('have.value', 'za')
        cy.get('[data-test="item-3-title-link"] > [data-test="inventory-item-name"]').should('contain.text', 'Test.allTheThings() T-Shirt (Red)')
          
    })



})