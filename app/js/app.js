var app = app || {};

$(function() {
	// var books = [{
	// 		title: 'Javascript The Good Parts',
	// 		author: 'Douglas Crockford',
	// 		releaseDate: '2008',
	// 		keywords: 'Javascript Programming'
	// 	}, {
	// 		title: 'The Little Book on CoffeeScript',
	// 		author: 'Alex MacCaw',
	// 		releaseDate: '2012',
	// 		keywords: 'CoffeeScript Programming'
	// 	}, {
	// 		title: 'Scala for the Impatient',
	// 		author: 'Cay S. Horstmann',
	// 		releaseDate: '2012',
	// 		keywords: 'Scala Programming'
	// 	}, {
	// 		title: 'American Psycho',
	// 		author: 'Bret Easton Ellis',
	// 		releaseDate: '1991',
	// 		keywords: 'Novel Splatter'
	// 	}, {
	// 		title: 'Eloquent JavaScript',
	// 		author: 'Marijn Haverbeke',
	// 		releaseDate: '2011',
	// 		keywords: 'JavaScript Programming'
	// 	}, {
	// 		title: 'Learning Backbone Basics',
	// 		author: 'Bret Easton Ellis',
	// 		releaseDate: '1991',
	// 		keywords: 'JavaScript Programming'
	// 	}];

	$( '#releaseDate' ).datepicker();
	new app.LibraryView();
});