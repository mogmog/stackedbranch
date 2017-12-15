CREATE VIEW uniqueCountryHandsetSightings
AS
select networks.network, networks.country, count(hplmn_id) from ltesighting join networks on ltesighting.hplmn_id = networks.id
group by network, country
order by 3 desc
