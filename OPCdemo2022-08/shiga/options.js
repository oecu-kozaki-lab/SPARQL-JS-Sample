/* 
 * 詳細検索用の条件設定
 * 　・"id"の値が重複しないように注意
 *   ・データの数は必要に応じて増減してよい． 
 */
let search_cond = 
[
  {
    "id": "cond1",
    "ctext": "分類=古墳",
    "cond": "wdt:P31",
    "val": "wd:Q1141225",
    "type": "ID",
    "const": true
  },
  {
    "id": "cond2",
    "ctext": "",
    "cond": "",
    "val": "",
    "type": "ID",
    "const": false
  },
  {
    "id": "cond3",
    "ctext": "",
    "cond": "",
    "val": "",
    "type": "ID",
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
    "optional": false
  },
  {
    "id": "opt2",
    "prop": "wdt:P18",
    "pname": "画像",
    "optional": false
  },
  {
    "id": "opt3",
    "prop": "wdt:P2348",
    "pname": "時代",
    "optional": true
  },
  {
    "id": "opt4",
    "prop": "wdt:P8592",
    "pname": "空中写真",
    "optional": true
  },
  {
    "id": "opt5",
    "prop": "wdt:P149",
    "pname": "建築様式",
    "optional": true
  }
];
