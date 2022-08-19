/* 
 * 詳細検索用の条件設定
 * 　・"id"の値が重複しないように注意
 *   ・データの数は必要に応じて増減してよい． 
 */

let search_cond = 
[
  {
    "id": "cond1",
    "ctext": "分類=日本の城",
    "cond": "wdt:P31",
    "val": "wd:Q92026",
    "type": "ID",
    "const": true
  },
  {
    "id": "cond2",
    "ctext": "創設者",
    "cond": "wdt:P112/rdfs:label",
    "val": "",
    "type": "STR-ja",
    "const": false
  },
  {
    "id": "cond3",
    "ctext": "成立日",
    "cond": "FILTER(?opt4 >= \"####-01-01T00:00:00Z\"^^xsd:dateTime)",
    "val": "",
    "type": "REPLACE",
    "const": false
  },
  {
    "id": "cond4",
    "ctext": "",
    "cond": "",
    "val": "",
    "type": "ID",
    "const": false
  },
  {
    "id": "cond5",
    "ctext": "",
    "cond": "",
    "val": "",
    "type": "ID",
    "const": false
  }
];

let search_prop = 
[
  {
    "id": "opt1",
    "prop": "wdt:P131",
    "pname": "位置する行政区画",
    "optional": true
  },
  {
    "id": "opt2",
    "prop": "wdt:P112",
    "pname": "創設者",
    "optional": true
  },
  {
    "id": "opt3",
    "prop": "wdt:P18",
    "pname": "画像",
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
