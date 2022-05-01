const router = require("express").Router();
const axios = require('axios');
const { response } = require("../app");



router.get("/", (req, res, next) => {

    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then( response => {
      res.render("characters/characters-list",{characters: response.data})
    })
    .catch(err => console.log("error getting characters from db", err))
  
});


router.get("/create", (req, res, next) => {
 res.render("characters/character-create");
});


router.post("/create", (req, res, next) => {

  const characterDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  }

  axios.post(`${process.env.API_URL}/characters`,characterDetails)
    .then(response => {
      res.redirect("/characters")
    })
    .catch(err => console.log("error to create", err))


})


router.get("/:characterId", (req, res, next) => {

  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.characterId}`)
    .then(response => {
      res.render('characters/character-details',  response.data)
    })
    .catch(err => console.log("error on charId route get", err))

});


router.get("/:characterId/edit", (req, res, next) => {
  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.characterId}`)
    .then(response => {
      res.render("characters/character-edit", response.data)
    })
    .catch(err => console.log(err))

});

router.post("/:characterId/edit", (req, res, next) => {
  const characterId = req.params.characterId;

  const newDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  }

  axios.put(`https://ih-crud-api.herokuapp.com/characters/${characterId}`, newDetails)
    .then( response => {
      res.redirect('/characters')
    })
    .catch(err => console.log(err))
  
});


router.post("/:characterId/delete", (req, res, next) => {

  const characterId = req.params.characterId;

axios.delete(`https://ih-crud-api.herokuapp.com/characters/${characterId}`)
    .then( response => {
      res.redirect("/characters")
    })
    .catch(err => console.log("error on delete route",err))
});

module.exports = router;
