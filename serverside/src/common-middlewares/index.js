import jwt from "jsonwebtoken";
import multer from "multer";
import shortid from "shortid";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});
export const upload = multer({ storage });

export const requireSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } else {
        return res.status(400).json({ message: "Authorization Required" });
    }
    next();
};

export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin")
        return res.status(400).json({ message: "Admin Access Denied" });

    next();
};

export const userMiddleware = (req, res, next) => {
    if (req.user.role !== "user")
        return res.status(400).json({ message: "User Access Denied" });

    next();
};

export const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    for (let c of category) {
        categoryList.push({
            _id: c._id,
            name: c.name,
            slug: c.slug,
            parentId: c.parentId,
            type: c.type,
            children: createCategories(categories, c._id),
        });
    }
    return categoryList;
};
