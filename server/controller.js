const service = require('./service');

exports.generateQR = async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.id || !data.price) {
            return res.status(400).send({ error: 'Missing id or price in request data' });
        }

        const qrCodeText = service.formatData(data);
        const qrCodeBuffer = await service.generateQRCode(qrCodeText);

        res.setHeader('Content-Disposition', 'attachment; filename=qrcode.png');
        res.type('image/png').send(qrCodeBuffer);
    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
