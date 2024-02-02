import Image from "../model/Image.js";
export const getAllUserImage = async (req,res) => {
    const id = req.params.id;
    try {
        const allUserImage = await Image.findAll({
            where:{user_id:id}
        })
        if(!allUserImage) return res.status(401).json({error:true,message:"user have no media"})
        res.status(200).json(allUserImage)
    } catch (error) {
        res.status(500).json({error:error,message:"internal server error"})
    }
}
