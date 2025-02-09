const connection = require('../data/db')

//index
const index = (req, res) => {
  const sql = ` SELECT M.*, ROUND(AVG(R.vote),1) AS average_vote
  FROM movies M
  LEFT JOIN reviews R ON M.id = R.movie_id
  GROUP BY M.id
  ORDER BY M.id`;

  connection.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Errore query al database' });

    const movies = result.map(movie => {
      return {
        ...movie,
        image: req.imagePath + movie.image
      }
    })

    res.json(movies)
  })
}

//show
const show = (req, res) => {
  const id = req.params.id;

  const sql = `SELECT M.*, ROUND(AVG(R.vote),1) AS average_vote
  FROM movies M
  LEFT JOIN reviews R ON M.id = R.movie_id
  WHERE M.id = ?`

  const sqlReviews = `SELECT *
  FROM reviews R
  WHERE R.movie_id = ?`

  //query film
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore query al database' });
    if (results.lenght === 0 || results[0].id === null) return res.status(404).json({ error: 'Film non trovato' })

    //query recensioni
    connection.query(sqlReviews, [id], (err, resultsReviews) => {
      if (err) return res.status(500).json({ error: 'Errore query al database' });
      console.log(resultsReviews)

      const movie = results[0]
      res.json({
        ...movie,
        image: req.imagePath + movie.image,
        reviews: resultsReviews
      })

    })

  })

}

module.exports = {
  index,
  show
}