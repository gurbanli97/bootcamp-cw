--1. List all the customers who live in any part of CAULFIELD. List only the Customer ID, full name, date of birth and suburb

--2. List all of the active staff. Show their Staff ID, full name and weekly salary assuming that they work a 38 hour week
SELECT
    StaffID,
    CONCAT(Surname, ' ', Given) AS `full_name`,
    RatePerHour * 38 AS `weekly_salary`
FROM
    `staff`
WHERE
    Resigned IS NULL


--3. Which plan has the most expensive contract to break?

SELECT * FROM `plan`
order by BreakFee desc
limit 0,1;

--4. Which brands of mobile phone does this company sell? List only the unique brand names (3marks)
SELECT brandname FROM `mobile`
group by BrandName;


--5. Which customer is not able to purchase a phone? Use a query to explain why. Hint: Review the customer data
SELECT * FROM `customer` 
left join mobile on mobile.CustomerID = customer.CustomerID
where mobile.CustomerID is null

--6. How many of each phone plan have been sold?
SELECT PlanName,count(*) as quant FROM `mobile`
group by PlanName
order by quant desc;

--7. What is the average age of an Apple phone user?

SELECT Round(AVG(YEAR(NOW()) - YEAR(customer.DOB)))FROM `mobile`
inner join customer ON customer.CustomerID = mobile.CustomerID
where BrandName = 'Apple';

--8. What are the first and most recent mobile phone purchases?

SELECT mobile.BrandName, COUNT(*) AS quant FROM `mobile` 
group by BrandName
order by joined asc, quant desc
limit 0,1;

--9. i. For calls made in 2018 how many calls were made on the weekend?
SELECT * FROM `calls`
where year(CallDate) = 2018 and weekday(CallDate) in (5,6);

--   ii. For calls made in 2018 how many calls were made on each day of the weekend?

SELECT WEEKDAY(CallDate) AS week_day, COUNT(*) AS total_calls FROM `calls`
where year(CallDate) = 2018
group by WEEKDAY(CallDate);

--10. Provide a listing of the utilization of each tower and its location i.e. how busy each tower is based on the number of connections. Put the busiest tower at the top of the list

--11. Did any users on the ‘Large’ plan exceed their monthly allowance during August 2018?

--12. The company is upgrading all their 3G towers from to 5G. 
--i. How many towers will be upgraded? (1 mark)

--ii. what SQL will be needed to update the database to reflect the upgrades?

--13. i. List the full name, join date, resigned date of each staff member and name, join date and resigned date of their manager

--ii. What do you observe with the data?

--14. How much revenue was generated in 2017 by each plan from call charges. Format the output as currency i.e. $123.45

--15. List the customers who made phone calls longer than 200 minutes (5marks)

--16. Which customers have more than one mobile phone? List the customer name, suburband state. Order by the customer name

--17. Are there any mobile phone plans that are currently unused? This can be obtained a number of ways. Demonstrate this by using the following two query types 
--i. Nested subquery

--18. List the oldest and the youngest customers in the postcodes 3000 and 3102. Show the customer full name age and suburb details

--19. i.Create a view that shows the popularity of each phone colour (1 mark)

--ii. Use this view in a query to determine the least popular phone colour

--20. The billing team is getting returned mail because of bad customer addresses. This is causing a loss in revenue.
--i. Review the customer data and find at least 3 issues

--ii. Provide the SQL statements to correct the data problems