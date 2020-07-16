# Tweeter Project
Tweeter is a simple Single Page App (SPA), Twitter clone.

## Project Stack
- HTML, CSS, JS, jQuery and AJAX on the client-side
- Node and Express on the server-side

## Project Features
- new tweets are posted with no delay
- tweets are displayed in reverse chronological order 
- character counter and tweets length validation
- error message if 140 char limit is exceeded or tweet-box blank
- responsive design for an optimized user experience
- animated toggle button to show/hide tweet-box
- fading toggle button appearing when scrolling down to bring the user back up to the top of the page

## Final Product
Desktop view with both toggle buttons shown and tweet-box hidden
!["desktop-view"]([add url of a screnshot])

Error message when tweet length exceeded
!["error-message"]([add url of a screnshot])

Mobile view/responsive design
!["mobile-view"]([add url of a screnshot])

## Getting Started
1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies
- Express
- Node 5.10.x or above
- Body-parser
- Chance
- md5
- Moment

## Dev Dependencies
- Nodemon (or Live-server)