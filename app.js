
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 7373);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/hongyi-contact', routes.list);
app.get('/hongyi-contact/new', routes.showadd);
app.post('/hongyi-contact/new', routes.add);
app.get('/hongyi-contact/item/:id', routes.item);
app.get('/hongyi-contact/edit/:id', routes.edit);
app.post('/hongyi-contact/edit/:id', routes.update);
app.get('/hongyi-contact/delete/:id', routes.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
