const express = require("express");

const { connectToDb } = require("./config/db");
const PORT = process.env.PORT || 3500;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

require("dotenv").config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rento",
      version: "1.0.0",
      description: "Rento Server",
    },
    servers: [
      {
        url: "http://localhost:3500",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerJsDoc(options);

const app = express();
app.use("/api", swaggerUI.serve, swaggerUI.setup(spec));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173", //vite
  "http://localhost:3500", //swagger
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  }
});

//middlewares
const authenticated = require("./middlewares/authenticate");


const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const articlesRouter = require("./routes/article");
const placesRouter = require("./routes/place");
const likedPlaces = require("./routes/likedPlaces");

app.use("/auth", authRouter);
app.use("/users", authenticated,userRouter);
app.use("/articles", articlesRouter);
app.use("places", authenticated, placesRouter);
app.use("/liked-places", authenticated, likedPlaces);
