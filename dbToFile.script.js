//Scripts 

const fs = require('fs')

var db = connect('mongodb://localhost/test');

const dbToFile = () => {
    var movies = db.movies.find()

    let moviesObj = []
    movies.forEach(({ title, year, genres }) => {
        moviesObj.push({
            title: title,
            year: year,
            genres: genres
        })
    })

    const writeToFile = (arg) => fs.writeFile('db.txt', arg, (err) => {
        if (err) throw err
    })

    writeToFile(JSON.stringify(moviesObj))

}

dbToFile()


