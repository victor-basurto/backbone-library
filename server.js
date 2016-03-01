
var app, port,
	application_root = __dirname,
	express = require( 'express' ),
	bodyParser = require( 'body-parser' ),
	path = require( 'path' ),
	mongoose = require( 'mongoose' );

// create server
app = express();

// view engine setup
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }));

app.use( express.static( path.join( application_root, 'app') ) );


/**
 * Connect to DB
 */
mongoose.connect( 'mongodb://localhost/library_database' );

/**
 * Keywords Schema
 */
var Keywords = new mongoose.Schema({
	keyword: String
});


/**
 * Book Schema
 */
var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date,
	keywords: [ Keywords ]	// added as a subschema
});

/**
 * Models
 */
var BookModel = mongoose.model( 'Book', Book );

// routes
app.get( '/api', function( req, res ) {
	res.send( 'Library API is running' );
});

app.get( '/api/books', function( req, res ) {
	return BookModel.find( function( err, books ) {
		if ( err ) {
			console.log( err );
		} else {
			res.send( books );
		}
	});
});

/**
 * Insert a New Book
 */
app.post( '/api/books', function( req, res ) {
	var book = new BookModel({
		title: req.body.title,
		author: req.body.author,
		releaseDate: req.body.releaseDate,
		keywords: req.body.keywords 
	});
	return book.save( function( err ) {
		if ( err ) {
			console.log( err );
		} else {
			console.log( 'created' );
			return res.send( book );
		}
	});
});

/**
 * Get a Single Book by ID
 */
app.get( '/api/books/:id', function( req, res ) {
	return BookModel.findById( req.params.id, function( err, book ) {
		if ( err ) {
			console.log( err );
		} else {
			return res.send( book );
		}
	})
});

/**
 * Update a Book
 */
app.put( '/api/books/:id', function( req, res ) {
	console.log( 'updating book: ' + req.body.title );
	return BookModel.findById( req.params.id, function( err, book ) {
		book.title = req.body.title;
		book.author = req.body.author;
		book.releaseDate = req.body.releaseDate;
		book.keywords = req.body.keywords;

		return book.save( function( err ) {
			if ( err ) {
				console.log( err );
			} else {
				console.log( 'book updated' );
				return res.send( book );
			}
		});
	});
});

/**
 * Delete a Book
 */
app.delete( '/api/books/:id', function( req, res ) {
	console.log( 'deleting a book' );
	return BookModel.findById( req.params.id, function( err, book ) {
		return book.remove( function( err ) {
			if ( err ) {
				console.log( err );
			} else {
				console.log( 'book removed' );
				return res.send( '' );
			}
		});
	});
});




// error handlers
app.use(function(req, res) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
	app.use(function( err, req, res, next ) {
		res.status( err.status || 500 );
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function( err, req, res, next ) {
	res.status( err.status || 500 );
	res.render('error', {
		message: err.message,
		error: {}
	});
});

// listen on port
port = 4711;

app.listen( port, function() {
	console.log( 'listening on port %d in %s mode.', port, app.settings.env );
});