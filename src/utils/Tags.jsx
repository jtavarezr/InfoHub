import React, { useEffect, useState } from "react";
import supabase from "../clients";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";


const Tags = () => {
  const [tags, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("tags_category").select();
    setCountries(data);
  }

  return (
    <>
    <h1>Topics </h1>
      <Row xs={1} md={3} className="g-4">
        {tags.map((name, index) => (
          <Col key={index}>
            <Card>
              <Card.Subtitle className="mb-2 text-muted text-end">
                {name.post_count} post
              </Card.Subtitle>
              <Card.Body>
                <Card.Title>{name.name}</Card.Title>
                <Card.Text>{name.description}</Card.Text>
                <Button>Follow</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default Tags;
