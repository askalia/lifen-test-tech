import { Schema, model} from "mongoose";

const WorkerSchema: Schema = new Schema({
    first_name: { type: String, required: true },
    status: { type: String, required: true }
});

export const WorkerRepo = model('workers', WorkerSchema);