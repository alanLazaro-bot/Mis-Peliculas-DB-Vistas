var express = require('express');
var router = express.Router();
let db = require ('../database/models');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DH Movies' });
});

/*Barra de Busqueda*/
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

/*Listado de Peliculas*/
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

/*Primeras 5 peliculas ordenadas por fecha de estreno*/

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

/*Listado de Peliculas con rating mayor que 8*/
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

/*Devuelve la pelicula especificada segun el id */

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

/*Permite la edicion de peliculas*/

router.get('/movies/edit/:id', function (req, res) {

  
    db.Peliculas.findByPk(req.params.id)
    .then(movie=>{ 
      res.render('movies/edit', {genres: [], movie : movie })
    })
    .catch (error =>{
      res.render('error.ejs',{error:error});
  
    
  })
  
   
})

router.patch('/movies/:id', function (req, res) {
  db.Peliculas.update({
    title: req.params.title,
    rating:req.params.rating,
    awards:req.params.awards,
    release_date:req.params.release_date,
    genero:req.params.genre_id
    },
    {
      where:{
        id:req.params.id
      }
    })
  res.redirect('/movies')
})


router.get('/movies/create', function(req,res){
  res.render('create.ejs')
}


)

router.post('/movies/create', function(req,res){

  db.Peliculas.create({
    title: req.params.title,
    rating:req.params.rating,
    awards:req.params.awards,
    release_date:req.params.release_date,
    genero:req.params.genre_id
    })
  res.redirect('/movies')  

  })


/*Elimina la pelicula deseada segun el id */
router.delete('/movies/:id', function (req, res) {
  // devolver solo la pelicula especificada por el id
  db.Peliculas.destroy({
    where:{
      id:req.params.id
    }
  })

})

module.exports = router;
