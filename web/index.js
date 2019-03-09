const express = require("express"),
  app = express(),
  request = require("request"),
  fs = require("fs");
path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet"); //Secure Headers
const compression = require("compression"); //GZIP compression library
const client = require("./services/redis"); //Redis Client
const schedule = require("node-schedule"); //Job Scheduler

//Winston
const winston = require("./services/logger");

app.use(helmet());
app.use(morgan("combined", { stream: winston.stream }));

app.use(compression());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

// Define Scheduler
const j = schedule.scheduleJob("*/10 * * * * *", () => {
  updateToken();
});

app.use(bodyParser.json());

var cookie = "";
var token = "";

function updateToken() {
  request.get("http://python-api:5000/", (err, res, body) => {
    if (!err) {
      body = JSON.parse(body);
      token = body.token;
      cookie = body.cookie;
    } else {
      winston.error(err);
    }
  });
}

function putInCache(roll, html) {
  client.set(roll, html, 'EX', 7200);
}

//Routes

app.post("/result", (req, res) => {
  winston.info(req.body.roll + " checked " + req.body.sem);

  client.exists(req.body.roll, (err, data) => {
    if (data) {
      client.get(req.body.roll, (err, html) => {
        res.send(html);
      });
    } else {
      request.post(
        {
          url:
            "https://makaut.ucanapply.com/smartexam/public//get-result-details",
          headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: "https://makaut.ucanapply.com",
            Cookie: cookie,
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent":
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
            Referer:
              "https://makaut.ucanapply.com/smartexam/public/result-details",
            Host: "makaut.ucanapply.com"
          },
          form: {
            _token: token,
            p1: "",
            ROLLNO: req.body.roll,
            SEMCODE: req.body.sem,
            examtype: "result-details",
            all: ""
          }
        },
        (err, data) => {
          data = JSON.parse(data.body);
          const html = data.html;
          if (html !== undefined) {
            putInCache(req.body.roll, html);
          }
          res.send(html);
        }
      );
    }
  });
});

app.use(express.static("client/dist"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server Online");
});
