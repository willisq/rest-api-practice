const {Router} = require('express');
const router = Router();

const movies = require('../sample.json');

router.get('/',(req,res)=>{
    res.json(movies);
});

router.post('/',(req,res)=>{
    const {title, director, year, rating} = req.body;
    if(title && director && year && rating){
        const id = movies.length + 1;
        const newMovie = {id, ...req.body};
        movies.push(newMovie);
        res.json(movies);
    } else{
        res.status(500).json({error:'There was an error!'});
    }
});

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    movies.forEach((movie, index)=> {
        if(movie.id == id) movies.splice(index, 1);
    });
    res.send('eliminado')
});

router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {title, director, year, rating} = req.body;
    if(title && director && year && rating){
        movies.forEach((movie,index)=>{
            if(movie.id == id){
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    } else{
        res.status(500).json({error:'There was an error!'});
    }
});

module.exports = router;