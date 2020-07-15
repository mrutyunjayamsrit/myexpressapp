var expect = require('chai').expect;

describe('Sample Test',function(){
    context(' Adding 1 and 1', function(){
        it('Should return 2', ()=>{
            expect(1+1).to.equal(2);
        });
    });
});