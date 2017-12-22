DROP FUNCTION IF EXISTS get_sightings_by_hour(text[]);

CREATE OR REPLACE FUNCTION get_sightings_by_hour ( smallcell_ids text[])
 RETURNS TABLE (
 __hour int,
 __country text,
  __count int
)
AS $$
BEGIN
 RETURN QUERY

  WITH allsightings AS (
  SELECT
    (date_part('hour'::text, ltesighting."timestamp"))::integer AS sighting_hour,
     smallcell_id, networks.network, networks.country FROM ltesighting JOIN networks ON ltesighting.hplmn_id = networks.id
     where smallcell_id in (select unnest(smallcell_ids))
  ),

    hoursinaday AS (
         SELECT generate_series(0, 23) AS hour
  ),

  countries AS (
    SELECT distinct country from networks
  ),

   hoursXCountry AS (
    SELECT hour as _hour, country as _country from hoursinaday, countries
   )

 SELECT _hour::int as __hour, _country::text as __country, count(sighting_hour)::int as __count FROM hoursXCountry LEFT JOIN allsightings on hoursXCountry._hour = sighting_hour and hoursXCountry._country = country
 group by hoursXCountry._hour, hoursXCountry._country
 order by hoursXCountry._country, hoursXCountry._hour;

END; $$

LANGUAGE 'plpgsql';

SELECT * from get_sightings_by_hour(ARRAY['000295-0200006097', '000295-0200006098']);
