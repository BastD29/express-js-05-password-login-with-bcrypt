// const express = require("express");
import express from "express";

// const { users } = require("./data");
// import users from "./data.js";
import { ROLE, users } from "./data.js";

// const projectRouter = require("./routes/projects");
import projectRouter from "./routes/projects.js";

import { authRole, authUser } from "./basicAuth.js";

const app = express();

// console.log("users:", users);

app.use(express.json());
app.use(setUser);
app.use("/projects", projectRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard Page");
});

app.get("/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send("Admin Page");
});

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}

app.listen(3000);
