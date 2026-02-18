import express from "express";
import logger from "./middlewear/logger.js";
import errorHandler from "./middlewear/errorHandler.js";
import usersRouter from "./routes/Users.js";
import loginRoute from "./routes/Login.js";
import bookingRouter from "./routes/Bookings.js";
import hostsRouter from "./routes/Hosts.js";
import propertiesRouter from "./routes/Properties.js";
import reviewRouter from "./routes/Reviews.js";

const app = express();
app.use(express.json());
app.use(logger);

app.get("/", (_req, res) => {
    res.send("Hello World!");
});

app.use("/login", loginRoute);
app.use("/users", usersRouter);
app.use("/bookings", bookingRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewRouter);

app.use((_req, res) => {
    res.status(404).send('Page Not Found');
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
