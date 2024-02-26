const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const csvtojson = require('csvtojson');

const app = express();
const port = 3000;

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/kwgwDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected successfully");
});

// API 데이터 스키마
const apiDataSchema = new mongoose.Schema({
    dataType: { type: String, required: true },
    data: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
});

const ApiData = mongoose.model('ApiData', apiDataSchema);

// JSON 데이터 가져오기 및 저장
app.get('/fetchAndSaveJSON', async (req, res) => {
    try {
        const response = await axios.get('https://www.listly.io/api/single?key=dLntMZo0&selected=1&arrange=y&href=y&file=json');
        const jsonData = new ApiData({
            dataType: 'json',
            data: response.data
        });
        await jsonData.save();
        res.send('JSON data fetched and saved successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch and save JSON data.');
    }
});

// CSV 데이터 가져오기 및 저장
app.get('/fetchAndSaveCSV', async (req, res) => {
    try {
        const { data } = await axios.get('https://www.listly.io/api/single?key=dLntMZo0&selected=1&arrange=y&href=y&header=y&file=csv', {
            responseType: 'text'
        });
        const jsonObj = await csvtojson().fromString(data);
        const csvData = new ApiData({
            dataType: 'csv',
            data: jsonObj
        });
        await csvData.save();
        res.send('CSV data fetched and saved successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch and save CSV data.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
