const express = require("express");
const authControllers = require("../controllers/auth-controller");
const { signupSchema,loginSchema } = require("../validators/auth_validator");
const validate = require("../middlewares/validate_middleware");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();


// router.get("/",(req, res)=>{
//     res.status(200).send("Welcome to world router");
// });

router.route("/").get(authControllers.home); 
router.route("/register").post(validate(signupSchema),authControllers.register);
router.route("/login").post(validate(loginSchema),authControllers.login);

router.route("/users").get(authMiddleware, authControllers.users);

router.route('/delete:id').delete(authMiddleware, authControllers.deleteUser);


module.exports = router;


// get -> read data
// post -> Insert Data
// put/patch -> update data or insert if a new id
// delete -> delete data
