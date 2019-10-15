import React, { useState, useEffect } from 'react';
import { Post, PostService } from '../services/PostService';

const CreateHome: React.FC<{}> = () => {
  const initialPostState: Post[] = [];

  const [posts, setPosts] = useState<Post[]>(
    initialPostState
  );
  const postService = new PostService();

  useEffect(() => {
    postService.getPosts().then(result => {
      setPosts(result);
    });
  }, []);

  return (
    <div>
      <div>
          {posts.map((post: Post) => (
            <span>
              <b>{post.id_str}</b> - {post.text}
              <br/>
            </span>
          ))}
      </div>
    </div>
  );
};

export default CreateHome;