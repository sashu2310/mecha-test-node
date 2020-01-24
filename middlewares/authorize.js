const crypto = require('crypto');

module.exports = function (req, res, next) {
    next();
    // try {
    //     const key = req.headers['x-api-key'];
    //     const buf = Buffer.from(process.env.buffKey, 'utf-8');
    //     let decipher = crypto.createDecipheriv('aes-256-cbc', process.env.private, buf);
    //     let decryptedData = decipher.update(key, 'base64', 'utf8') + decipher.final('utf8');
    //     decryptedData = (JSON.parse(decryptedData));
    //     const timestamp = decryptedData.timestamp;
    //     const today = (Date.now());
    //     const diff = ((today - timestamp) / 1000);
    //     if (diff < 30) {
    //         next();
    //     }
    //     else {
    //         return res.status(401).json({ success: false, error: { code: 403, message: 'FORBIDDEN_ACCESS' } });
    //     }
    // }
    // catch (error) {
    //     console.log(error);
    //     return res.status(401).json({ success: false, error: { code: 403, message: 'FORBIDDEN_ACCESS' } });
    // }
};