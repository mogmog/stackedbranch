CREATE OR REPLACE FUNCTION get_gender(site_ids int[], from_sighting_date timestamp, to_sighting_date timestamp)

  RETURNS TABLE(__site_id int, __date_month VARCHAR, __gender VARCHAR, __age_range VARCHAR, __perc_visits DECIMAL(9,8), __scaled_visits int)
    AS $$
   BEGIN

CREATE TEMP TABLE temp_age_gender_a ( site_id INT, date_year VARCHAR, date_month VARCHAR,
  date_quarter VARCHAR, date_week VARCHAR, date_day VARCHAR, date_dow VARCHAR, gender VARCHAR,
  age_range VARCHAR, count_visits INT );

  CREATE TEMP TABLE temp_age_gender_b ( site_id INT, date_month VARCHAR, gender VARCHAR, age_range
  VARCHAR, count_visits INT, total_known_visits INT, total_visits_any INT );
  INSERT
  INTO
      temp_age_gender_a
  SELECT
      site_id,
      CAST(date_part('year' ,sighting_date) AS VARCHAR) AS date_year,
      CAST(date_part('year', sighting_date) AS VARCHAR) || CAST('-' AS VARCHAR) || RIGHT('0' || CAST
      (date_part('month', sighting_date) AS VARCHAR), 2) AS date_month,
      CAST(date_part('year', sighting_date) AS VARCHAR) || '-' || RIGHT('Q' || CAST(date_part
      ('quarter', sighting_date) AS VARCHAR), 2) AS date_quarter,
      CAST(
          CASE date_part('week', sighting_date)
              WHEN 53
              THEN date_part('year', sighting_date) - 1
              ELSE date_part('year', sighting_date)
          END AS VARCHAR) || '-' || 'W' || RIGHT('0' || CAST(date_part('week', sighting_date) AS
      VARCHAR), 2)                   AS date_week,
      CAST(sighting_date AS VARCHAR) AS date_day,
      CASE date_part('dow' ,sighting_date)
          WHEN 0
          THEN 'SUN'
          WHEN 1
          THEN 'MON'
          WHEN 2
          THEN 'TUE'
          WHEN 3
          THEN 'WED'
          WHEN 4
          THEN 'THU'
          WHEN 5
          THEN 'FRI'
          WHEN 6
          THEN 'SAT'
      END AS date_dow,
      gender,
      age_range,
      COUNT(*) AS count_visits
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
      sighting_date,
      gender,
      age_range
  ORDER BY
      site_id,
      sighting_date,
      gender,
      age_range;
  INSERT
  INTO
      temp_age_gender_b
  SELECT
      A.site_id,
      A.date_month,
      A.gender,
      A.age_range,
      A.count_visits,
      B.count_visits AS total_visits_known,
      C.count_visits AS total_visits_any
  FROM
      (
          SELECT
              site_id,
              date_month,
              gender,
              age_range,
              SUM(count_visits) AS count_visits
          FROM
              temp_age_gender_a
          WHERE
              gender IS NOT NULL
          AND age_range IS NOT NULL
          GROUP BY
              site_id,
              gender,
              age_range,
              date_month ) A
  JOIN
      (
          SELECT
              site_id,
              date_month,
              SUM(count_visits) AS count_visits
          FROM
              temp_age_gender_a
          WHERE
              gender IS NOT NULL
          AND age_range IS NOT NULL
          GROUP BY
              site_id,
              date_month ) B
  ON
      B.site_id = A.site_id
  AND B.date_month = A.date_month
  JOIN
      (
          SELECT
              site_id,
              date_month,
              SUM(count_visits) AS count_visits
          FROM
              temp_age_gender_a
          GROUP BY
              site_id,
              date_month ) C
  ON
      C.site_id = A.site_id
  AND C.date_month = A.date_month
  ORDER BY
      A.site_id,
      A.date_month,
      A.gender,
      A.age_range;


   RETURN QUERY
  SELECT
      site_id ,
      date_month ,
      gender ,
      age_range ,
      (count_visits :: DECIMAL / total_known_visits) :: DECIMAL(9,8) AS perc_visits,
      CASE
          WHEN (count_visits :: DECIMAL / total_known_visits * total_visits_any) >= 10
          THEN (count_visits :: DECIMAL / total_known_visits * total_visits_any) :: INT
          WHEN (count_visits :: DECIMAL / total_known_visits * total_visits_any) >= 5
          THEN 10
          ELSE 0
      END AS scaled_visits
  FROM
      temp_age_gender_b;
  DROP TABLE
      temp_age_gender_a;
  DROP TABLE
      temp_age_gender_b;

END;

$$ LANGUAGE plpgsql;







--SELECT * FROM get_gender(ARRAY [137, 138], '2016-01-01', '2016-03-30');
