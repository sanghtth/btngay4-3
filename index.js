const express = require("express");
const app = express();
app.use(express.json());

const { dataRole, dataUser } = require("./data");

/* ================= ROLE CRUD ================= */

// GET ALL ROLES
app.get("/roles", (req, res) => {
  res.json(dataRole);
});

// GET ROLE BY ID
app.get("/roles/:id", (req, res) => {
  const role = dataRole.find((r) => r.id === req.params.id);
  if (!role) return res.status(404).json({ message: "Role not found" });
  res.json(role);
});

// CREATE ROLE
app.post("/roles", (req, res) => {
  const newRole = {
    ...req.body,
    creationAt: new Date(),
    updatedAt: new Date(),
  };
  dataRole.push(newRole);
  res.status(201).json(newRole);
});

// UPDATE ROLE
app.put("/roles/:id", (req, res) => {
  const index = dataRole.findIndex((r) => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Role not found" });

  dataRole[index] = { ...dataRole[index], ...req.body, updatedAt: new Date() };
  res.json(dataRole[index]);
});

// DELETE ROLE
app.delete("/roles/:id", (req, res) => {
  const index = dataRole.findIndex((r) => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Role not found" });

  dataRole.splice(index, 1);
  res.json({ message: "Deleted successfully" });
});

/* ================= USER CRUD ================= */

// GET ALL USERS
app.get("/users", (req, res) => {
  res.json(dataUser);
});

// CREATE USER
app.post("/users", (req, res) => {
  const role = dataRole.find((r) => r.id === req.body.roleId);
  if (!role) return res.status(400).json({ message: "Role invalid" });

  const newUser = {
    ...req.body,
    role,
    creationAt: new Date(),
    updatedAt: new Date(),
  };

  dataUser.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE USER
app.put("/users/:username", (req, res) => {
  const index = dataUser.findIndex((u) => u.username === req.params.username);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  dataUser[index] = { ...dataUser[index], ...req.body, updatedAt: new Date() };
  res.json(dataUser[index]);
});

// DELETE USER
app.delete("/users/:username", (req, res) => {
  const index = dataUser.findIndex((u) => u.username === req.params.username);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  dataUser.splice(index, 1);
  res.json({ message: "Deleted successfully" });
});

/* ================= SPECIAL REQUEST ================= */

// GET USERS BY ROLE
app.get("/roles/:id/users", (req, res) => {
  const users = dataUser.filter((u) => u.role.id === req.params.id);
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
