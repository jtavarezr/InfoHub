import React from "react";
import { Card, DropdownDivider } from "react-bootstrap";

const DashBoard = ({likes, comments, posts}) => {

    return (
      <>
        <h1>DashBoard</h1>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-4 g-4 p-4">
            <Card >
              <Card.Body>
                <h2>{likes ? likes : 100}</h2>
                <p>Reactions.</p>
              </Card.Body>
            </Card>
            <Card >
              <Card.Body>
                <h2>{comments ? comments : 5}</h2>
                <p>Comments.</p>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h2>{posts ? posts : 50}</h2>
                <p>Total Post.</p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </>
    );
}

export default DashBoard;