const { ShiftRepo } = require('../../repositories');

const checkBody = (req, key) => {
    if (req.body === undefined){
        throw 'bad worker data';
    }
    if (key !== undefined){
        if (req.body[key] === undefined){
            throw `bad shift data : mission ${key}`;
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
    const allShifts = await ShiftRepo.find();
    res.json(allShifts);
};

exports.getOne = async (req, res, next) => {
    try {
        checkId(req);
        const shift = await ShiftRepo.findById(req.params.id).exec();
        res.status(200).json(shift);
    }
    catch(error){
        res.send(400).json({ error })
    }    
};

exports.createOne = async (req, res, next) => {
    try {
        checkBody(req);
        const shift = await ShiftRepo.create(req.body);
        res.status(201).json({ created_shift: shift })
    }
    catch(error){
        res.status(400).json({ error }) 
    }
}

exports.updateOne = async (req, res, next) => {

    try {
        checkId(req);
        checkBody(req);        
        const shift = await ShiftRepo.findOneAndUpdate({ _id: req.params.id }, {$set: req.body}).exec();
        res.json({ updated_worker: shift });
    }
    catch(error){
        res.send(400).json({ error })
    }    
};

exports.deleteOne = async (req, res, next) => {
    try {
        checkId(req);
        await ShiftRepo.remove({ _id: req.params.id}).exec();
        res.status(204).send()
    }
    catch(error){
        res.send(400).json({ error })
    }    
};

exports.assignWorker = async (req, res, next) => {
    try {
        checkBody(req, 'user_id');
        await ShiftRepo.updateOne(
            { _id: req.params.id }, 
            { $set: { user_id : req.body.user_id}}
        ).exec();

        res.status(204).send();
    }
    catch (error){
        res.status(400).json({ error })
    }    
}

