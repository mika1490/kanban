const express = require(`express`);
const router = express.Router();
const Card = require(`../models/Card`);


router.route(`/`)
.post((req, res) => {
  let {title, priority, status, created_by, assigned_to} = req.body;
  return new Card({title, priority, status, created_by, assigned_to})
  .save()
  .then(cards => {
    cards = cards.toJSON()
    return res.json(cards)
  })
  .catch(err => res.status(400).json({ message: err.message }))
})
.get((req, res) => {
  return new Card()
  .fetchAll()
  .then(cards => {
    cards = cards.toJSON()
    return res.json(cards);
  })
  .catch(err => res.status(400).json({ message: err.message }))
})

router.route(`/:id`)
.get((req, res) => {
  return new Card()
  .where({id: req.params.id})
  .fetch()
  .then(card => {
    card = card.toJSON();
    return res.json(card)
  })
  .catch(err => res.status(400).json({ message: err.message }))
})
.put((req, res) => {
  return new Card({id: req.params.id})
  .save(req.body, {patch: true})
  .then(card => {
    card = card.toJSON()
    return res.json(card)
  })
  .catch(err => {
    return res.json({message: err.message})
  })
})
.delete((req, res) => {
  return new Card({id: req.params.id})
  .destroy({require: true })
  .then(success => {
    res.json({message: 'Success'})
  })
  .catch(err => res.status(400).json({ message: err.message }))
})

module.exports = router;