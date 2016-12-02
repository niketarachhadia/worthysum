var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./build/server');

var should = chai.should();
var app = server.app;
console.log('DEBUG server '+JSON.stringify(server));
for(key in Object.keys(server)){
	console.log('In server obj key: '+key+' value:'+server[key]);
}
console.log('DEBUG app '+app);
chai.use(chaiHttp);

describe('Authentication', function() {

    it('should login user and retrieve sub-documents',function(done){
	chai.request(app)
	.post('/login')
	.send({'username':'dfg@dfg.com','password':'dfg'})
	.end(function(err,res){
		   should.equal(err, null);
		   res.should.have.status(200);
		   res.should.be.json;
		   console.log('DEBUG res '+res);
		   res.body.should.be.a('object');
		   res.body.firstname.should.be.a('dfg');
		   res.body.lastname.should.be.a('dfg');
		   done();					
		});
    });

  });
	