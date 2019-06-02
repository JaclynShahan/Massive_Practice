require("dotenv").config();
const express = require("express");
const massive = require ("massive");

 app = express();
 app.use(express.json());

app.get('/api/getPlanes', (req, res) => {
    const dbInstance = req.app.get('db') //gettin db connection assigning it to a var
    dbInstance.getPlanes() //this is my file name in db folder
    .then((resp) => {
        console.log(resp)
        res.status(200).send(resp)
    }).catch((err) => {
        console.log(err)
    })
})

app.post('/api/createPlane' , (req, res) => {
    const dbInstance = req.app.get('db')
    dbInstance.createPlane(req.body.type, req.body.count).then((resp) => {
        console.log(resp)
        //massive should always return at least an empty object
        res.status(200).send(resp)
    })
    .catch((err) => {
        console.log(err)
    })
})

app.delete('/api/deletePlane/:id', (req, res) => {
    const dbInstance = req.app.get('db')
    dbInstance.deletePlane(req.params.id).then(() => {
        console.log('deleted')
        res.status(200).send('deleted')
    })
})

app.put('/api/updatePlane/:id', (req, res) => {
    const dbInstance = req.app.get('db')
    dbInstance.updatePlane(req.body.type, req.body.count, req.params.id).then((resp) => {
        console.log(resp)
        res.status(200).send(resp)
    })
    .catch((err) => {
        console.log(err)
    })
})

const port = 3055;
massive(process.env.connectionString).then(db => {
    app.set('db', db)
    app.listen(port, () => console.log(`Server listening on port ${port}`))
})
