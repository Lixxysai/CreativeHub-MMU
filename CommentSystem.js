module.exports = (app, io, postsMemoryStorage) => {

    app.post('/api/posts/:id/comments', (req, res) => {
        try {
            const postId = Number(req.params.id); 
            const { commentAuthor, text } = req.body; 

            if (!commentAuthor || !text) {
                return res.status(400).json({ error: "content cant be empty" });
            }

            const post = postsMemoryStorage.find(p => p.id === postId);
            if (!post) {
                return res.status(404).json({ error: "cant found the post" });
            }

            const newComment = {
                author: commentAuthor,
                text: text,
                date_time: new Date().toLocaleString()
            };

            if (!post.comments) post.comments = []; 
            
            post.comments.push(newComment); 
            io.emit('newCommentBroadcast', { postId, comment: newComment }); 

            return res.status(201).json({ success: true, comment: newComment });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
};
