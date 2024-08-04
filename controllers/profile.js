const {profile} = require("../models");

const updateProfile = async (req, res) => {
    let  id  = req.decoded.id;
    let { bio, dateOfBirth} = req.body;

    let image = req.file.path;

    const profiles = await profile.findOne({where:{userId: id}});
    if (!profiles) {
        console.log('Not found!');
        return res.status(404).json({
            message: "Profile Not Found!"
        });
    } else {
         await profile.update(
            {bio: bio, dateOfBirth: dateOfBirth, imgae: image},
            {
                where: {
                    userId: id,
                },
            },
        );
        return res.status(500).json({
            message: "updated successfully"
        });
    }

}

const findProfileById = async (req, res) => {
    let userId = req.decoded.id;
    console.log(userId)
    const Profile = await profile.findOne({ where: { userId: userId } });
    if (profile === null) {
        console.log('Not found!');
    } else {
        res.send({
            Profile
        })
    }
}




module.exports = {
    findProfileById,
    updateProfile
}