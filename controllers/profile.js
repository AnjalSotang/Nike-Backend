const {profile} = require("../models");

const updateProfile = async (req, res) => {
    let  id  = req.decoded.id;
    let  {username, bio, dateOfBirth} = req.body;

    let image = req.file.path;

    const profiles = await profile.findOne({where:{userId: id}});
    if (!profiles) {
        return res.status(404).json({
            message: "Profile Not Found!"
        });
    } else {
            await profile.update(
            {username: username, bio: bio, dateOfBirth: dateOfBirth, imgae: image},
            {
                where: {
                    userId: id,
                },
            },
        );
        return res.status(200).json({
            message: "updated successfully"
        });
    }

}

const findProfileById = async (req, res) => {
    let userId = req.decoded.id;
    console.log(userId)
    const Profile = await profile.findOne({ where: { userId: userId } });
    if(!profile) {
       return res.status(500).json({
            message: "Profile Not Found"
        });
        
    } else {
        return res.status(200).json({
            Profile
        });
    }
}



module.exports = {
    findProfileById,
    updateProfile
}