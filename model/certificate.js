const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

function generateCertificateId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let certificateId = '';
    for (let i = 0; i < 9; i++) {
        certificateId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return certificateId;
}

const certificateSchema = mongoose.Schema({
    studentName: { type: String, required: true },
    internshipField: { type: String, required: true },
    issueDate: { type: Date, default: Date.now },
    certificateId: { type: String, default: generateCertificateId },
    qrCodeUrl: { type: String },
    isVerified: { type: Boolean, default: false },
})

const Certificate = mongoose.model('Certificate', certificateSchema)

module.exports = Certificate