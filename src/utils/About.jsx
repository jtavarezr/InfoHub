import React from "react";

const About = () => {
  return (
    <div>
      <h2>About Us</h2>
      <p>
        Welcome to our website! We are dedicated to providing valuable content
        and resources to our community.
      </p>
      <p>
        Our mission is to [describe the mission or purpose of your website or
        organization].
      </p>
      <p>
        Feel free to explore our website and reach out to us if you have any
        questions or feedback.
      </p>
      <h3>Our Team</h3>
      <div>
        <img
          src="https://via.placeholder.com/150"
          alt="Jonathan"
          style={{ width: "100px", borderRadius: "50%" }}
        />
        <p>Jonathan Tavarez - Founder</p>
      </div>
      <div>
        <img
          src="https://via.placeholder.com/150"
          alt="Jonathan"
          style={{ width: "100px", borderRadius: "50%" }}
        />
        <p>Jonathan Tavarez - Developer</p>
      </div>
      <div>
        <img
          src="https://via.placeholder.com/150"
          alt="Jonathan"
          style={{ width: "100px", borderRadius: "50%" }}
        />
        <p>Jonathan Tavarez - Designer</p>
      </div>
      <h3>Contact Us</h3>
      <p>
        Email: example@example.com
        <br />
        Phone: 123-456-7890
      </p>
    </div>
  );
};

export default About;
