var express = require('express');
var router = express.Router();
let db = require ('../database/models');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DH Movies' });
});

router.post('/movies/search', function (req, res) {
  
  db.Peliculas.findAll({
    where:{
      title:{[db.Sequelize.Op.like]:'%'+ req.body.search + '%'}


    },
    order:[
      ['title','ASC']
    ]

  
  })
  .then(movies=>{ 
    res.render('movies/index', {movies:movies})
  })
  .catch (error =>{
    res.render('error.ejs',{error:error});

  })
})











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
  db.Peliculas.findAll({
  order:[

    ['release_date','DESC']
   
  ],
  limit:5
  })
  .then(movies=>{ 

  res.render('movies/movies-release-date', {movies})
})
})

router.get('/movies/recommended', function (req, res) {
  
  db.Peliculas.findAll({
where:{
    rating: {[db.Sequelize.Op.gt] : 8}
      }

  })
  
  .then(movies=>{ 

  res.render('movies/recommended', {movies})
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
  db.Peliculas.destroy({
    where:{
      id:req.params.id
    }
  })

})

module.exports = router;
