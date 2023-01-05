const API = "https://jsonplaceholder.typicode.com";

export async function getPosts() {
  const response = await fetch(API + "/posts");
  const posts = await response.json();

  return posts;
}
