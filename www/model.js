const Language = 'CN';
var arptnameCol = 'airportName_CN';
switch (Language){
	case 'EN':
	   arptnameCol = 'airportName_EN';
	   break;
	default:
		break;
}

class LoginInfo {
	constructor(custNo, politNo, planNo, loginTime, expireTime) {
		this.custNo = custNo;
		this.politNo = politNo;
		this.planeNo = planNo;
		this.loginTime = loginTime;
		this.expireTime = expireTime;
	}
	getPrimaryKey() {
		return 'custNo';
	}
	//支持prototype调用或者airport对象实例调用
	getInsertSql(loginInfo) {
		if (loginInfo === undefined || loginInfo === null) {
			loginInfo = this;
		}
		return generateInsert(loginInfo, 'LoginInfo');
	}
	//支持prototype调用或者airport对象实例调用
	getUpdateSql(loginInfo) {
		if (loginInfo === undefined || loginInfo === null) {
			loginInfo = this;
		}
		return generateUpdate(loginInfo, 'LoginInfo', 'custNo');
	}
	getDeleteSql(custNo) {
		return "DELETE FROM LOGININFO WHERE custNo='" + custNo + "'";
	}
	getSelectByCustNo (custNo) {
		return "SELECT * FROM LOGININFO WHERE custNo='" + custNo + "'";
	}
	getSelectAll() {
		return "SELECT * FROM LOGININFO";
	}
	getCreateSql() {
		return `CREATE TABLE IF NOT EXISTS LOGININFO (
			custNo TEXT PRIMARY KEY NOT NULL,
			politNo TEXT,
			planeNo TEXT,
			loginTime TEXT, 
			expireTime TEXT
		)`;
	}
	getDeleteAll() {
		return `DELETE FROM LOGININFO`;
	}
}

class AirportInfo {
	constructor(airportNo, airportNameCN, airportNameEN, downloadFlag, airportAddr, airportPost) {
		this.airportNo = airportNo;
		this.airportNameCN = airportNameCN;
		this.airportNameEN = airportNameEN;
		this.downloadFlag = downloadFlag;
		this.airportAddr = airportAddr;
		this.airportPost = airportPost;
	}
	getInsertSql(airport) {
//		return generateInsert(airport, 'AirportInfo');
        let sql = `INSERT INTO AirportInfo(airportNo,airportNameCN,airportNameEN,downloadFlag,airportAddr,airportPost) 
        VALUES ('${airport.airportNo}','${airport.airportNameCN}','${airport.airportNameEN}',
        '${airport.downloadFlag}','${airport.airportAddr}','${airport.airportPost}')`
        return sql.replace(/\s+/g, ' ');
	}
	getUpdateSql(airport) {
//		return generateUpdate(airport, 'AirportInfo', 'airportNo');
        let sql = `UPDATE AirportInfo SET airportNo='${airport.airportNo}',airportNameCN='${airport.airportNameCN}',
            airportNameEN='${airport.airportNameEN}',downloadFlag='${airport.downloadFlag}',airportAddr='${airport.airportAddr}',
            airportPost='${airport.airportPost}' WHERE airportNo='${airport.airportNo}'`
        return sql;
	}
	getUpdateDownFlg(airport) {
	    let sql = `UPDATE AirportInfo SET downloadFlag='${airport.downloadFlag}' WHERE airportNo='${airport.airportNo}'`
	    return sql;
	}
	getDeleteSql(airportNo) {
		return `DELETE FROM AIRPORTINFO WHERE airportNo='${airportNo}'`.replace(/\s+/g, ' ');
	}
	getSelectByAirportNo (airportNo) {
		return `SELECT airportNo, ${arptnameCol} as airportName, downloadFlag, 
		  airportAddr, airportPost FROM AIRPORTINFO WHERE airportNo='${airportNo}'`.replace(/\s+/g, ' ');
	}
	getSelectByArptNameIn (airportNames) {
	    let sql = `SELECT airportNo, ${arptnameCol} as airportName, downloadFlag, 
               airportAddr, airportPost FROM AIRPORTINFO WHERE ${arptnameCol} in (`.replace(/\s+/g, ' ');
		for(var i = 0; i< airportNames.length;  i++) {
			sql += "'";
			sql += airportNames[i];
			sql += "',";
		}
		sql = sql.substr(0, sql.length - 1);
		sql += ")";
		return sql;
	}
	getSelectByDownloadFlag (flag) {
	    return `SELECT airportNo, ${arptnameCol} as airportName, downloadFlag, 
               airportAddr, airportPost FROM AIRPORTINFO WHERE downloadFlag='${flag}'`.replace(/\s+/g, ' ');
	}
	getSelectAll() {
		return `SELECT airportNo, ${arptnameCol} as airportName, downloadFlag, 
          airportAddr, airportPost FROM AIRPORTINFO`.replace(/\s+/g, ' ');
	}
	getSelectByName(airportName) {
		return `SELECT airportNo, ${arptnameCol} as airportName, downloadFlag, 
          airportAddr, airportPost FROM AIRPORTINFO WHERE airportName LIKE '%${airportName}%'`.replace(/\s+/g, ' ');
	}
	getCreateSql() {
		return `CREATE TABLE IF NOT EXISTS AIRPORTINFO (
			airportNo TEXT PRIMARY KEY NOT NULL,
			airportNameCN TEXT,
			airportNameEN TEXT,
			downloadFlag Boolean,
			airportAddr TEXT,
			airportPost TEXT
		)`;
	}
	getDeleteAll() {
		return `DELETE FROM AIRPORTINFO`;
	}
}

