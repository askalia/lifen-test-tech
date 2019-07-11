
const fs = require('fs');
const { Level4 } = require('../core/Level4'); 
const path = require('path');
const rimraf = require('rimraf');

describe('Level3', () => {
    
    let level = null; 
    const INPUT_DATA = path.resolve(path.join(__dirname, '..', 'data.json'));
    const OUTPUT_DATA = path.join(__dirname, 'output.json');
    const EXPECTED_OUTPUT = path.resolve(path.join(__dirname, '..', 'expected_output.json'));
    
    beforeAll(() => {
        level = new Level4(INPUT_DATA);
    });

    it('should compute shifts revenue for each worker given his/her status/ weekends/ commission fees', (done) => {
        const expected = JSON.parse(fs.readFileSync(EXPECTED_OUTPUT));
        
        try {
            level.savePayrollReportTo(OUTPUT_DATA);
            const savedReport = JSON.parse(fs.readFileSync(OUTPUT_DATA));
            savedReport.workers.forEach((workerRow, idx) => {
                const expectedWorkerRow = expected.workers[idx];
                expect(workerRow).toEqual(expectedWorkerRow); 
            })
            expect(savedReport.commission).toEqual(expected.commission)
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