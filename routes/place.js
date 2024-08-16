const router = require("express").Router();
const placesController = require("../controllers/place");



/**
 * @swagger
 * components:
 *   schemas:
 *     place:
 *       required:
 *         - _id
 *         - availableForRent
 *         - bedrooms
 *         - bathrooms
 *         - sizeInFoot
 *         - priceInMonth
 *         - title
 *         - description
 *         - image
 *         - place
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           description: Place unique id
 *         availableForRent:
 *           type: boolean
 *           description: Place available for rent or not
 *         bedrooms:
 *           type: string
 *           description: number of bedrooms
 *         bathrooms:
 *           type: string
 *           description: number of bathrooms
 *         sizeInFoot:
 *           type: string
 *           description: Size of the property in foot
 *         priceInMonth:
 *           type: string
 *           description: Price in month $
 *         title:
 *           type: string
 *           description: Title of the place
 *         description:
 *           type: string
 *           description: Description of the place
 *         image:
 *           type: string
 *           description: Image of the place
 *         place:
 *           type: string
 *           description: Place's location city/country
 *         category:
 *           type: string
 *           description: Place's category
 */

/**
 * @swagger
 * tags:
 *   name: places
 *   description: Users managing API
 */

/**
 * @swagger
 * /places:
 *   get:
 *     summary: The list of places
 *     tags: [places]
 *     responses:
 *       401:
 *         description: Not logged in
 *       200:
 *         description: Returns the list of places
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
 *                       $ref: '#/components/schemas/place'
 *                 limit:
 *                   type: string
 *                 skip:
 *                   type: string
 *                 total:
 *                   type: string
 *       500:
 *         description: The server error
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
 * /places:
 *   post:
 *     summary: Add new place
 *     tags: [places]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               availableForRent:
 *                 type: boolean
 *               bedrooms:
 *                 type: string
 *               bathrooms:
 *                 type: string
 *               sizeInFoot:
 *                 type: string
 *               priceInMonth:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               place:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       401:
 *         description: Not logged in
 *       400:
 *         description: Missing Data in the body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       201:
 *         description: The place was created
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
 * /places/:id:
 *   put:
 *     summary: Update existing user
 *     tags: [places]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Place's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/place'
 *     responses:
 *       401:
 *         description: Not logged in
 *       400:
 *         description:
 *       200:
 *         description: The place was updated
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
 * /places/:id:
 *   delete:
 *     summary: Delete existing place
 *     tags: [places]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         required: true
 *         description: The place's id
 *     responses:
 *       401:
 *         description: Not logged in
 *       400:
 *         description: Missing or Invalid id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       200:
 *         description: The place was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messgae:
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
  .get("/", placesController.GET)
  .post("/", placesController.POST)
  .put("/:id", placesController.PUT)
  .delete("/:id", placesController.DELETE);

module.exports = router;
