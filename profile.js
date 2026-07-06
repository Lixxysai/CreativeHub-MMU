const username = localStorage.getItem('username');
if (!username) {
    alert('please register or login first to access your profile page');
    window.location.href = '/login.html';
}
const email = localStorage.getItem('email');
const studentId = localStorage.getItem('studentId');

document.getElementById('profileTitle').textContent = username;
document.getElementById('profileInfo').innerHTML = `Email: ${email || 'Not provided'}<br>Student ID: ${studentId || 'Not provided'}`;   

const userPosts = document.getElementById('userPosts');

fetch('/api/posts')
    .then(res => res.json())
    .then(posts => {

        userPosts.innerHTML = ''; // Clear existing content
        const userPostsData = posts.filter(post => post.author === username);

        if (userPostsData.length === 0) {
            userPosts.innerHTML = '<p>No posts artwork created for this user yet.</p>';
            return;
        }

        userPostsData.forEach(post => {
            userPosts.innerHTML += `
            <div class="art-card">
                <img src="${post.imageUrl}" alt="Artwork">
                <p>${post.content}</p>
                <small>${post.date_time}</small>
                <div class ="post-actions">
                    <button class="like-btn">👍 ${post.likes}</button>
                    <button class="dislike-btn">👎 ${post.dislikes}</button>
                </div>
            </div>
            `;
        });
    })
    .catch(err => console.error(' There was an error while fetching posts:', err));



    
