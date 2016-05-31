var sqlite3 = require('sqlite3').verbose()
var fs = require('fs')
var db

function clean() {
  fs.unlink('yougerili.sqlite3', createDb)
}

function createDb() {
  console.log('create db')
  db = new sqlite3.Database('yougerili.sqlite3', createTable)
}

function createTable() {
  console.log('create table')
  db.run('create table if not exists user(id char(32) not null, name varchar(100) not null)', insertRow)
}

function insertRow() {
  console.log('insert row')
  var stmt = db.prepare('insert into user values(?, ?)')
  stmt.run('12312231231', 'fasfasfasfd')
  stmt.finalize(readRow)
}

function readRow() {
  console.log('read row')
  db.all('select * from user', function (err, rows) {
    rows.forEach(function (row) {
      console.log(row.id, row.name)
    })
    closeDb()
  })
}

function closeDb() {
  console.log('close db')
  db.close()
}

clean()
