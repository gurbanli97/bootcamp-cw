# SOLUTIONS

### 1. List all the customers who live in any part of CAULFIELD. List only the Customer ID, full name, date of birth and suburb

```sql
SELECT
    CustomerID,
    CONCAT(Surname, ' ', Given) AS `full_name`,
    DOB,
    Suburb
FROM
    `customer`
WHERE
    Suburb LIKE '%CAULFIELD%'
```

### 2. List all of the active staff. Show their Staff ID, full name and weekly salary assuming that they work a 38 hour week

```sql
SELECT
    StaffID,
    CONCAT(Surname, ' ', Given) AS `full_name`,
    RatePerHour * 38 AS `weekly_salary`
FROM
    `staff`
WHERE
    Resigned IS NULL
```

### 3. Which plan has the most expensive contract to break?
```sql
SELECT
    `plan`.*
FROM
    `plan`
ORDER BY
    BreakFee
DESC
LIMIT 1 OFFSET 0
```
### 4. Which brands of mobile phone does this company sell? List only the unique brand names (3marks)

```sql
SELECT
    BrandName
FROM
    `mobile`
GROUP BY
    BrandName
```
OR

```sql
SELECT
    DISTINCT BrandName
FROM
    `mobile`
```
### 5. Which customer is not able to purchase a phone? Use a query to explain why. Hint: Review the customer data
```sql
SELECT
    *
FROM
    customer
LEFT JOIN mobile ON mobile.CustomerID = customer.CustomerID
WHERE
    mobile.CustomerID IS NULL
```

```
These customers never purchased for mobile as their data doesn't exist in the mobile table
```
### 6. How many of each phone plan have been sold?

```sql
SELECT
    mobile.PlanName,
    COUNT(*) AS cnt
FROM
    mobile
GROUP BY
    mobile.PlanName
ORDER BY
    cnt DESC
```
### 7. What is the average age of an Apple phone user?

```sql
SELECT
    ROUND(
        AVG(
            YEAR(NOW()) - YEAR(customer.DOB))
        )
    FROM
        `mobile`
    INNER JOIN customer ON customer.CustomerID = mobile.CustomerID
    WHERE
        BrandName = 'Apple'
```
### 8. What are the first and most recent mobile phone purchases?

```sql
SELECT
    mobile.BrandName,
    COUNT(*) AS cnt
FROM
    `mobile`
GROUP BY
    BrandName
ORDER BY
    joined ASC,
    cnt
DESC
LIMIT 1 OFFSET 0
```

### 9. i. For calls made in 2018 how many calls were made on the weekend?

```sql
SELECT
    COUNT(*) AS weekend_calls_count
FROM
    `calls`
WHERE
    YEAR(CallDate) = 2018 AND WEEKDAY(CallDate) IN(5, 6)
```

###    ii. For calls made in 2018 how many calls were made on each day of the weekend?

```sql
SELECT
    WEEKDAY(CallDate) AS week_day,
    COUNT(*) AS total_calls
FROM
    `calls`
WHERE
    YEAR(CallDate) = 2018
GROUP BY
    WEEKDAY(CallDate)
```

### 10. Provide a listing of the utilization of each tower and its location i.e. how busy each tower is based on the number of connections. Put the busiest tower at the top of the list

```sql
SELECT
    tower.*,
    COUNT(*) AS tower_connects
FROM
    `connect`
INNER JOIN tower ON tower.TowerID = connect.TowerID
GROUP BY
    connect.TowerID
ORDER BY
    tower_connects
DESC
```

### 11. Did any users on the ‘Large’ plan exceed their monthly allowance during August 2018?

```sql
SELECT
    mobile.CustomerID,
    SUM(calls.CallDuration) AS total_calls_duration,
    plan.PlanDuration
FROM
    plan
INNER JOIN mobile ON mobile.PlanName = plan.PlanName
INNER JOIN calls ON calls.MobileID = mobile.MobileID
WHERE
    plan.PlanName = 'Large' AND YEAR(calls.CallDate) = 2018 AND MONTH(calls.CallDate) = 8
GROUP BY
    mobile.CustomerID
HAVING
    total_calls_duration > PlanDuration
ORDER BY
    mobile.CustomerID
```

### 12. The company is upgrading all their 3G towers from to 5G. 
### i. How many towers will be upgraded? (1 mark)
```sql
SELECT
    COUNT(*) AS tower_count
FROM
    `tower`
WHERE
    SignalType = '3G'
```
### ii. what SQL will be needed to update the database to reflect the upgrades?

```sql
UPDATE
    `tower`
SET
    SignalType = '5G'
WHERE
    SignalType = '3G'
```

### 13. i. List the full name, join date, resigned date of each staff member and name, join date and resigned date of their manager

