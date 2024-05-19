import 'cypress-react-selector'
describe('UI Testingfor Airbrb', () => {
  beforeEach(() => {
		cy.visit('localhost:3000');
	});

	it('Happy path!', () => {
    const name = 'sooria'
    const email = 'soorria@email.com';
		const password = 'super secure password';

    // Click register
		cy.get('[data-test-target=ProfileButton]').click();
    cy.get('a').contains('Register').click();

    //register
    cy.get('label').contains('Email').next().children().first().type(email)
    cy.get('label').contains('Name').next().children().first().type(name)
    cy.get('label').contains('Password').next().children().first().type(password)
    cy.get('label').contains('Confirm Password').next().children().first().type(password)
		cy.get('button').contains('Register').click();

    cy.get('h3').then((h3) => {
			expect(h3.text()).to.contain('Welcome to Airbrb!');
		});

    //navigate to my listings and add listing
    cy.get('button').contains('My Listings').click()
    cy.get('h3').then((h3) => {
			expect(h3.text()).to.contain('My Listings');
		});
    cy.get('button').contains('Add a Listing').click()
    cy.get('h2').then((h2) => {
			expect(h2.text()).to.contain('Add a Listing');
		});

    //fill out fields
    cy.get('input').eq(0).focus().type('Russell Street')
    cy.get('input').eq(1).focus().type('Sydney')
    cy.get('input').eq(2).focus().type('New South Wales')
    cy.get('input').eq(3).focus().type('2000')
    cy.get('input').eq(4).focus().type('Australia')
    cy.get('input').eq(5).focus().type('Cozy romantic getaway')
    cy.get('input').eq(6).focus().type('Villa')
    cy.get('input').eq(7).focus().type('250')
    cy.get('input').eq(8).focus().type('2')
    cy.get('[data-test-target=UploadThumbnail]').click()
    cy.get('input[type=file]')
      .invoke('removeAttr', 'hidden')
    cy.get('input[type=file]').selectFile('./public/assets/defaultProfile.png')
    cy.get('label').contains('Amenity 1').next().children().first().type('Laundry')
    //submit
    cy.get('button').contains('Add Listing').click()

    cy.get('h3').then((h3) => {
			expect(h3.text()).to.contain('My Listings');
		});

    //update fields
    cy.get('a').contains('Edit').click()
    cy.get('h2').then((h2) => {
			expect(h2.text()).to.contain('Edit Listing');
		});

    cy.get('label').contains('Title').next().children().first().focus().clear()
    cy.get('label').contains('Title').next().children().first().focus().type('Extra cozy romantic getaway')
    cy.get('input[type=file]')
      .invoke('removeAttr', 'hidden')
    cy.get('input[type=file]').selectFile('./public/assets/defaultHouse.jpg')
    //submit
    cy.get('button').contains('Apply Changes').click()

    cy.get('h3').then((h3) => {
			expect(h3.text()).to.contain('My Listings');
		});

    // Publish then unpublish and then publish again
    cy.get('[data-test-target=PublishButton]').click()
    cy.get('button').last().click()
    cy.get('button').last().click()
    cy.get('[data-test-target=PublishButton]').click()
    cy.get('button').last().click()

    //log out
		cy.get('[data-test-target=ProfileButton]').click();
    cy.get('[role=menu]').last().click();
    cy.get('[data-test-target=ProfileButton]').click();
    cy.get('[role=menu]').last().click();

    // register with other user
    cy.get('input[name="Email"]').focus().type('dog@email.com')
    cy.get('input[name="Name"]').focus().type('dog')
    cy.get('input[name="Password"]').focus().type(password)
    cy.get('input[name="Confirm Password"]').focus().type(password)
    cy.get('button').last().click()

    // click listing
    cy.get('[data-test-target="CardButton"]').click()

    cy.get('h3').then((h3) => {
			expect(h3.text()).to.contain('Extra cozy romantic getaway');
		});
    cy.get('h6').then((h6) => {
			expect(h6.text()).to.contain('Russell Street, Sydney, New South Wales, 2000, Australia');
		});


    // make booking
    cy.get('p').then((p) => {
			expect(p.text()).to.not.contain('pending');
		});
    cy.get('button').last().click();
    cy.get('button').last().click();
    cy.get('body').click(0,0)
    cy.get('p').then((p) => {
			expect(p.text()).to.contain('pending');
		});

    // log out
    cy.get('[data-test-target=ProfileButton]').click();
    cy.get('[role=menu]').last().click();
    cy.get('[data-test-target=ProfileButton]').click();

    // log back in
    cy.get('a').contains('Login').click();
    cy.get('input').first().focus().type(email)
    cy.get('input').last().focus().type(password)
    cy.get('button').last().click()

    cy.get('h3').then((h3) => {
			expect(h3.text()).to.contain('Welcome to Airbrb!');
		});
});

  it('Other path!', () => {
    const name = 'sooria'
    const email = 'soorria@email.com';
		const password = 'super secure password';
    //my listings
    cy.get('button').contains('My Listings').click()
    // bookings
    cy.get('a').contains('Bookings').click()
    cy.get('p').then((p) => {
			expect(p.text()).to.contain('Booking made by dog@email.com');
		});

    // accept booking
    cy.get('button').contains('Accept').click()

    // log out
    cy.get('[data-test-target=ProfileButton]').click();
    cy.get('a').contains('Logout').click();

    // log back in as tenant
    cy.get('[data-test-target=ProfileButton]').click();
    cy.get('a').contains('Login').click();
    cy.get('input').first().focus().type('dog@email.com')
    cy.get('input').last().focus().type(password)
    cy.get('button').last().click()
    // click listing
    cy.get('[data-test-target="CardButton"]').click()
    // make review
    cy.get('button').contains('Leave Review').click()
    cy.get('textarea[placeholder="Review"]').focus().type('wow what an medium stay!')
    cy.get('button').contains('Submit Review').click()
    cy.wait(500)
    cy.get('p').then((p) => {
			expect(p.text()).to.contain('wow what an medium stay!');
		});

	});

})

