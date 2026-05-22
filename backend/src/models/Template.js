import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true }, // 'APPROVED_EMAIL', 'COMPLETED_EMAIL', 'APPROVED_WA', etc.
    subject: { type: String, default: '' },
    body: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Template', templateSchema);