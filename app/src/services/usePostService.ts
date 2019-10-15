export interface Post {
  created_at: string,
  id_str: string,
  text: string,
  retweet_count: number,
  favourites_count: number
}

export class PostService {
  public getPosts() {
    console.log("getPosts");
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return new Promise<Post[]>((resolve, reject) => {
      fetch('/api/posts', {
        method: 'GET',
        headers
      })
        .then(response => response.json())
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}