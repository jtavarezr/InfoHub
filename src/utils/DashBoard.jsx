import React from "react";
import { Card, Col, DropdownDivider, Row } from "react-bootstrap";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Typography,
  Grid,
  CssBaseline,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const DashBoard = ({ likes, comments, posts }) => {
  return (
    <>
      <h1>DashBoard</h1>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <Card.Body>
              <h2>{likes ? likes : 100}</h2>
              <Typography>Reactions.</Typography>
            </Card.Body>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <Card.Body>
              <h2>{likes ? likes : 100}</h2>
              <Typography>Reactions.</Typography>
            </Card.Body>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <Card.Body>
              <h2>{likes ? likes : 100}</h2>
              <Typography>Reactions.</Typography>
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h1>Top 10 Most Liked Posts</h1>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "The Future of Artificial Intelligence: Trends and Applications",
                  "Blockchain: Beyond Cryptocurrencies",
                  "The Impact of Quantum Computing on the Tech Industry",
                  "New Frontiers in Virtual and Augmented Reality",
                  "The IoT Revolution: Connecting the World",
                  "Cybersecurity in the Digital Age: Challenges and Solutions",
                  "Advancements in Digital Medicine and eHealth",
                  "The Disruptive Potential of Robotics and Automation",
                  "Emerging Technologies: 5G, Edge Computing, and More",
                  "Sustainability and Technology: Towards a Greener Future",
                ],
              },
            ]}
            series={[{ data: [40, 30, 5, 22, 50, 18, 45, 15, 43, 12] }]}
            width={600}
            height={500}
          />
        </Grid>
        {/* Comments Section */}
        <Grid item xs={4}>
          <Box>
            <CssBaseline />
            <h1>Follower</h1>

            <List>
              {follwers.map(({ primary, person }, index) => (
                <ListItemButton key={index + person}>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={person} />
                  </ListItemAvatar>
                  <ListItemText primary={primary} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <CssBaseline />
        <h1>Private Message</h1>
                <Box>

        <List>
          {messages.map(({ primary, secondary, person }, index) => (
            <ListItemButton key={index + person}>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={person} />
              </ListItemAvatar>
              <ListItemText primary={primary} secondary={secondary} />
            </ListItemButton>
          ))}
        </List>
        </Box>
      </Grid>
    </>
  );
};

export default DashBoard;
const follwers = [
  {
    primary: "TechGeek42?",

    person: "https://loremflickr.com/640/360",
  },
  {
    primary: "CodeNinja88 Gift",
    person: "https://placebeard.it/640x360",
  },
  {
    primary: "CyberWarriorX",
    person: "https://placebear.com/640/360",
  },
  {
    primary: "DigitalDreamer23",
    person: "https://picsum.photos/640/360",
  },
];
const messages = [
  {
    primary: "Brunch this week?",
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    primary: "Recipe to try",
    secondary:
      "I am try out this new BBQ recipe, I think this might be amazing",
    person: "/static/images/avatar/2.jpg",
  },
  {
    primary: "Yes!",
    secondary: "I have the tickets to the ReactConf for this year.",
    person: "/static/images/avatar/3.jpg",
  },
  {
    primary: "Doctor's Appointment",
    secondary:
      "My appointment for the doctor was rescheduled for next Saturday.",
    person: "/static/images/avatar/4.jpg",
  },
  {
    primary: "Discussion",
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Summer BBQ",
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: "/static/images/avatar/1.jpg",
  },
];