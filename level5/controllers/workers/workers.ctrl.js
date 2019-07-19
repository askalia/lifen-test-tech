const { WorkerRepo, ShiftRepo } = require('../../repositories');

const checkBody = (req) => {
    if (req.body === undefined){
        throw 'bad worker data';
    }
    if (key !== undefined){
        if (req.body[key] === undefined){
            throw `bad worker data : mission ${key}`;
        }    
    }
}
const checkId = (req) => {
    if (req.params.id === undefined){
        throw 'bad id';
    }
}

//Simple version, without validation or sanitation
exports.getAll = async (_, res) => {
    const allWorkers = await WorkerRepo.find();
    res.json(allWorkers);
};

exports.getOne = async (req, res, next) => {
    try {
        checkId(req);
        const worker = await WorkerRepo.findById(req.params.id).exec();
        res.status(200).json(worker);
    }
    catch(error){
        res.send(400).json({ error })
    }    
};

exports.createOne = async (req, res, next) => {
    try {
        checkBody(req)
        const worker = await WorkerRepo.create(req.body);
        res.status(201).json({ created_worker: worker })
    }
    catch(error){
        res.status(400).json({ error }) 
    }
}

exports.updateOne = async (req, res, next) => {

    try {
        checkId(req);
        checkBody(req);
        const worker = await WorkerRepo.findOneAndUpdate({ _id: req.params.id }, {$set: req.body}).exec();
        res.json({ updated_worker: worker });
    }
    catch(error){
        res.send(400).json({ error })
    }    
};

exports.deleteOne = async (req, res, next) => {
    try {
        checkId(req);
        await WorkerRepo.remove({ _id: req.params.id}).exec();
        res.status(204).send()
    }
    catch(error){
        res.send(400).json({ error })
    }    
};
