import React, { useState, useEffect } from 'react';
import { Post, PostService } from '../services/PostService';
import {
  Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText,
} from 'reactstrap';

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
            <Card color="" key={post.id_str}>
              <CardBody>
                <CardTitle className="h3 mb-2 pt-2 font-weight-bold">Yo</CardTitle>
                <CardSubtitle className="mb-3 font-weight-light text-uppercase">{post.id_str}</CardSubtitle>
                <CardText className="mb-4">yyy</CardText>
                <Row>{post.text}</Row>
                <Row>
                  <Col><b>{post.created_at}</b></Col>
                  <Col>{post.retweet_count} ♻</Col>
                  <Col>{post.favourites_count} ❤</Col>
                </Row>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default CreateHome;