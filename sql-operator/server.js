const {sequelize} = require('./models');
const {Op, Sequelize,QueryTypes} = require('sequelize')
const express = require('express')

const models = require('./models')
const app = express()



app.get('/q1', async (req,res) => {
  /*   SELECT
    CustomerID,
    CONCAT(Surname, ' ', Given) AS `full_name`,
    DOB,
    Suburb
FROM
    `customer`
WHERE
    Suburb LIKE '%CAULFIELD%' */

    var result = await models.Customer.findAll({
        attributes: ['CustomerID','DOB','Suburb',Sequelize.literal("CONCAT(Surname, ' ', Given) AS `full_name`")],
        where: {
            Suburb: {
                [Op.like]: '%CAULFIELD%'
            }

        }
    })
    res.status(200).json(result)
})




app.get("/q2" , async function(req ,  res) {

            /* SELECT
            StaffID,
            CONCAT(Surname, ' ', Given) AS `full_name`,
            RatePerHour * 38 AS `weekly_salary`
        FROM
            `staff`
        WHERE
            Resigned IS NULL */
    var result  =  await models.Staff.findAll({
        attributes: [
            "StaffID" , 
            [Sequelize.fn('CONCAT', Sequelize.literal("Surname, ' ', Given") ), 'full_name'], 
            [Sequelize.literal('RatePerHour*38'), 'weekly_salary'] 
        ] ,
        where : {
            Resigned : {
                [Op.is] : null , 
            }
        } 
    });
    res.json(result) ; 
} ); 


  app.get('/q3',async (req,res) =>{
        /*   SELECT
            `plan`.*
        FROM
            `plan`
        ORDER BY
            BreakFee
        DESC
        LIMIT 1 OFFSET 0 */

       var result = await models.Plan.findAll({
        order: [
            ['BreakFee', 'DESC'],
        ],
        limit: 1,
        offset: 0
      })

      console.log(result)
      res.status(200).json(result)
  })


  app.get('/q4',async (req,res) =>{
            /* SELECT
            BrandName
        FROM
            `mobile`
        GROUP BY
            BrandName */
      var result = await models.Mobile.findAll({
          attributes: ['BrandName'],
          group: 'BrandName'

      })

      console.log(result)
      res.status(200).json(result)
  })


  app.get('/q5', async(req,res) => {

            /* SELECT
                *
         FROM
            customer
        LEFT JOIN mobile ON mobile.CustomerID = customer.CustomerID
        WHERE
            mobile.CustomerID IS NULL */

            var result = await models.Customer.findAll({
                where: {
                  "$Mobiles.CustomerID$": null,
                },
                include: {
                  model: models.Mobile,
                  required: false,
                },
              });
      res.status(200).json(result)
  })

  app.get('/q6', async(req,res) => {

            /* SELECT
            mobile.PlanName,
            COUNT(*) AS cnt
        FROM
            mobile
        GROUP BY
            mobile.PlanName
        ORDER BY
            cnt DESC*/

            var result = await models.Mobile.findAll({
                attributes: ["PlanName", [Sequelize.fn("COUNT", Sequelize.col('*')), "cnt"]],
                group: "PlanName",
                order: [[ Sequelize.col("cnt") , "DESC"]],
              });

        res.status(200).json(result)
})


app.get('/q7', async (req,res) => {
        /* SELECT
        ROUND(
            AVG(
                YEAR(NOW()) - YEAR(customer.DOB))
            )
        FROM
            `mobile`
        INNER JOIN customer ON customer.CustomerID = mobile.CustomerID
        WHERE
            BrandName = 'Apple' */
            var result = await sequelize.query(
                "SELECT ROUND(AVG(YEAR(NOW()) - YEAR(customer.DOB))) FROM `mobile` INNER JOIN customer ON customer.CustomerID = mobile.CustomerID WHERE BrandName = 'Apple'", { type: QueryTypes.SELECT });
            res.json(result);


    res.status(200).json(result)
})


app.get("/q10", async (req, res) => {

        /* SELECT
        tower.*,
        COUNT(*) AS tower_connects
    FROM
        `connect`
    INNER JOIN tower ON tower.TowerID = connect.TowerID
    GROUP BY
        connect.TowerID
    ORDER BY
        tower_connects
    DESC */
    var result = await models.Connect.findAll(
      {
        attributes: [
          "Tower.*",
          [Sequelize.fn("COUNT", Sequelize.col("*")), "tower_connects"],
        ],
        include: {
          model: models.Tower,
          require: true,
        },
        group: "TowerID",
        order: [[Sequelize.col("tower_connects"), "DESC"]],
      }
    );
    res.json(result);
  });




 /*  app.get("/q11", async (req, res) => {
    var result = await models.Plan.findAll(
      {
        attributes: {
          include: [
            "Mobiles.CustomerID",
            [Sequelize.fn("COUNT", Sequelize.col("Calls.CallDuration")), "total_calls_duration"],
            "Plan.PlanDuration",
          ]
        },
        where: {
          [Op.and]: [
            Sequelize.where(Sequelize.col("Plan.Planname"), "=", "Large"),
            Sequelize.where(Sequelize.fn("YEAR", Sequelize.col("Calls.CallDate")), "=", 2018),
            Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("Calls.Calldate")), "=", 8)
          ],
        },
        include: [
          {model: models.Mobile, require: true, attributes: [
            "CustomerID"
          ]},
          {model: models.Calls, require: true, attributes: [
            "CallDuration"
          ]},
        ],
        group: Sequelize.col("Mobiles.CustomerID"),
        having: Sequelize.literal("total_calls_duration > PlanDuration"),
        order: [[Sequelize.col("Mobiles.CustomerID"), "DESC"]],
      }
    );
    res.json(result);
  }); */

  app.get("/q12" , async function(req,res){
    var result =  await models.Tower.findAll({
        attributes: [[Sequelize.fn("COUNT" , Sequelize.col("*")) , "tower_count"]] , 
        where: {
            SignalType: "3G" ,
        }
    }); 
    res.json(result);
}); 
app.get("/q12/2" , async function(req,res){
    var result =  await models.Tower.update(
        {
            SignalType: "5G" 
    },
    {
        where: {
            SignalType: "3G" ,
        }
    }); 
    res.json(result);
});
  
app.listen(3000,function(){
    console.log("App listening on PORT ");
})