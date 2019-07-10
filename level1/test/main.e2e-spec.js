
const fs = require('fs');
const { Level1 } = require('../core/Level1'); 
const path = require('path');
const rimraf = require('rimraf');

describe('Level1', () => {
    
    let level = null; 
    const INPUT_DATA = path.resolve(path.join(__dirname, '..', 'data.json'));
    const OUTPUT_DATA = path.join(__dirname, 'output.json');
    const EXPECTED_OUTPUT = path.resolve(path.join(__dirname, '..', 'expected_output.json'));
    
    beforeAll(() => {
        level = new Level1(INPUT_DATA);
    });

    it('should compute shifts revenue for each worker', (done) => {
        const expected = JSON.parse(fs.readFileSync(EXPECTED_OUTPUT));
        
        try {
            level.savePayrollReportTo(OUTPUT_DATA);
            const savedReport = JSON.parse(fs.readFileSync(OUTPUT_DATA));
            savedReport.workers.forEach((workerRow, idx) => {
                const expectedWorkerRow = expected.workers[idx];
                expect(workerRow).toEqual(expectedWorkerRow); 
            })
            done();
        }
        catch(e){
            console.log(e.message);
            done(false);
        }
        
        
        
    });

    afterAll(() => {
        level = null;
        rimraf.sync(OUTPUT_DATA);
    })

});