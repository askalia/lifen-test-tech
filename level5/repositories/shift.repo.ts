import { Schema, model} from "mongoose";

const ShiftSchema: Schema = new Schema({
    planning_id: { type: Number, required: true},
    user_id: { type: Schema.Types.ObjectId, ref: 'workers' },
    start_date: { type: String, required: true }
});

export const ShiftRepo = model('shifts', ShiftSchema);