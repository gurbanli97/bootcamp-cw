const { User } = require('./models');
const { Op } = require('sequelize');


(async () =>   {
    var result = await User.findAll({
        attributes: ['id','username'],
        where: {
            id: {
                [Op.lt]: 2
            },
            firstName: {
                [Op.substring]: 'el'
            }
        }
    })



    var result = await Country.update(
            { countryName: 'Aze' },
             { where: { id: 1 } }
    )

    console.log(result)
})();

/* User.bulkCreate([
    {
        firstName: 'Ali',
        lastName: 'Gurbanli',
        username: 'gurbanli97'
    },
    {
        firstName: 'Aytac',
        lastName: 'Mahammadli',
        username: 'amahammadli'
    }
]).then(function(result){
    console.log(result)
}) */