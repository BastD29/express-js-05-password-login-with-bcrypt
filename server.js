// const express = require("express");
import express from "express";

// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("salt:", salt); // ex: salt: $2b$10$0/ac/l0Fwyus4z7JwGfl4.
    console.log("hashedPassword:", hashedPassword); // ex: hashedPassword: $2b$10$0/ac/l0Fwyus4z7JwGfl4.gmq6B2diwLj.cC7qscYucHqVGlkgoBW
    const user = { name: req.body.name, password: hashedPassword };
    // const user = { name: req.body.name, password: req.body.password };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(3000);
