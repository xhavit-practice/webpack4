const path = require('path');
const { expect } = require('chai');
const glob = require('glob');

const dirRoot = path.resolve(__dirname, '../..');

describe('Checking bundled files', () => {
    it('Should generate html files', function () {
        const files = glob.sync('dist/{index,search}.html', { cwd: dirRoot });
        expect(files).to.have.lengthOf(2);
    });

    it('Should generate js files', function () {
        const files = glob.sync('dist/{~runtime,~vendor,index,search}*.js', {
            cwd: dirRoot,
        });
        expect(files).to.have.lengthOf.least(4);
    });

    it('Should generate css files', function () {
        const files = glob.sync('dist/*.css', { cwd: dirRoot });
        expect(files).to.have.lengthOf.least(1);
    });
});