class MapInfo {
	constructor(mapCode, mapName, airportNo, mapType, mapDate, mapVersion, downloadFlag) {
		this.mapCode = mapCode;
		this.mapName = mapName;
		this.airportNo = airportNo;
		this.mapType = mapType;
		this.mapDate = mapDate;
		this.mapVersion = mapVersion;
		this.downloadFlag = downloadFlag;
	}
    getInsertSql(mapInfo) {
//      return generateInsert(mapInfo, 'MapInfo');
        let sql = `INSERT INTO MapInfo(mapCode,mapName,airportNo,mapType,mapDate,mapVersion,downloadFlag) 
            VALUES ('${mapInfo.mapCode}','${mapInfo.mapName}','${mapInfo.airportNo}',
            '${mapInfo.mapType}','${mapInfo.mapDate}','${mapInfo.mapVersion}','${mapInfo.downloadFlag}')`
        return sql;
    }
    getUpdateSql(mapInfo) {
//      return generateUpdate(mapInfo, '', 'MapInfo');
        let sql = `UPDATE SET mapCode='${mapInfo.mapCode}',mapName='${mapInfo.mapName}',airportNo='${mapInfo.airportNo}',
            mapType='${mapInfo.mapType}',mapDate='${mapInfo.mapDate}',mapVersion='${mapInfo.mapVersion}',
            downloadFlag='${mapInfo.downloadFlag}' WHERE mapCode='${mapInfo.mapCode}'`;
        return sql;
    }
    getSelectByMapCode (mapCode) {
        return `SELECT MAPINFO.*, AIRPORTINFO.${arptnameCol}, AIRPORTINFO.airportAddr, AIRPORTINFO.airportPost 
            FROM MAPINFO INNER JOIN AIRPORTINFO ON 
            MAPINFO.airportNo = AIRPORTINFO.airportNo WHERE mapCode='${mapCode}'`;
    }
    //按机场号和航图类型，查询已下载的航图
    getSelectByAirportNo (airportNo, mapType) {
        return `SELECT MAPINFO.*, AIRPORTINFO.${arptnameCol}, AIRPORTINFO.airportAddr, AIRPORTINFO.airportPost 
               FROM MAPINFO INNER JOIN AIRPORTINFO ON MAPINFO.airportNo = AIRPORTINFO.airportNo 
               WHERE MAPINFO.airportNo='${airportNo}' AND MAPINFO.mapType='${mapType}'`;
            
    }
	getSelectAll() {
		return "SELECT * FROM MAPINFO";
	}
	getCreateSql() {
		return `CREATE TABLE IF NOT EXISTS MAPINFO (
			mapCode TEXT PRIMARY KEY NOT NULL,
			mapName TEXT,
			airportNo TEXT,
			mapType TEXT,
			mapDate TEXT,
			mapVersion TEXT,
			downloadFlag Boolean
		)`;
	}
	getDeleteSql(mapCode) {
		return "DELETE FROM MAPINFO WHERE mapCode ='" + mapCode + "'";
	}
	getDeleteAll() {
		return `DELETE FROM MAPINFO`;
	}
}

//根据对象，生成插入语句
function generateInsert(model, tabName) {
	var sql = "";
//	var tabName = model.constructor.name.toUpperCase(); //获得构造函数名称
	//提取对象属性
	sql = 'INSERT INTO ' + tabName + '('
	for (var obj in model) {
		if (typeof model[obj] !== 'function') {
			sql += obj.toString();
			sql += ',';
		}
	}
	sql = sql.substr(0, sql.length - 1);
	sql += ') VALUES (';
	for (var obj in model) {
		if (typeof model[obj] !== 'function') {
			sql += "'";
			sql += model[obj];
			sql += "',";
		}
	}
	sql = sql.substr(0, sql.length - 1);
	sql += ')';
	return sql;
}

//生成更新语句，按照主键更新
function generateUpdate(model, tabName, primaryKey) {
	if (primaryKey === null || primaryKey === undefined) {
		throw 'model must has primaryKey';
	}
	var sql = "";
//	var tabName = model.constructor.name.toUpperCase(); //获得构造函数名称
	sql = 'UPDATE ' +  tabName + ' SET ';
	for (var key in model) {
		if (typeof model[key] !== 'function') {
			sql += key.toString();
			sql += "='";
			sql += model[key];
			sql += "',"
		}
	}
	sql = sql.substr(0, sql.length - 1);
	sql += ' WHERE ';
	sql += primaryKey;
	sql += "='";
	sql += model[primaryKey];
	sql += "'"
	return sql;
}


//function generateSelectByNameAndPass(username, password) {
//	var sqlStr = 'select * from Person where username = {username} and password = {password}'	;
//	var parmObj = new Object();
//	parmObj.username = username;
//	parmObj.password = password;
//	return formatSql(sqlStr, parmObj);
//}

//填充参数到自定义sql，参数为key-value表示的对象
function formatSql(sql, parmObj) {
	var sqlStr = sql;
	for (var key in parmObj) {
		if (parmObj[key] != undefined) {
			var reg = new RegExp("{" + key +"}", "g");
			sqlStr = sqlStr.replace(reg, '"' + parmObj[key] + '"');
		}
	}
	return sqlStr;
}

//export {LoginInfo, AirportInfo, MapInfo, formatSql, generateUpdate, generateInsert};