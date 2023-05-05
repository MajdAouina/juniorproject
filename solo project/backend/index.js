import Express from "express";
import mysql from "mysql"
import cors from "cors"

const app = Express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"soloprj",
})

app.use(Express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("backend")
})

app.get("/films", (req, res) => {
    const q = "SELECT * FROM films"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/films", (req, res) => {
    const q = "INSERT INTO films (`title`,`desc`,`pic`)VALUES(?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.pic,
    ];

    db.query(q, [values], (err, data) => {
        if (err){
            return res.json(err);
        } 
        else {
            return res.json("film created");
        }
    });
});
app.delete("/films:id",(req,res)=>{
    const movieid= req.params.id
    const q="DELETE FROM films WHERE id= ?"

    db.query(q,[movieid],(err,data)=>{
    if (err) return res.json(err)
    return res.json("movie deleted")
    })
})

app.put("/films:id",(req,res)=>{
    const movieid= req.params.id
    const q="UPDATE films SET `title`=?,`desc`=?,`pic`=? where id=?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.pic,
    ];
    db.query(q,[...values,movieid],(err,data)=>{
    if (err) return res.json(err)
    return res.json("Updated")
    })
})

app.listen(8800, () => {
    console.log("connected");
});
