'use strict';
let connection = require('../common/db/connection');

let specialIds = ['110000', '120000', '500000', '310000'];

function search(keyword, limit){
	let sql = `select id, address as name from (
	
			select p.provinceID as id, concat(p.province) as address 
			from province p 
	
			union all
	
			select c.cityID as id, concat(p.province, ' > ' ,c.city) as address 
			from province p 
			right join city c on p.provinceID = c.fatherID where c.city != '县' & c.city != '市辖区' & c.city != '市'
	
			union all
	
			select a.areaID as id,
            CASE c.city
                WHEN '县' THEN concat(p.province, ' > ' ,a.area) 
                WHEN '市辖区' THEN concat(p.province, ' > ' ,a.area) 
                WHEN '市' THEN concat(p.province, ' > ' ,a.area) 
                ELSE concat(p.province, ' > ' ,c.city, ' > ' ,a.area) 
            END as address 
			from province p 
			right join city c on p.provinceID = c.fatherID 
			right join area a on c.cityID = a.fatherID
			
			) as addr
			
			where addr.address like '%${keyword}%' limit ${limit}`;

	return connection.createStatement(sql);
}


function city(provinceId) {
	let sql = `select cityID as id, city as name from city where fatherID = ${provinceId}`;

	if (specialIds.indexOf(provinceId) !== -1) {
		sql = `select a.areaID as id, a.area as name from 
		(select cityID from city where fatherID = ${provinceId}) as c left join area a on c.cityID = a.fatherID`;
	}

	return connection.createStatement(sql);
}

function province(provinceIds) {
	let sql = `select provinceID as id, province as name from province where provinceID in (${provinceIds})`;
	if(!provinceIds) {
		sql = `select provinceID as id, province as name from province`;
	}
	return connection.createStatement(sql);
}

function area(cityId) {
	let sql = `select areaID as id, area as name from area where fatherID = ${cityId}`;
	return connection.createStatement(sql);
}

module.exports = {
	test: connection.createStatement('SELECT 1'),
	search: search,
	area: area,
	city: city,
	province: province
};
