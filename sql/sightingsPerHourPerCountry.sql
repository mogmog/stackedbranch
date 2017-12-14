CREATE VIEW sightingsPerHourPerCountry AS

WITH

    allSightings AS (
      SELECT extract(hour FROM ltesighting.timestamp)::int sighting_hour, country FROM ltesighting JOIN networks ON ltesighting.hplmn_id = networks.id
    ),

    hoursInADay AS (
      SELECT generate_series(0, 23) AS hour
    ),

    countries AS (
      SELECT distinct country from allSightings
    ),

    hoursXCountries AS (
      SELECT country, hour FROM countries, hoursInADay
    )

SELECT hoursXCountries.country, hour, COUNT(allSightings.sighting_hour)
FROM hoursXCountries LEFT JOIN allSightings
ON hoursXCountries.hour = allSightings.sighting_hour AND hoursXCountries.country = allSightings.country
GROUP BY hoursXCountries.country, hour
ORDER BY hoursXCountries.country, hour









