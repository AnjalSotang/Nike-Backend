const {profile} = require("../models");

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



const updateProfile = async (req, res) => {
    let  id  = req.decoded.id;
    let {firstName, lastName, bio, dateOfBirth} = req.body;

    let image = req.file.path;

    const profiles = await profile.findOne({where:{userId: id}});
    if (!profiles) {
        console.log('Not found!');
        return res.status(404).json({
            message: "Profile Not Found!"
        });
    } else {
        const update = await profile.update(
            {firstName: firstName, lastName: lastName, bio: bio, dateOfBirth: dateOfBirth, imgae: image},
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



module.exports = {
    findProfileById,
    updateProfile
}