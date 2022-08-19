/* 
 * 詳細検索用の条件設定
 * 　・"id"の値が重複しないように注意
 *   ・データの数は必要に応じて増減してよい． 
 */
let search_cond = 
[
  {
    "id": "cond1",
    "ctext": "分類＝猫の品種",
    "cond": "wdt:P31/wdt:P279*",
    "val": "wd:Q43577",
    "type": "ID",
    "const": true
  },
  {
    "id": "cond2",
    "ctext": "本国",
    "cond": "wdt:P495",
    "val": "",
    "type": "getID",
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
    "prop": "wdt:P495",
    "pname": "本国",
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
    "prop": "",
    "pname": "",
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
