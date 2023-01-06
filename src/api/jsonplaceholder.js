const API = "https://jsonplaceholder.typicode.com";

export async function getPosts() {
  const response = await fetch(API + "/posts");
  const posts = await response.json();

  return posts;
}

export async function getPostsComments(postId) {
  const response = await fetch(API + "/comments?postId=" + postId);
  const comments = await response.json();

  return comments;
}
