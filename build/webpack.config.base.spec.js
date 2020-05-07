const { expect } = require('chai');
const { config } = require('./webpack.config.base');

describe('webpack.base.js test case', function () {
    it('entry', function () {
        expect(Object.keys(config.entry)).to.have.lengthOf.least(2);
    });
});
