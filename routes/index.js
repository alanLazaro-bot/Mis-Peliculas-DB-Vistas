var express = require('express');
var router = express.Router();
let db = require ('../database/models');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DH Movies' });
});

router.get('/movies', function (req, res) {
  // devolver todas las peliculas
  db.Peliculas.findAll()
  .then(movies=>{ 
    res.render('movies/index', {movies:movies})
  })
  .catch (error =>{
    res.render('error.ejs',{error:error});

  })
})

router.get('/movies/new', function (req, res) {
  // buscar la lista de todos los generos para visualizar en el formulario
  db.Peliculas.findAll()
  .then(movies=>{ 
    order:[
      ['genres','DESC']
    ]

  res.render('movies/create', {
    genres : []
  })
})
})

router.get('/movies/:id', function (req, res) {
  // devolver solo la pelicula especificada por el id
  db.Peliculas.findByPk(req.params.id)
  .then(movie=>{ 
    res.render('movies/show', {movie : movie })
  })
  .catch (error =>{
    res.render('error.ejs',{error:error});

  
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
