import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import initialDataRoutes from "./routes/admin/initialData.js";
import pageRoutes from "./routes/admin/page.js";
import addressRoutes from "./routes/address.js";
import orderRoutes from "./routes/order.js";
import adminOrderRoutes from "./routes/admin/order.js";
import path from "path";

const app = express();
env.config();

//Mongodb Connectivity
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.3uivu.mongodb.net/${process.env.MONGODB_DATABASENAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    )
    .then(() => {
        console.log("Mongodb Database Connected");
    })
    .catch((error) => console.log(error.message));

//Middlewares
app.use(express.json());
app.use("/public", express.static("./src/uploads"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoutes);

//API Calls
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Hello Aakriti",
    });
});

app.post("/data", (req, res, next) => {
    res.status(200).json({
        message: req.body,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
});