```sql
SELECT
    CONCAT(s1.Surname, ' ', s1.Given) AS staff_fullname,
    s1.Joined,
    s1.Resigned,
    CONCAT(s2.Surname, ' ', s2.Given) AS manager_fullname,
    s2.Joined AS managerJoined,
    s2.Resigned AS managerResigned
FROM
    staff AS s1
LEFT JOIN staff AS s2
ON
    s1.SupervisorID = s2.StaffID
WHERE
    s1.SupervisorID > 0
```
### ii. What do you observe with the data?

```
I observe that there are only two managers and others are staff.
```

### 14. How much revenue was generated in 2017 by each plan from call charges. Format the output as currency i.e. $123.45

```sql
SELECT
    plan.PlanName,
    CONCAT(
        '$',
        IF(
            plan.CallCharge > 0,
            (plan.CallCharge / 100) * SUM(calls.CallDuration),
            plan.MonthlyFee * COUNT(DISTINCT mobile.CustomerID) * COUNT(DISTINCT MONTH(calls.CallDate))
        )
    ) AS revenue
FROM
    plan
INNER JOIN mobile ON mobile.PlanName = plan.PlanName
INNER JOIN calls ON calls.MobileID = mobile.MobileID
WHERE
    YEAR(calls.CallDate) = 2017
GROUP BY
    plan.PlanName
```

### 15. List the customers who made phone calls longer than 200 minutes (5marks)

```sql
SELECT
    customer.CustomerID,
    CONCAT(
        customer.Surname,
        ' ',
        customer.Given
    ) AS customer_full_name,
    SUM(calls.CallDuration) AS call_duration
FROM
    `calls`
INNER JOIN mobile ON mobile.MobileID = calls.MobileID
INNER JOIN customer ON customer.CustomerID = mobile.CustomerID
GROUP BY
    customer.CustomerID
HAVING
    call_duration > 200
```

### 16. Which customers have more than one mobile phone? List the customer name, suburband state. Order by the customer name

```sql
SELECT
    COUNT(*) AS cnt,
    customer.Given,
    customer.Suburb,
    customer.State
FROM
    mobile
INNER JOIN customer ON customer.CustomerID = mobile.CustomerID
WHERE
    mobile.Cancelled IS NULL
GROUP BY
    customer.CustomerID
HAVING
    cnt > 1
ORDER BY
    customer.Given ASC
```
### 17. Are there any mobile phone plans that are currently unused? This can be obtained a number of ways. Demonstrate this by using the following two query types 
### i. Nested subquery

```sql
SELECT
    *
FROM
    plan
WHERE
    PlanName NOT IN(
    SELECT
        PlanName
    FROM
        mobile
    WHERE
        Cancelled IS NULL
)
```
### ii. Outer join

```sql
SELECT
    *
FROM
    plan
LEFT JOIN mobile ON mobile.PlanName = plan.PlanName
WHERE
    mobile.PlanName IS NULL
```

### 18. List the oldest and the youngest customers in the postcodes 3000 and 3102. Show the customer full name age and suburb details

```sql
SELECT
    CONCAT(
        customer.Surname,
        ' ',
        customer.Given
    ) AS full_name,
    YEAR(NOW()) - YEAR(customer.DOB) AS age,
    customer.Suburb
FROM
    (
    SELECT
        MIN(customer.DOB) AS mini,
        MAX(customer.DOB) AS maxi
    FROM
        `customer`
    WHERE
        Postcode IN(3000, 3102)
) AS t
INNER JOIN customer ON customer.DOB = t.mini OR customer.DOB = t.maxi
```

### 19. i.Create a view that shows the popularity of each phone colour (1 mark)

```sql
CREATE VIEW `PhoneColorPopularity` AS SELECT
    COUNT(0) AS `cnt`,
    `mobile`.`PhoneColour` AS `PhoneColour`
FROM
    `mobile`
GROUP BY
    `mobile`.`PhoneColour`
ORDER BY
    `cnt`
DESC 
```

### ii. Use this view in a query to determine the least popular phone colour
```sql
SELECT
    PhoneColour
FROM
    `PhoneColorPopularity`
ORDER BY
    cnt ASC
LIMIT 1 OFFSET 0
```
### 20. The billing team is getting returned mail because of bad customer addresses. This is causing a loss in revenue.
### i. Review the customer data and find at least 3 issues

```sql
SELECT
    *
FROM
    `customer`
WHERE
    Postcode IS NULL OR Postcode = '' OR Address IS NULL OR Address = '' OR Suburb IS NULL OR Suburb = '' OR State IS NULL OR State = ''
```

### ii. Provide the SQL statements to correct the data problems

```sql
UPDATE
`customer`
SET Postcode = '????'
WHERE
    Postcode IS NULL OR Postcode = ''
```