let search_cond = 
[
  {
    "id": "cond1",
    "ctext": "分類=日本の漫画",
    "cond": "wdt:P31/wdt:P279*",
    "val": "wd:Q1004",
    "type": "ID",
    "const": true
  },
  {
    "id": "cond2",
    "ctext": "著者",
    "cond": "wdt:P50",
    "val": "",
    "type": "getID",
    "const": false
  },
  {
    "id": "cond3",
    "ctext": "発行元",
    "cond": "wdt:P123",
    "val": "",
    "type": "getID",
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
    "prop": "wdt:P123",
    "pname": "発行元",
    "optional": true
  },
  {
    "id": "opt2",
    "prop": "wdt:P154",
    "pname": "ロゴ",
    "optional": true
  },
  {
    "id": "opt3",
    "prop": "wdt:P50",
    "pname": "著者",
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
