const router = require("express").Router();
const authController = require("../controllers/auth");

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Auth managing API
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create new user
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       400:
 *         description: Missing Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       200:
 *         description: Created new user
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: log in
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       400:
 *         description: Missing data or no user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /auth/isloggedin:
 *   get:
 *     summary: Return auth status
 *     tags: [auth]
 *     responses:
 *       401:
 *         description: Not logged in (no token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isloggedin:
 *                   type: boolean
 *       403:
 *         description: Not logged in (invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isloggedin:
 *                   type: boolean
 *       200:
 *         description: Still logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isloggedin:
 *                   type: boolean
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: logout
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

router
  .post("/signup", authController.SIGNUP)
  .post("/login", authController.LOGIN)
  .get("/isloggedin", authController.ISLOGGEDIN)
  .get("/logout", authController.LOGOUT);

module.exports = router;
