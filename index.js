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
      url: "https://makaut.ucanapply.com/smartexam/public//get-result-details",
      headers: {
        "X-CSRF-TOKEN": "paPTqqoMgfzS2tQBFolGI5iGpA8ChR95yUKiGzO7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://makaut.ucanapply.com",
        Cookie:
          "XSRF-TOKEN=XSRF-TOKEN=eyJpdiI6InlsVWhnWFVTWURcL1grTEErNm81a2RBPT0iLCJ2YWx1ZSI6IlpsV08wVkNEbm4xd2dkZFhDZWt1QnBFV3M0bTRibURweElKRlwvczU1cUpYRVRZaml4OGdCUXlDSHBVVUdhaktuZlE0ekRWWTZGdEpTZ3YyZllHeVFGQT09IiwibWFjIjoiNjAwMjZkN2QyYmEzOGJmOWQ3MzgzNDQ5MWIxMjlkNTNkMjk0NDFmYWZhNDE3NTIwMDZhYzRlOGM2ZTM0OGVhNSJ9; examination_session=eyJpdiI6ImZXdXg4RTlzWGJySUQ5eGxvVEVFOFE9PSIsInZhbHVlIjoiV1R5RVdhZm5aUitqaFUyanV1MzZwVzl3a2wyY3ZnNlIxYUdtRmhsaDNoKzYyWllPSGpjXC80V2NjOWZOUUJVN0NcL1Vod3N6RmhOTHphQ2VRTXRxWlZHQT09IiwibWFjIjoiNjg1OGIwNjE2MTI5ZDYxMTM3YWZiOTBiZTAyZGU3YmQ0Zjk2YWQ0Y2ZiNTkwMDUyNjdmMzQ0NmViNjYyZjAwNCJ9",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
        Referer: "https://makaut.ucanapply.com/smartexam/public/result-details",
        Host: "makaut.ucanapply.com"
      },
      form: {
        _token: "paPTqqoMgfzS2tQBFolGI5iGpA8ChR95yUKiGzO7",
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

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server");
});
