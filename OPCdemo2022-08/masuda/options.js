/* 
 * 詳細検索用の条件設定
 * 　・"id"の値が重複しないように注意
 *   ・データの数は必要に応じて増減してよい． 
 */
let search_cond = 
[
  {
    "id": "cond1",
    "ctext": "職業＝シンガーソングライター",
    "cond": "wdt:P106",
    "val": "wd:Q488205",
    "type": "ID",
    "const": true
  },
  {
    "id": "cond2",
    "ctext": "国籍",
    "cond": "wdt:P27",
    "val": "日本国",
    "type": "getID",
    "const": false
  },
  {
    "id": "cond3",
    "ctext": "活動開始(xxxx年以降)",
    "cond": "FILTER(?opt3 >= \"####-01-01T00:00:00Z\"^^xsd:dateTime)",
    "val": "",
    "type": "REPLACE",
    "const": false
  },
  {
    "id": "cond4",
    "ctext": "活動開始(xxxx年以前)",
    "cond": "FILTER(?opt3 <= \"####-12-31T23:59:59Z\"^^xsd:dateTime)",
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
    "prop": "wdt:P856",
    "pname": "公式ウェブサイト",
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
    "prop": "wdt:P2031",
    "pname": "活動開始",
    "optional": false
  },
  {
    "id": "opt4",
    "prop": "",
    "pname": "",
    "optional": false
  },
  {
    "id": "opt5",
    "prop": "",
    "pname": "",
    "optional": false
  }
];
