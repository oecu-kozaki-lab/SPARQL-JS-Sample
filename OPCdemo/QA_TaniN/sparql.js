window.addEventListener('load', () => {
	const endpoint = "https://query.wikidata.org/sparql";
	const defaultQuery = "select * {?s ?p ?o} LIMIT 100";

	const textArea = document.getElementById('query_area');
textArea.hidden;

	const sendButton = document.getElementById('send');
	const resultArea = document.getElementById('result_div');

	// デフォルトのクエリを設定
	//textArea.value = defaultQuery;
	//textArea.replace( '#FILM#', textFILM );
	sendButton.addEventListener('click', async () => {
		var textINPUT = document.getElementById('INPUT').value;
		var textPROP ="";
		if(document.getElementById('propList')!=null){
			textPROP = document.getElementById('propList').value;
			}
				
		removeAllChild(resultArea);
		const query = textArea.value
			.replace( 'where', ' where' )
			.replace( 'Where', ' where' )
			.replace( '#INPUT#', textINPUT )
			.replace( '#PROP#', textPROP )
			.trim()
			.replace(/^\s+/g, '')
			.replace(/\s+$/g, '')
			.replace(/\n/g, '');

		try {
			const result = await sendQuery(endpoint, query);
			if (!result.ok) {
				resultArea.innerText = "クエリが正しくないか、サーバ側がおかしいみたいです";
				return;
			}
		
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
/*
			const headers = tableHead(vars);
			const rows = data
				.map(Object.values)
				.map(tableRows)
				.reduce((acc, elem) => {
					acc.appendChild(elem);
					return acc;
				}, document.createDocumentFragment())

			const table = document.createElement('table');
			table.appendChild(headers);
			table.appendChild(rows);
			resultArea.appendChild(table);*/
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
