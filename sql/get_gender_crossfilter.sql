drop function get_gender_crossfilter(site_ids int[])

create or replace function get_gender_crossfilter(site_ids int[]) returns TABLE(__site_id int, __sighting_date date, __gender varchar, __age_range varchar, __count integer)
	language plpgsql
as $$
BEGIN
 RETURN QUERY

   select site_id, sighting_date, gender, age_range, count(1)::int from user_day_sighting_wide
  where gender is not null and age_range is not null and site_id in (select unnest(site_ids))
 group by site_id, sighting_date, gender, age_range
 order by site_id, sighting_date;

END;
$$
;



SELECT * FROM get_gender_crossfilter(ARRAY[134])
