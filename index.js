const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

urlList = [];
actualId = 0;

app.post('/api/shorturl', (req, res) => {
    const url = req.body.url;
    if(!url) return res.json({"error" : "invalid url"});
    if(!url.startsWith("http://") && !url.startsWith("https://")) return res.json({"error" : "invalid url"});
    actualId++;
    urlList.push({"original_url" : url, "short_url" : actualId-1});
    return res.json({"original_url" : url, "short_url" : actualId-1});
});

app.get('/api/shorturl/:id', (req, res) => {
    const id = req.params.id;
    if(!/^\d+$/.test(id) || id >= urlList.length || id < 0 || !id) return res.json({"error" : "invalid url"});
    res.redirect(urlList[id].original_url);
});

app.listen(3003);