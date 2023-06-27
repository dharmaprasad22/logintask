const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "register",
});

con.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  con.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, password],
    (err, result) => {
      if (err) {
        console.error("Error occurred during registration:", err);
        res.send({ message: "An error occurred during registration" });
      } else {
        res.send({ message: "Account created successfully" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  con.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.error("Error occurred during login:", err);
        res.send({ message: "An error occurred during login" });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "Wrong username or password" });
        }
      }
    }
  );
});


app.post("/details", (req, res) => {
    const {
        
      orderDate,
      company,
      owner,
      quantity,
      weight,
      requestForShipment,
      trackingId,
      shipmentSize,
      boxcount,
      specification,
      checklist,
      username
      
    } = req.body;
  
    if (username === 'customer1') {
        con.query(
            "INSERT INTO details (orderDate, company, owner, quantity, weight, requestForShipment, trackingId, shipmentSize, boxcount, specification, checklist, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [orderDate, company, owner, quantity, weight, requestForShipment, trackingId, shipmentSize, boxcount, specification, checklist, username],
            (err, result) => {
          if (result) {
            res.send(result);
          } else {
            res.send({ message: "ENTER CORRECT ASKED DETAILS!" });
          }
        }
      );
    } else if (username === 'customer2') {
        con.query(
            "INSERT INTO details (orderDate, company, owner, quantity, weight, requestForShipment, trackingId, shipmentSize, boxcount, specification, checklist, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [orderDate, company, owner, quantity, weight, requestForShipment, trackingId, shipmentSize, boxcount, specification, checklist, username],
            (err, result) => {
          if (result) {
            res.send(result);
          } else {
            res.send({ message: "ENTER CORRECT ASKED DETAILS!" });
          }
        }
      );
    } else {
      res.send({ message: "UNKNOWN USER!" });
    }
  });
  

// app.post("/details", (req, res) => {
//   const {
//     orderDate,
//     company,
//     owner,
//     quantity,
//     weight,
//     requestForShipment,
//     trackingId,
//     shipmentSize,
//     boxcount,
//     specification,
//     checklist,
//   } = req.body;

//   if (username === 'customer1') {
//     con.query("INSERT INTO details (orderDate, company, owner, quantity, weight, requestForShipment, trackingId, shipmentSize, boxcount, specification, checklist) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [orderDate, company, owner, quantity, weight, requestForShipment, trackingId, shipmentSize, boxcount, specification, checklist],
//       (err, result) => {
//         if (result) {
//           res.send(result);
//         } else {
//           res.send({ message: "ENTER CORRECT ASKED DETAILS!" });
//         }
//       }
//     );
//   } else if (username === 'customer2') {
//     con.query("INSERT INTO details2 (username,orderDate, company, owner, quantity, weight, requestForShipment, trackingId, shipmentSize, boxcount, specification, checklist) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [username,orderDate, company, owner, quantity, weight, requestForShipment, trackingId, shipmentSize, boxcount, specification, checklist],
//       (err, result) => {
//         if (result) {
//           res.send(result);
//         } else {
//           res.send({ message: "ENTER CORRECT ASKED DETAILS!" });
//         }
//       }
//     );
//   } else {
//     res.send({ message: "UNKNOWN USER!" });
//   }
// });

app.get("/items", (req, res) => {
    const query = "SELECT * FROM details";
    con.query(query, (err, result) => {
      if (err) {
        console.error("Error occurred while fetching items:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(result);
      }
    });
  });



app.listen(3001, () => {
  console.log("Running backend server on port 3001");
});
