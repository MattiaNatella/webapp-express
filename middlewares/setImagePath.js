const setImagePath = (req, res, next) => {
    req.imagePath = `${req.protocol}://${req.get('host')}/movies_cover/`
    next()
}

export default setImagePath