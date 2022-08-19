let search_cond = 
[
  {
    "id": "cond1",
    "ctext": "分類=鉄道路線",
    "cond": "wdt:P31",
    "val": "wd:Q728937",
    "type": "ID",
    "const": true
  },
  {
    "id": "cond2",
    "ctext": "所有者（例：西日本旅客鉄道）",
    "cond": "wdt:P127/rdfs:label",
    "val": "",
    "type": "STR-ja",
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
    "prop": "wdt:P1671",
    "pname": "路線番号",
    "optional": true
  },
  {
    "id": "opt2",
    "prop": "wdt:P154",
    "pname": "ロゴ画像",
    "optional": true
  },
  {
    "id": "opt3",
    "prop": "wdt:P15",
    "pname": "経路図",
    "optional": true
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
