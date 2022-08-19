let search_cond =
  [
    {
      "id": "cond1",
      "ctext": "職業=サッカー選手",
      "cond": "wdt:P106",
      "val": "wd:Q937857",
      "type": "ID",
      "const": true
    },
    {
      "id": "cond2",
      "ctext": "所属チーム",
      "cond": "wdt:P54",
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
      "prop": "wdt:P413",
      "pname": "ポジション",
      "optional": false
    },
    {
      "id": "opt2",
      "prop": "wdt:P27",
      "pname": "国籍",
      "optional": false
    },
    {
      "id": "opt3",
      "prop": "wdt:P18",
      "pname": "画像",
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