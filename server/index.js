const express = require("express");
const path = require('path');
const csv = require('@fast-csv/parse');

const PORT = process.env.PORT || 3001;

//Load all csv data into memory
const loadData =() => {
    const fs = require('fs');
    let path = 'server/data/BattedBallData.csv';
    let jsonResponse = [];

    fs.createReadStream(path)
        .pipe(csv.parse({ headers: true, delimiter: ';' }))
        .on('error', error => console.error(error))
        .on('data', row => jsonResponse.push(row))
        .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

    return jsonResponse;
}

const data = loadData();

const app = express();

//Serve web app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//Return all players with available data
app.get("/v1/batted-ball", (req, res) => {
    res.json(data);
});

//Any GET requests that aren't defined will return the web app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});