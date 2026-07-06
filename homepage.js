const artGrid = document.getElementById('artGrid');

fetch('/api/posts')
    .then(res => res.json())
    .then(posts => {
        artGrid.innerHTML = ''; // Clear existing content
        posts.forEach(post => {
           const commentsHTML = post.comments.map(comment => `
            <p><strong>${comment.author}</strong>: ${comment.text}</p>
           `).join("");
              artGrid.innerHTML += `
              <div class="art-card">
                <img src="${post.imageUrl}" alt="Artwork"></img>
                <h3>${post.author}</h3>
                <p>${post.content}</p>
                <small>${post.date_time}</small>
                <br></br>
                 <button>👍 ${post.likes}</button>
                 <button>👎 ${post.dislikes}</button>
                 <hr></hr>

                 <div class="comments">
                    ${commentsHTML}
                 </div>

                <input
                type="text"
                class="commentInput"
                placeholder="Write a comment..."></input>

                <button
                class="commentBtn"
                data-id="${post._id}">
                Comment
                </button>

              </div>

            `;
        });

        document.querySelectorAll(".commentBtn").forEach(button => {
            button.addEventListener("click", async () => {
                console.log("Comment button clicked");
                const postId = button.dataset.id;
                const input = button.previousElementSibling;
                const text =input.value.trim();

                if (!text) return;
                const response = await fetch(`/api/posts/${postId}/comments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        commentAuthor: localStorage.getItem("username"),
                        text: text
                    })
                });

                const result = await response.json();     

                if (result.success) {
                    location.reload();
                } else {
                    alert(result.error);
                }

            });

        });

    })
    .catch(err => console.error('Error fetching posts:', err));
                  
