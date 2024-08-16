const router = require("express").Router();
const articlesController = require("../controllers/article");

const authenticated = require("../middlewares/authenticate");
const isContributor = require("../middlewares/contributor");

/**
 * @swagger
 * components:
 *   schemas:
 *     article:
 *       required:
 *         - _id
 *         - title
 *         - description
 *         - main
 *         - image
 *       properties:
 *         _id:
 *           type: string
 *           description: Article's unique id
 *         title:
 *           type: string
 *           description: Article's title
 *         description:
 *           type: string
 *           description: Article's description
 *         main:
 *           type: string
 *           description: Article's main body
 *         image:
 *           type: string
 *           description: Article's image
 */

/**
 * @swagger
 * tags:
 *   name: articles
 *   description: Articles managing API
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: The list of articles
 *     tags: [articles]
 *     parameters:
 *       - name: limit
 *         in: query
 *         default: 10
 *         type: string
 *         required: false
 *         description: Thr number of returned articles
 *       - name: skip
 *         in: query
 *         default: 0
 *         type: string
 *         required: false
 *         description: The of skipped articles
 *     responses:
 *       401:
 *         description: Not logged in
 *       200:
 *         description: Returns the list of the articles
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
 *                       $ref: '#/components/schemas/article'
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
 */

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Add new article
 *     tags: [articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/article'
 *     responses:
 *       401:
 *         description: Not logged in
 *       400:
 *         description: Missing or invalid id or data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       201:
 *         description: The article was created
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
 * /articles/{id}:
 *   put:
 *     summary: Update existing article
 *     tags: [articles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Article's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/article'
 *     responses:
 *       401:
 *         description: Not logged in
 *       400:
 *         description: Missing or invalid id or data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *       200:
 *         description: The article was updated
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
 * /articles/{id}:
 *   delete:
 *     summary: Delete existing article
 *     tags: [articles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Article's id
 *     responses:
 *       401:
 *         description: Not logged in
 *       403:
 *         description: Not logged in as contributor
 *       400:
 *         description: Missing or invalid id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       200:
 *         description: The article was deleted
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


router
  .get("/", authenticated, articlesController.GET)
  .post("/", authenticated, isContributor, articlesController.POST)
  .put("/:id", authenticated, isContributor, articlesController.PUT)
  .delete("/:id", authenticated, isContributor, articlesController.DELETE);

module.exports = router;
