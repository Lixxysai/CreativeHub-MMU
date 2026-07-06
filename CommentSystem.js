const Post = require('./Post.model'); // Import the Post model

module.exports = (app, io) => {
    //adding a comment to a post
    app.post('/api/posts/:id/comments', async (req, res) => {
        try {
             
            const { commentAuthor, text } = req.body; 
           
            if (!commentAuthor || !text) {
                return res.status(400).json({ error: "content cant be empty" });
            }
         
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            //Create new comment
            const newComment = {
                author: commentAuthor,
                text: text,
                date_time: new Date().toLocaleString()
            };

            //add  a comment
            post.comments.push(newComment); 

            //Save changes to MongoDB database system
            await post.save()

            //Notify everyone using socekt.io
            io.emit('newCommentBroadcast', { postId: post._id, comment: newComment }); 

            return res.status(201).json({ success: true, comment: newComment });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
};
