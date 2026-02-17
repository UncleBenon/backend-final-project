import express from "express";
import logger from "./middlewear/logger.js";
import errorHandler from "./middlewear/errorHandler.js";

const app = express();
app.use(logger);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// TODO: Routes go here:

app.use(errorHandler);
app.use((_, res) => {
    res.status(404).send('Page Not Found');
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
