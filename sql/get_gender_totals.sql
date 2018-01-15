SELECT * FROM get_gender_totals(ARRAY[134], '2014-06-30', '2017-06-30');

CREATE OR REPLACE FUNCTION get_gender_totals(site_ids int[], from_sighting_date timestamp, to_sighting_date timestamp)

  RETURNS TABLE(__site_id int, __gender VARCHAR, __age_range VARCHAR, __visits int)
    AS $$
   BEGIN

 RETURN QUERY

  SELECT
      site_id,
      gender,
      age_range,
      COUNT(*) ::int AS count_visits
  FROM
      user_day_sighting_wide
  WHERE
      sighting_date <= to_sighting_date
  AND sighting_date >= from_sighting_date
  AND site_id IN (select unnest(site_ids))
  AND age_range NOT IN ('10-14',
                        '15-19')
  GROUP BY
      site_id,
      gender,
      age_range
  ORDER BY
      site_id,
      gender,
      age_range;


END;

$$ LANGUAGE plpgsql;
