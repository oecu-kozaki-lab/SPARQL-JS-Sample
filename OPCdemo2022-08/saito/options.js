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
      "cond": "wdt:P31",
      "val": "wd:Q845945",
      "type": "ID",
      "const": true
    },
    {
      "id": "cond2",
      "ctext": "国",
      "cond": "wdt:P17",
      "val": "日本国",
      "type": "getID",
      "const": false
    },
    {
      "id": "cond3",
      "ctext": "",
      "cond": "",
      "val": "",
      "type": "REPLACE",
      "const": false
    },
    {
      "id": "cond4",
      "ctext": "",
      "cond": "",
      "val": "",
      "type": "REPLACE",
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
      "prop": "wdt:P17",
      "pname": "国",
      "optional": false
    },
    {
      "id": "opt2",
      "prop": "wdt:P825",
      "pname": "献呈先",
      "optional": false
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
      "prop": "wdt:P18",
      "pname": "画像",
      "optional": true
    }
  ];
