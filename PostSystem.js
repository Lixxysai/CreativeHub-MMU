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
                date_time: new Date().toLocaleString(),
                like:0,
                dislike:0,
                comment:[]

            };

            io.emit('newPostBroadcast', newPost);

            return res.status(201).json({ success: true, post: newPost });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

app.post('/api/posts/:id/like', (req, res) => {
        const postId = req.params.id;
        const post = postsMemoryStorage.find(p => p.id === postId);

        if (!post) {
            return res.status(404).json({ error: "This post cant be found" });
        }

        post.likes += 1;

        return res.status(200).json({ success: true, likes: post.likes, dislikes: post.dislikes });
    });

    app.post('/api/posts/:id/comments', (req, res) => {
        try {
            const postId = Number(req.params.id); // 👈 转换为数字匹配 id
            const { commentAuthor, text } = req.body; // 其他人的名字和评论内容

            if (!commentAuthor || !text) return res.status(400).json({ error: "内容不能为空" });

            const post = postsMemoryStorage.find(p => p.id === postId);
            if (!post) return res.status(404).json({ error: "找不到该帖子" });

            const newComment = {
                id: Date.now(),
                author: commentAuthor,
                text: text,
                date_time: new Date().toLocaleString()
            };

            post.comments.push(newComment); // 塞进帖子的评论区
            io.emit('newCommentBroadcast', { postId, comment: newComment }); // 实时广播

            return res.status(201).json({ success: true, comment: newComment });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/posts/:id/dislike', (req, res) => {
        const postId = req.params.id;
        const post = postsMemoryStorage.find(p => p.id === postId);

        if (!post) {
            return res.status(404).json({ error: "This post cant be found" });
        }

        post.dislikes += 1; 
        return res.status(200).json({ success: true, likes: post.likes, dislikes: post.dislikes });
    });

    app.get('/api/posts', (req, res) => {
        return res.status(200).json(postsMemoryStorage);
    });
};
