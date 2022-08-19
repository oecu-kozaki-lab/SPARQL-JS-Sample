let search_cond = 
[
  {
    "id": "cond1",
    "ctext": "分類=星座",
    "cond": "wdt:P31",
    "val": "wd:Q8928",
    "type": "ID",
    "const": true
  },
  {
    "id": "cond2",
    "ctext": "隣の星座",
    "cond": "wdt:P47",
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
    "prop": "wdt:P18",
    "pname": "画像",
    "optional": true
  },
  {
    "id": "opt2",
    "prop": "wdt:P367",
    "pname": "天文学記号",
    "optional": true
  },
  {
    "id": "opt3",
    "prop": "",
    "pname": "",
    "optional": true
  },
  {
    "id": "opt4",
    "prop": "",
    "pname": "",
    "optional": true
  },
  {
    "id": "opt5",
    "prop": "",
    "pname": "",
    "optional": false
  }
];