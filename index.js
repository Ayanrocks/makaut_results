const express = require("express"),
  app = express(),
  request = require("request"),
  path = require("path");
bodyParser = require("body-parser");
const spawn = require("child_process").spawn;

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

app.use(bodyParser.json());

let cookie = "";
let token = "";

const processPy = spawn("python3", ["./cookie.py"]);

function runpy() {
  processPy.stdout.on("data", data => {
    let val = data.toString();
    val = val.split("\n");
    token = val[0];
    cookie = val[1];
  });
}

//Routes


app.post("/result", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  request.post(
    {
      url: "https://makaut.ucanapply.com/smartexam/public//get-result-details",
      headers: {
        "X-CSRF-TOKEN": token,
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://makaut.ucanapply.com",
        Cookie: cookie,
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
        Referer: "https://makaut.ucanapply.com/smartexam/public/result-details",
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
      console.log(err);
      res.send(data);
    }
  );
});

app.use(express.static("client/dist"));

app.get("*", (req, res) => {
  runpy();
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server");
});
