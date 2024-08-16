const router = require("express").Router();
const likedPlacesController = require("../controllers/likedPlaces");

/**
 * @swagger
 * components:
 *   schemas:
 *     likedPlaces:
 *       required:
 *         - _id
 *         - userId
 *         - placeId
 *       properties:
 *         _id:
 *           type: string
 *           description: doc unique id
 *         userId:
 *           type: string
 *           description: User's id
 *         placeId:
 *           type: string
 *           description: Post's id 
 */

/**
 * @swagger
 * tags:
 *   name: likedPlaces
 *   description: Liked places managing API
 */


/**
 * @swagger
 * /liked-places:
 *   get:
 *     summary: Get all liked places by user
 *     tags: [likedPlaces]
 *     responses:
 *       401:
 *         description: Not logged in
 *       200:
 *         description: Returns all liked places by user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 schema:
 *                   $ref: '#/components/schemas/likedPlaces'
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
 * /liked-places/{placeId}:
 *   post:
 *     summary:
 *     tags: [likedPlaces]
 *     parameters:
 *       - name: placeId
 *         in: path
 *         required: true
 *         type: string
 *         description:
 *     responses:
 *       400:
 *         description: Missing or invalid id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not logged in 
 *       200:
 *         description: Place was added to liked places
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
 * /liked-places/{placeId}:
 *   delete:
 *     summary: Delete place from liked places
 *     tags: [likedPlaces]
 *     parameters:
 *       - name: placeId
 *         in: path
 *         type: string
 *         required: true
 *         description: Place's id
 *     responses:
 *       400:
 *         description: Missing or invalid id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not logged in
 *       200:
 *         description: Place was removed from liked places
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
  .get("/", likedPlacesController.GET)
  .post("/:placeId", likedPlacesController.POST)
  .delete("/:placeId", likedPlacesController.DELETE);

module.exports = router;
