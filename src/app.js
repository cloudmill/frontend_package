/* src/app.js */

// Styles
import 'Styles/_app.scss';

$(document).ready(() => {
	console.log('Ready!');
	require('Scripts/demo');
});


// load
// $(document).load(() => {});
// load

// scroll
$(window).scroll(() => {
});
// scroll

// mobile sctipts
const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
if (screenWidth <= 767) {
	console.log(screenWidth);
}
// mobile sctipts
