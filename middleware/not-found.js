const notFoundMiddleware = (req,res)=>{
    res.status(404).send("Route dos not exist!!")
}

export default notFoundMiddleware;