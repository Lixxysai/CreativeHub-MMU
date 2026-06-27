const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const PostModel = require('./models/Post');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


module.exports = (app, io, postsMemoryStorage) => {

    app.post('/api/posts', upload.single('image'), async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: "please add the image"});

            const newPostData = {
                author: req.body.author,
                content: req.body.content,
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
                date_time: new Date().toLocaleString(),
                likes: 0, 
                dislikes: 0, 
                comments: []  
            };

            const newPost = { id: Date.now(), ...newPostData };
            postsMemoryStorage.push(newPost);

            io.emit('newPostBroadcast', newPost);
            return res.status(201).json({ success: true, post: newPost });
            
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/posts/:id/like', async (req, res) => {
        try {
            const postId = Number(req.params.id);
            const post = postsMemoryStorage.find(p => p.id === postId);
            if (!post) return res.status(404).json({ error: "This post cant be found" });

            post.likes += 1;
            io.emit('postStatusUpdate', { postId, likes: post.likes, dislikes: post.dislikes });

            return res.status(200).json({ success: true, likes: post.likes, dislikes: post.dislikes });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/posts/:id/dislike', async (req, res) => {
        try {
            const postId = Number(req.params.id);
            const post = postsMemoryStorage.find(p => p.id === postId);
            if (!post) return res.status(404).json({ error: "This post cant be found" });

            post.dislikes += 1; 
            
            io.emit('postStatusUpdate', { postId, likes: post.likes, dislikes: post.dislikes });

            return res.status(200).json({ success: true, likes: post.likes, dislikes: post.dislikes });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/posts', async (req, res) => {
        try {

            return res.status(200).json(postsMemoryStorage);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
};
