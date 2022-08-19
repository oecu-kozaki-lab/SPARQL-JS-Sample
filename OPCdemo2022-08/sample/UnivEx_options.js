search_cond = 
[
  {
    "id": "cond1",
    "ctext": "分類",
    "cond": "wdt:P31/wdt:P279*",
    "val": "wd:Q3918",
    "type": "ID",
    "const": true
  },
  {
    "id": "cond2",
    "ctext": "国（例：アメリカ ※日本は「日本国」と入力）",
    "cond": "wdt:P17",
    "val": "",
    "type": "getID",
    "const": false
  },
  {
    "id": "cond3",
    "ctext": "所在地（例：寝屋川市，大阪府）",
    "cond": "wdt:P131/rdfs:label|wdt:P131/wdt:P131/rdfs:label",
    "val": "",
    "type": "STR-ja",
    "const": false
  },
  {
    "id": "cond4",
    "ctext": "設立年（XXXX年以降，例：1990）",
    "cond": "FILTER(?opt5 >= \"####-01-01T00:00:00Z\"^^xsd:dateTime)",
    "val": "",
    "type": "REPLACE",
    "const": false
  },
  {
    "id": "cond5",
    "ctext": "設立年（XXXX以前，例：2010）",
    "cond": "FILTER(?opt5 <= \"####-12-31T23:59:59Z\"^^xsd:dateTime)",
    "val": "",
    "type": "REPLACE",
    "const": false
  }
];

search_prop = 
[
  {
    "id": "opt1",
    "prop": "wdt:P17",
    "pname": "国",
    "optional": false
  },
  {
    "id": "opt2",
    "prop": "wdt:P131",
    "pname": "所在地",
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
    "prop": "wdt:P856",
    "pname": "公式ウェブサイト",
    "optional": true
  },
  {
    "id": "opt5",
    "prop": "wdt:P571",
    "pname": "設立日",
    "optional": false
  }
];
