const router = require("express").Router();
const usersController = require("../controllers/user");
const isAdmin = require("../middlewares/admin");
/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       required:
 *         - _id
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *           description: The User's unique id
 *         firstname:
 *           type: string
 *           description: The User's firstname
 *         lastname:
 *           type: string
 *           description: The User's lastname
 *         email:
 *           type: string
 *           description: The User's email
 *         password:
 *           type: string
 *           description: The User's password
 *         role:
 *           type: string
 *           description: The User's role (user|contributor|admin)
 */

/**
 * @swagger
 * tags:
 *   name: users
 *   description: Users managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: The list of users
 *     tags: [users]
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Number of users to return
 *         required: false
 *         type: integer
 *         default: 10
 *       - name: skip
 *         in: query
 *         description: Number of users to skip
 *         required: false
 *         type: integer
 *         default: 0
 *     responses:
 *       200:
 *         description: A list of users and pagination details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     schema:
 *                       $ref: '#/components/schemas/user'
 *                 limit:
 *                   type: string
 *                 skip:
 *                   type: string
 *                 total:
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
 *       401:
 *         description: Not logged in
 *       403:
 *         description: Unauthenticated as an Admin
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Edit User's data
 *     tags: [users]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *         description: The User's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       400:
 *         description: Invalid id or Missing Data in the body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       200:
 *         description: The User data was updated
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
 *       401:
 *         description: Not logged in
 *       403:
 *         description: Unauthenticated as an Admin
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The User's id
 *     responses:
 *       400:
 *         description: Invalid id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       200:
 *         description: The User was deleted
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
 *                 messgae:
 *                   type: string
 *       401:
 *         description: Not logged in
 *       403:
 *         description: Unauthenticated as an Admin
 */

router
  .get("/all", isAdmin, usersController.GET)
  .get("/user-data", usersController.USERDATA)
  .put("/:id", isAdmin, usersController.PUT)
  .put("/", usersController.FLUUPDATE)
  .delete("/:id", isAdmin, usersController.DELETE);

module.exports = router;
