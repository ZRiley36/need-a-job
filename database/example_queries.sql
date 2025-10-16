-- lobbying --


-- hire --

SELECT organization, lobbying_firm, org_name, firm_name, city, state, zip_code
FROM hire h,
     organization o,
     lobbying_firm l
WHERE h.organization = o.filer_id
  AND h.lobbying_firm = l.filer_id;

-- lobby --

SELECT organization, lobbying_firm, org_name, firm_name, bill
FROM lobby l,
     organization o,
     lobbying_firm lf
WHERE l.organization = o.filer_id
  AND l.lobbying_firm = lf.filer_id;


-- employ --

SELECT org_name, organization, lobbyist, first_name, last_name, DD_PID
FROM organization o,
     employ e,
     lobbyist l,
     person p
WHERE e.lobbyist = l.filer_id
  AND e.organization = o.filer_id
  AND l.filer_id = p.filer_id;

select count(*) from lobbyist;

# office
SELECT *
FROM office;

# campaign
SELECT *
FROM campaign
         INNER JOIN person ON candidate = person.filer_id
         INNER JOIN office ON office = office.office_id;

# influence
SELECT *
FROM influence
         INNER JOIN campaign ON influence.campaign_id = campaign.campaign_id
         INNER JOIN person ON campaign.candidate = person.filer_id
         INNER JOIN office ON campaign.office = office.office_id;

# How much money did it take to get Keith Olberg elected?
SELECT SUM(expenditure.amount)
FROM person
         INNER JOIN candidate ON candidate.filer_id = person.filer_id AND first_name = 'Keith' AND
                                 last_name IN ('OLBERG', 'Olberg')
         INNER JOIN campaign ON candidate.filer_id = campaign.candidate
         INNER JOIN influence ON campaign.campaign_id = influence.campaign_id
         INNER JOIN expenditure on expenditure.filing_id = influence.filing_id and expenditure.line_item=influence.line_item;