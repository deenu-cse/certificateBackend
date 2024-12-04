const express = require('express')
const app = express()
const cors = require('cors')
const ConnectDb = require('./utils/db')
const Qrcode = require('qrcode')
const Certificate = require('./model/certificate')

app.use(cors())

app.use(express.json())

app.post('/api/certificates', async (req, res) => {
    try {
        const { studentName, internshipField } = req.body;

        const newCertificate = new Certificate({
            studentName,
            internshipField,
        });

        const qrCodeData = `${'https://novanectarx-backend.vercel.app/'}/verify/checkCertificate`;
        const qrCodeUrl = await Qrcode.toDataURL(qrCodeData);

        newCertificate.qrCodeUrl = qrCodeUrl;
        await newCertificate.save();

        res.status(201).json({ message: 'Certificate created', data: newCertificate });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/verify/:certificateId', async (req, res) => {
    try {
        const { certificateId } = req.params;
        const certificate = await Certificate.findOne({ certificateId });

        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found, please enter a correct certificate ID.' });
        }

        res.status(200).json({
            isVerified: true,
            message: 'Certificate is verified ✅',
            data: certificate
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



ConnectDb().then(() => {
    app.listen(3000, () => {
        console.log("your port is the 3000")
    })
})

module.exports = app