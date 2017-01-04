# area-backend
省市区数据以及简单API

### 使用方法

#### 1.安装 mysql 可以参考官方文档 (这里以 homebrew 为例) 并配置

```
shell> brew install mysql
```

安装完成后, 按照提示登录数据库并修改 root 密码

```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```

重新登录

```
shell> mysql -u root -p
```

创建数据库, 并导入 sql 脚本 (脚本在 sql 目录中)

```
mysql> \. file_name
```

配置数据库连接信息 见 config 目录中的 db.yml


#### 2.启动 node server (记着 npm install 先)

```
shell> node server.js
```

#### 3.API

**目前地区选择器的做法, 只需要一个 API, 如下:**

- /areas/all

```json
[{
	"id": 110000,
	"name": "北京市",
	"level": 1,
	"children": [{
		"id": 110100,
		"name": "市辖区",
		"level": 2,
		"children": [
		    {
		      "id": 110101,
		      "name": "东城区",
		      "level": 3
		    }, {
			  "id": 110102,
			  "name": "西城区",
			  "level": 3
	        }
    // ... ...
```

**其他API:**

根据 provinceIds 查询省名称, 参数 provinceIds 格式 `provinceId, provinceIds, ...`
- /areas/province?provinceIds=110000,120000,140000

```json
[{"id":110000,"name":"北京市"},{"id":120000,"name":"天津市"},{"id":140000,"name":"山西省"}]
```

根据 provinceId 查询该省包含的所有城市 参数 provinceId
- /areas/city?provinceId=130000

```json
[{"id":130100,"name":"石家庄市"},{"id":130200,"name":"唐山市"},{"id":130300,"name":"秦皇岛市"},{"id":130400,"name":"邯郸市"},{"id":130500,"name":"邢台市"},{"id":130600,"name":"保定市"},{"id":130700,"name":"张家口市"},{"id":130800,"name":"承德市"},{"id":130900,"name":"沧州市"},{"id":131000,"name":"廊坊市"},{"id":131100,"name":"衡水市"}]
```

根据 cityId 查询该市包含的所有区县 参数 cityId
- /areas/area?cityId=140200

```json
[{"id":140201,"name":"市辖区"},{"id":140202,"name":"城　区"},{"id":140203,"name":"矿　区"},{"id":140211,"name":"南郊区"},{"id":140212,"name":"新荣区"},{"id":140221,"name":"阳高县"},{"id":140222,"name":"天镇县"},{"id":140223,"name":"广灵县"},{"id":140224,"name":"灵丘县"},{"id":140225,"name":"浑源县"},{"id":140226,"name":"左云县"},{"id":140227,"name":"大同县"}]
```

查询所有包含关键字的地址 参数 keyword 和 limit
- /areas/search?keyword=西安&limit=10

```json
[{"id":220403,"name":"吉林省 > 辽源市 > 西安区"},{"id":231005,"name":"黑龙江省 > 牡丹江市 > 西安区"},{"id":610101,"name":"陕西省 > 西安市 > 市辖区"},{"id":610102,"name":"陕西省 > 西安市 > 新城区"},{"id":610103,"name":"陕西省 > 西安市 > 碑林区"},{"id":610104,"name":"陕西省 > 西安市 > 莲湖区"},{"id":610111,"name":"陕西省 > 西安市 > 灞桥区"},{"id":610112,"name":"陕西省 > 西安市 > 未央区"},{"id":610113,"name":"陕西省 > 西安市 > 雁塔区"},{"id":610114,"name":"陕西省 > 西安市 > 阎良区"}]
```

参考资料:

- http://dev.mysql.com/doc/mysql-getting-started/en/
- https://dev.mysql.com/doc/refman/5.7/en/mysql-batch-commands.html