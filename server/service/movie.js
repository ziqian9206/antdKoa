const mongoose = require('mongoose')
const Movies = mongoose.model('Movie')
export const getAllMovies = async(type,year)=>{
    let query = {}

    if(type){
        query.movieTypes = {
            $in:[type]
        }
    }

    if(year){
        query.year = year
    }

    const movies = await Movies.find(query)
    return movies
}

export const getMovieDetail = async(id)=>{
    const movie = await Movies.findOne({_id:id})
    return movie
}

export const getRelativeMovies = async(movie)=>{
    const movie = await Movies.findOne({
        movieTypes:{
            $in:movie.movieTypes
        }
    })
    return movie
}
