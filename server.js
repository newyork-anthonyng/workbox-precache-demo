import headPartial from "./partials/head.html";
import footPartial from "./partials/foot.html";
import path from "path";
import express from "express";
const app = express();

app.get("/partials/:partialName", (req, res) => {
    const partialName = req.params.partialName;
    res.sendFile(path.resolve(__dirname, `../partials/${partialName}`));
});


app.get("/service-worker.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../service-worker.js"));
});

app.get("/", (req, res) => {
    res.write(headPartial);
    res.write(`<marquee>Hello World</marquee>`);
    res.write(footPartial);
    res.end();
});

app.listen(3000, () => {
    console.log("Server listening on 3000");
});