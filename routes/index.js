var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DH Movies' });
});

router.get('/movies', function (req, res) {
  // devolver todas las peliculas

  res.render('movies/index', {
    movies : []
  })
})

router.get('/movies/new', function (req, res) {
  // buscar la lista de todos los generos para visualizar en el formulario

  res.render('movies/create', {
    genres : []
  })
})

router.get('/movies/:id', function (req, res) {
  // devolver solo la pelicula especificada por el id

  res.render('movies/show', {
    movie : movie 
  })
})

router.get('/movies/:id/edit', function (req, res) {
  res.render('movies/edit', {
    genres : [],
    movie : movie,
  })
})

router.patch('/movies/:id', function (req, res) {
  res.redirect('/movies')
})

router.delete('/movies/:id', function (req, res) {
  // devolver solo la pelicula especificada por el id
})

module.exports = router;
