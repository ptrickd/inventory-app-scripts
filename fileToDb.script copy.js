//Scripts 

const fs = require('fs')


var db = connect('mongodb://localhost/test');


// db.movies.insertMany([
//     {
//         title: 'Titanic',
//         year: 1997,
//         genres: ['Drama', 'Romance']
//     },
//     {
//         title: 'Spirited Away',
//         year: 2001,
//         genres: ['Animation', 'Adventure', 'Family']
//     }
// ])
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


