window.addEventListener('load', () => {
	const endpoint0 = "http://localhost:3030/WikidataLabel/sparql";
	const endpoint = "https://query.wikidata.org/sparql";
	const defaultQuery = "select * {?s ?p ?o} LIMIT 100";

	const textArea = document.getElementById('query_area');
	textArea.hidden;
	const textArea2 = document.getElementById('query_area2');
	textArea2.hidden;

	const sendButton = document.getElementById('send');
	const resultArea = document.getElementById('result_div');

	// デフォルトのクエリを設定
	//textArea.value = defaultQuery;
	//textArea.replace( '#FILM#', textFILM );
	sendButton.addEventListener('click', async () => {
		var textINPUT = "";
		var textPROP ="";
		var subjURI ="";

		//テキスト文でのクエリ入力の解析ができたら，そちらを優先
		const queryTEXT = document.getElementById('queryText').value;
		var queryToken = parseText(queryTEXT);
		if(queryToken != null){
			textINPUT = queryToken.subj;
			textPROP  = queryToken.prop;
		}
		
		
		//別名の取得処理【仮】	
		const query0 = textArea2.value
			.replace( 'where', ' where' )
			.replace( 'Where', ' where' )
			.replace( '#INPUT#', textINPUT )
			.replace( '#INPUT#', textINPUT )
			.replace( '#PROP#', textPROP )
			.trim()
			.replace(/^\s+/g, '')
			.replace(/\s+$/g, '')
			.replace(/\n/g, '');
		
		//	alert("query0＝"+query0);
		
		const result0 = await sendQuery(endpoint0, query0);
			if (!result0.ok) {
				resultArea.innerText = "クエリ(query0)が正しくないか、サーバ側がおかしいみたいです";
				return;
			}
			
			const resultData0 = await result0.json();	
			const vars0 = resultData0.head.vars;
			const data0 = resultData0.results.bindings
				
			if(data0[0]['s']!=null){
					subjURI = data0[0]['s'].value;
				//	alert("subjURI="+subjURI);					
				}
			
			
		removeAllChild(resultArea);
		const query = textArea.value
			.replace( 'where', ' where' )
			.replace( 'Where', ' where' )
			.replace( '#SUBJECT#', "<"+subjURI+">" )
			.replace( '#PROP#', textPROP )
			.trim()
			.replace(/^\s+/g, '')
			.replace(/\s+$/g, '')
			.replace(/\n/g, '');
		 //alert("query="+query);
			
		try {
			
			
			dispLoading("処理中");
			const result = await sendQuery(endpoint, query);
			if (!result.ok) {
				resultArea.innerText = "クエリが正しくないか、サーバ側がおかしいみたいです";
				return;
			}
			removeLoading();
			
			const resultData = await result.json();	
			const vars = resultData.head.vars;
			const data = resultData.results.bindings
				
		    

		//結果を複数表示したいときにも対応
			const mes = document.createElement('div');
			var i=0;
			var len = data.length;
			var mesText = "" ;
			while(i < len){
				var p = document.createElement('p');
				if(data[i]['oLabel']!=null){
					p.textContent = data[i]['oLabel'].value;
					mes.appendChild( p );
				}
				i++;
				
			}
			var p_end = document.createElement('p');
			p_end.textContent = 'です．';
			mes.appendChild( p_end );
			resultArea.appendChild(mes);
		} catch (e) {
			resultArea.innerHTML = e.message;
			throw e;
		}
	}, false);
}, false);

/**
 * endpointに指定されたSPARQLエンドポイントにリクエストを投げる
 * @param {string} endpoint 
 * @param {string} sparql 
 * 
 * @returns {Promise<Response>}
 */
function sendQuery(endpoint, sparql) {
	if (!endpoint || !sparql) {
		throw new Error("urlとqueryは必須です");
	}

	const requestParam = {
		query: sparql,
		output: "json"
	};
	const url = endpoint + "?" + buildParam(requestParam);

	const headers = {
		Accept: 'application/sparql-results+json'
	}
	return fetch(url, {
		method: 'GET',
		headers,
		mode: 'cors',
		cache: 'no-cache',
	});
}

/**
 * URLのクエリパラメータを生成する関数
 * @param {Object<string, string>} obj 
 * 
 * @returns {string}
 */
function buildParam(obj) {
	return Object.keys(obj)
		.map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
		.join('&');
}

/**
 * <table>のヘッダー部分(<th>)を生成する
 * @param {Array<string>} vars 
 * @returns {HTMLTableRowElement}
 */
function tableHead(vars) {
	const tr = document.createElement('tr');
	const fragment = vars.map(v => {
		const th = document.createElement('th');
		th.innerText = v;
		return th;
	}).reduce((acc, th) => {
		acc.appendChild(th);
		return acc;
	}, document.createDocumentFragment());

	tr.appendChild(fragment);
	return tr;
}

/**
 * <table>の行を生成する
 * @param {Array<String>} values 
 * @returns {HTMLTableRowElement}
 */
function tableRows(values) {
	const tr = document.createElement('tr');
	const fragment = values.map(tableDataCell)
		.reduce((acc, td) => {
			acc.appendChild(td);
			return acc;
		}, document.createDocumentFragment());

	tr.appendChild(fragment);
	return tr;
}

/**
 * SPARQLエンドポイントからのレスポンスを読んで、
 * URIならリンク、リテラルならテキストのエレメントを返す
 * 
 * @param {Object<String, String>} obj 
 * @returns {HTMLTableDataCellElement}
 */
function tableDataCell(obj) {
	const td = document.createElement('td');
	switch (obj['type']) {
		case "literal":
			td.innerText = obj.value;
			break;
		case "uri":
			const aTag = document.createElement('a');
			aTag.href = obj.value;
			aTag.innerText = obj.value;
			td.appendChild(aTag);
			break
		default:
			throw new Error("不明なノードタイプです");
	}
	td.classList.add('result-item');
	return td;
}

/**
 * 子ノードをすべて削除する
 * @param {HTMLElement} elem 
 */
function removeAllChild(elem) {
	let child = null;
	while (child = elem.firstChild) {
		elem.removeChild(child);
	}
}
