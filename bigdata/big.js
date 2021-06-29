const fs = require('fs')
var mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bootcamp2021',
  database: 'songs_DB'
});
 

 
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);

    console.log('Succesfully connected!')
   pushSongs()
  });


function pushSongs() {
        fs.readFile('./TopSongs.csv', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }else{
            var array = data.toString().split("\n");

            var forDB = []
            for(let i in array) {
                forDB.push(array[i].split(','))
            }


            for(let s in forDB) {
               
            connection.query(
                    "INSERT INTO songs SET ?",{
                        id: forDB[s][0],
                        artist_name: forDB[s][1],
                        song_name: forDB[s][2],
                        year: forDB[s][3],
                        rawpop_total: forDB[s][4],
                        rawpop_usa:forDB[s][5],
                        rawpop_uk: forDB[s][6],
                        rawpop_eur: forDB[s][7],
                        raw_rest: forDB[s][8]
                    },function(err) {
                      if (err){
                          console.log('Some error',err)
                      }else
                      console.log("Your auction was created successfully!");
                    }
                  );   
              
            }
            
        }
    })

}