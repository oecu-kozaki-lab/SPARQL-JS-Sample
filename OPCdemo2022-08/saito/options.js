/* 
 * 詳細検索用の条件設定
 * 　・"id"の値が重複しないように注意
 *   ・データの数は必要に応じて増減してよい． 
 */
let search_cond =
  [
    {
      "id": "cond1",
      "ctext": "分類＝神社",
      "cond": "wdt:P31/wdt:P279*",
      "val": "wd:Q845945",
      "type": "ID",
      "const": true
    },
    {
      "id": "cond2",
      "ctext": "国（例：日本は「日本国」）",
      "cond": "wdt:P17",
      "val": "",
      "type": "getID",
      "const": false
    },
    {
      "id": "cond3",
      "ctext": "設立年（XXXX年以降，例：1000）",
      "cond": "FILTER(?opt4 >= \"####-01-01T00:00:00Z\"^^xsd:dateTime)",
      "val": "",
      "type": "REPLACE",
      "const": false
    },
    {
      "id": "cond4",
      "ctext": "設立年（XXXX年以前，例：1000）",
      "cond": "FILTER(?opt4 <= \"####-12-31T23:59:59Z\"^^xsd:dateTime)",
      "val": "",
      "type": "REPLACE",
      "const": false
    },
    {
      "id": "cond5",
      "ctext": "所在地（例：大阪府、大阪市など）",
      "cond": "wdt:P131/rdfs:label|wdt:P131/wdt:P131/rdfs:label",
      "val": "",
      "type": "STR-ja",
      "const": false
    }
  ];

let search_prop =
  [
    {
      "id": "opt1",
      "prop": "wdt:P17",
      "pname": "国",
      "optional": false
    },
    {
      "id": "opt2",
      "prop": "wdt:P18",
      "pname": "画像",
      "optional": true
    },
    {
      "id": "opt3",
      "prop": "wdt:P131",
      "pname": "位置する行政区画",
      "optional": false
    },
    {
      "id": "opt4",
      "prop": "wdt:P571",
      "pname": "成立日",
      "optional": false
    },
    {
      "id": "opt5",
      "prop": "",
      "pname": "",
      "optional": false
    }
  ];
