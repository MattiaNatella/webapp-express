import connection from "../data/data.js";


//Index
const index = (req, res) => {
    res.send('sono la rotta index')
}
//Show
const show = (req, res) => {
    const id = req.params.id
    res.send(`sono la rotta show all\'id:${id}`)
}

export default {
    index,
    show
}