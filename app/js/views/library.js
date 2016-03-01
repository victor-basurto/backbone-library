var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: '#books',

	events: {
		'click #add': 'addBook'
	},

	initialize: function() {
		this.collection = new app.Library();
		this.collection.fetch({ reset: true });
		this.render();

		this.listenTo( this.collection, 'add', this.renderBook );
		this.listenTo( this.collection, 'reset', this.render );
	},

	render: function() {
		this.collection.each(function( book ) {
			this.renderBook( book );
		}, this);
	},

	// render a book by creating a BookView and appending the
    // element it renders to the library's element
	renderBook: function( book ) {
		var bookView = new app.BookView({
			model: book
		});
		this.$el.append( bookView.render().el );
	},

	addBook: function( e ) {
		e.preventDefault();

		var formData = {};

		$( '#addBook div' ).children( 'input' ).each(function (i, el) {
			if ( $( el ).val() != '' ) {
				formData[ el.id ] = $( el ).val();

				if ( el.id === 'keywords' ) {
					formData[ el.id ] = [];
					_.each( $( el ).val().split(' '), function( keyword ) {
						formData[ el.id ].push({ 'keyword': keyword });
					});
				} else if ( el.id === 'releaseDate' ) {
					formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
				} else {
					formData[ el.id ] = $( el ).val();
				}
			}
			// clear input field value
			$( el ).val('');
		});

		this.collection.create( formData );
	}
});




