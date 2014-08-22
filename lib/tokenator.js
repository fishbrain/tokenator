/*    
*	tokenator
*	Limits access to APIs based on a token
*
*/
module.exports = function(tokens, header){
  var header = header || 'authorization';
  var tokens = tokens || false;
  return function(req, res, next){
    var token = req.headers[header] || false;
    if (!token) { 
      res.writeHead(401, {  'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ errors: 'An API token is required.'}));
    }
    else if (tokens.indexOf(token.replace(/^token /, '')) === -1) {
      res.writeHead(401, {  'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ errors: 'Your API token is invalid.'}));
    }
    else {
      req.token = token;
      next();
    } 
  } 
};
