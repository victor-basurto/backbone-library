var app = app || {};

app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer col-sm-12',

	events: {
		'click .delete': 'deleteBook'
	},

	render: function() {
		var template = $( '#bookTemplate' ).html();
		var rendered =  Mustache.render(template, this.model.attributes);
		this.$el.html( rendered );
		return this;
	},

	deleteBook: function() {
		// delete model
		this.model.destroy();

		// delete view
		this.remove();
	}
});