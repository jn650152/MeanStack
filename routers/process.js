var express = require("express");
var router = express.Router();

var personController = require("../controllers/person");
var petController = require("../controllers/pet");

//for person related routing:web
router.get("/persons", personController.person_list);
router.get("/person/:id", personController.person_detail);

router.get("/person_create", personController.person_create_get);
router.post("/person_create", personController.person_create_post);
router.get("/person_update/:id", personController.person_update_get);
router.post("/person_update/:id", personController.person_update_post);
router.get("/person_delete/", personController.person_delete_get);
router.post("/person_delete_post/", personController.person_delete_post);
router.get("/person_search_interface/", personController.person_search_interface_get);
router.get("/person_search", personController.person_search_get);

//for person related routing: ios
router.get("/person_search_get_ios",personController.person_search_get_ios);
router.post("/person_create_post_ios", personController.person_create_post_ios);
router.delete("/person_delete_post_ios", personController.person_delete_post_ios);
router.put("/person_update_post_ios/:id", personController.person_update_post_ios);
router.get("/person_search_one_get_ios", personController.person_search_one_get_ios);

//for pet related routing:web
router.get("/pets", petController.pet_list);
router.get("/pet/:id", petController.pet_detail);
router.post("/pet_delete_post", petController.pet_delete_post);
router.get("/pet_delete_get/:id", petController.pet_delete_get);

module.exports = router;

