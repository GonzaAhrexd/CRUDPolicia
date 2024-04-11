export const validateSchema = ( schema ) => (req, res, next) =>{
    try{
        schema.parse(req.body)
        next()
    }catch(error){

        return res
        .status(400)
        //@ts-ignore
        .json({ error: error.errors.map((error) => error.message )})


    }
}
