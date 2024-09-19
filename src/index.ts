import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const db = {
  roles: [
    {
      id: 1,
      name: "admin",
    },
    {
      id: 2,
      name: "user",
    },
    {
      id: 3,
      name: "moderator",
    },
  ],
  users: [
    {
      id: 1,
      name: "Artem",
      age: 18,
    },
    {
      id: 2,
      name: "Dmitry",
      age: 19,
    },
    {
      id: 3,
      name: "Alexander",
      age: 21,
    },
  ],
  cities: [
    {
      id: 1,
      name: "Surgut",
    },
    {
      id: 2,
      name: "Moscow",
    },
    {
      id: 3,
      name: "Saint-Petersburg",
    },
  ],
};

app.listen(port, () => console.log("Приложение запущено по порту " + port));

app.get("/", (req, res) => res.send("GET main page"));
app.get("/api", (req, res) => res.json(db));
app.get("/api/roles", (req, res) => {res.json(db.roles)});
app.get("/api/users", (req, res) => {res.json(db.users)});
app.get("/api/cities", (req, res) => {res.json(db.cities)});
