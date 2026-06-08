const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

module.exports = (app, io) => {

    app.post('/api/posts', upload.single('image'), (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: "please add the image"});

            const newPost = {
                id: Date.now(),
                author: req.body.author,
                content: req.body.content,
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
                date_time: new Date().toLocaleString()

            };

            io.emit('newPostBroadcast', newPost);

            return res.status(201).json({ success: true, post: newPost });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
};
