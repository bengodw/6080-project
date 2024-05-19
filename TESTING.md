our approach to testing involved picking components in the layer between pages and base components and test these.
These were
- Login
- BookingRequest
- ReviewModal
- AddBedrooms
- IconText
- Rating

We used jestdom and jest expect, react testing library

The methodology was to test that everything rendered properly, checking that inputs were active and that clicking clickables lead to the correct functions being called.

For the second happy path we decided that accepting a booking and leaving a review were key functionalities that were not being tested, so we decided to test them together in one ui test
1. Navigate to my listings page
2. Look at bookings for the listing created in test 1
3. accept booking
4. log out
5. log in with account that made booking
6. click on listing
7. leave review on listing

ui tests are in frontend/cypress/e2e/spec.cy.js
