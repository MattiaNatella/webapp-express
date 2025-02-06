import connection from "../data/data.js";
import setImagePath from "../middlewares/setImagePath.js";

//Index
const index = (req, res) => {
    const sql = `SELECT *
FROM movies;`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query al database fallita' });

        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })
        res.json(movies)
    });

}
//Show
const show = (req, res) => {

    const id = req.params.id
    const sql = `SELECT *
FROM movies M
JOIN reviews R ON M.id = R.movie_id
WHERE M.id = ?;`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Query al database fallita' })
        if (results.length == 0) return res.status(404).json({ error: 'Movie non trovato' })

        const movieObj = {
            id: results[0].id,
            title: results[0].title,
            genre: results[0].genre,
            release_year: results[0].release_year,
            abstract: results[0].abstract,
            image: results[0].image,
            created_at: results[0].created_at,
            updated_at: results[0].updated_at,
            reviews: []
        }
        console.log(results)
        results.forEach(item => {
            movieObj.reviews.push({
                id: item.id,
                name: item.name,
                vote: item.vote,
                text: item.text
            })
        })

        res.json(movieObj)
    })


}



export default {
    index,
    show
}