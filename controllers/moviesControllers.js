import connection from "../data/data.js";
import setImagePath from "../middlewares/setImagePath.js";

//Index
const index = (req, res) => {
    const sql = `SELECT movies.*, ROUND(AVG(reviews.vote), 0) as average_vote
FROM movies
JOIN reviews ON movies.id = reviews.movie_id
GROUP BY movies.id;`

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
    const sql = `SELECT movies.*, ROUND(AVG(reviews.vote), 0) as average_vote, reviews.text, reviews.name, reviews.vote as user_vote
    FROM movies
    JOIN reviews ON movies.id = reviews.movie_id
    WHERE movies.id = ?
    GROUP BY movies.reviews.id;`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Query al database fallita' })
        if (results.length == 0) return res.status(404).json({ error: 'Movie non trovato' })

        const movieObj = {
            id: results[0].id,
            title: results[0].title,
            director: results[0].director,
            average_vote: results[0].average_vote,
            genre: results[0].genre,
            release_year: results[0].release_year,
            abstract: results[0].abstract,
            image: req.imagePath + results[0].image,
            created_at: results[0].created_at,
            updated_at: results[0].updated_at,
            reviews: []
        }
        console.log(results)
        results.forEach(item => {
            movieObj.reviews.push({
                id: item.id,
                name: item.name,
                vote: item.user_vote,
                text: item.text
            })
        })

        res.json(movieObj)
    })


}

const storeReview = (req, res) => {
    const id = req.params.id
    const { name, text, vote } = req.body

    const sql = 'INSERT INTO reviews (name, text, vote, movie_id) VALUES(?, ?, ?, ?);'

    connection.query(sql, [name, text, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Query al database fallita' });
        console.log(results)
        res.status(201).json({ message: 'Review added' })
    })
}



export default {
    index,
    show,
    storeReview
}