var app = app || {};

app.Book = Backbone.Model.extend({
	defaults: {
		coverImage: './img/book-cover.png',
		title: 'Backbone Book',
		author: 'Victor Basurto',
		releaseDate: '2015',
		keywords: 'None'
	},

	parse: function( response ) {
		response.id = response._id;
		return response;
	},

	/**
	 * TODO: Fix the date to display it on the UI
	 */
	getDateFormat: function( date ) {
		var date = this.get('releaseDate');
		return $.format.date( new Date( date ), 'MMMM yyyy' );
	}
});