const express = require("express"),
  app = express(),
  request = require("request"),
  path = require("path");
bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

app.use(bodyParser.json());

app.post("/result", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  request.post(
    {
      url:
        "https://makaut.ucanapply.com/smartexam/public//get-result-details",
      headers: {
        "X-CSRF-TOKEN": "ycIgbvB0caLz4kCTagWZlifgFhGsRFpSVI6Qy5CB",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://makaut.ucanapply.com",
        Cookie:
          "XSRF-TOKEN=eyJpdiI6ImYrcWdXTmFtTFwvS0txUVZwSnVcLzRNQT09IiwidmFsdWUiOiIydjdvWDhRcHo2VmVHNXk1NWlEczJiOUpOaVwvZHIxV2xQXC9VK0FyWWNtNUY1T1Jpb0ZtWkpXXC9zXC9Da1wvNU9xR3l5Q3B5UlwvUzZtZktYOGlYenorXC9FOXc9PSIsIm1hYyI6IjE5M2I3MDA2MThkNTY5NzNlOWNlZDFjM2FhMGU2NTYxZDhmZDlhNzJhM2I3YWNlM2FlMmE5MzdmZGM5MGRiY2YifQ%3D%3D; examination_session=eyJpdiI6ImtWY2FaTVhVdzVNVThkRkJrNkQ2UUE9PSIsInZhbHVlIjoiK09FUnlcL0JrakVyK3dNYkNYVThqYXE1WWtqR1pVQlJqc2VIaW0xdklyUlwvQ1d6cmVzQ3p4K1BPSWlHeHhmeFhjb2RpMGpMY2lyR3pqcnlOVHYyQ3BzQT09IiwibWFjIjoiM2FlZjU1NmRmZWI0ZDJlMDk5ZDI0ZTZhNWNlNWViZGQ4YjVkMTljZjlkNzI1NmZhZGFiZTg1NDdjYTJiYzIwZCJ9",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
        Referer:
          "https://makaut.ucanapply.com/smartexam/public/result-details",
        Host: "makaut.ucanapply.com"
      },
      form: {
        _token: "ycIgbvB0caLz4kCTagWZlifgFhGsRFpSVI6Qy5CB",
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
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server");
});
