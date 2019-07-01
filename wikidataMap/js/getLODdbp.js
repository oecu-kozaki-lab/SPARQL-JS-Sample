var title ='';
var url ='';
var all ='';
var keywords ='';
var limit=11;

$(window).load(function() {

// SPARQLクエリを　"/*"の次の行から"*/"の前の行に書く	
var query = (function () {/*
SELECT DISTINCT ?s ?label ?point 
WHERE
{
  ?s rdfs:label ?label ;
     wdt:P131 wd:Q35765 ;
     wdt:P625 ?point.
  FILTER(lang(?label)="ja" )
}
*/}).toString().match(/\n([\s\S]*)\n/)[1];


/*　GETパラメーターを使って何か処理する際のサンプル
	var param = getParameter();
	var user =param['u'];

	if (user == null){
		user = 'user1';
	} else{
		query = query.replace("user1",user);
	}
*/
	qr = sendQuery("https://query.wikidata.org/sparql",query);
		qr.fail(
			function (xhr, textStatus, thrownError) {
				alert("Error: A '" + textStatus+ "' occurred.");
			}
		);
		qr.done(
			function (d) {
				showMAP(d.results.bindings,'Map');
				result_table(d.results.bindings);
				//download_result(d.results.bindings);
			}
		);



	$('#result_div').hide();

});






//SPARQLクエリの結果を元に表示する情報を生成する
//結果表示用の関数【テーブル表示】
function result_table(data){
	 var result_div = $('#result_div');

	var table = $('#result_list')[0];


	if (table == undefined) {
		result_div.append($('<table border="1"></table>').attr({
			'id' : 'result_list',
			'class' : 'table'
		}));
		table = $('#result_list')[0];
	}

	while (table.rows.length > 0) {
		table.deleteRow(0); // 行を追加
	}

	if (data instanceof Array) {
		result_div.show();
		// ヘッダ
		var header = table.createTHead(); // 行を追加
		var headerRow = header.insertRow(0);

		id = 1;
		for (var d = 0; d < data.length; d++) {
			var row1 = table.insertRow(d + 1); // 行を追加

			if (d == 0) {
				for ( var key in data[0]) {
					var th = document.createElement('th');
					var label = key;
					th.innerHTML = key;
					headerRow.appendChild(th);
				}
			}
	
			var i = 0;
			for ( var key in data[d]) {
				var cell = row1.insertCell(i++); // ２つ目以降のセルを追加
				var value = data[d][key];
				if (value.value != undefined){
					value = value.value;
				}
				if (value == null) {
					value = '';
				}
	
				var link = true;
				if (link) {
					if (value != null && value.indexOf("http://") == 0) {
						value = '<a href="'+value+'" target="_blank">'
								+ value + '</a>';
					}
				}
				cell.innerHTML = value;
			}
		}
	}
};


//GETパラメータの処理
function getParameter()
{
    var result = {};
    if( 1 < window.location.search.length )
    {
        var query = window.location.search.substring( 1 );

        var parameters = query.split( '&' );

        for( var i = 0; i < parameters.length; i++ )
        {
            var element = parameters[ i ].split( '=' );

            var paramName = decodeURIComponent( element[ 0 ] );
            var paramValue = decodeURIComponent( element[ 1 ] );

            result[ paramName ] = paramValue;
        }
    }
    return result;
}

