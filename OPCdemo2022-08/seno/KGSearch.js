let offset = 0; 
let contQueryIds = false; //「続きを検索」の表示が必要か？[APIでIDsを取得した際]
let contQuery = false; //「続きを検索」の表示が必要か？[SPARQL用]

/*
 * endpointで指定されたSPARQLエンドポイントにクエリを送信
 */
function sendQuery(endpoint, sparql) {
	const url = endpoint + "?" + "query="+encodeURIComponent(sparql)+"&output=json"
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

/*
 * endpointで指定されたSPARQLエンドポイントにクエリを送信
 */
async function sendSPARQLQuery(endpoint,options){
    try {
		const result = await sendQuery(endpoint,options);
        if (!result.ok) {
			alert("SPARQLクエリのエラーが発生しました");
			removeSearchIng();
            return null;
        }		
        const resultData = await result.json();	
        console.log(resultData);

		return resultData;
    } catch (e) {
            alert(e.message);
        throw e;
    }
}


/*
 * GETでAPIにクエリ送信
 */
function sendGetQuery(endpoint, options) {
	var url = endpoint + options +"&origin=*";

	const headers = {
		Accept: 'application/results+json'
	}
	return fetch(url, {
		method: 'GET',
		// headers,
		cache: 'no-cache',
  	});
}


//WikiMedia APIを使ってIDを取得
async function sendWdQuery(endpoint,options){
    try {
		const result = await sendGetQuery(endpoint,options);
        if (!result.ok) {
			alert("sendWdQueryでクエリエラーが発生しました");
            return null;
        }		
        const resultData = await result.json();	
        console.log(resultData);

		return resultData;
    } catch (e) {
            alert(e.message);
        throw e;
    }
}



//WikiMedia APIを使ってIDを取得
async function getWdIDs(label){
	return getWdIDsByWM(label,50);
}

async function getWdID(label){
	return getWdIDsByWM(label,1);
}
async function getWdIDsByWM(label,limit){
    const endpoint ="https://www.wikidata.org/w/api.php";
    const options  = "?action=query&list=search&srsearch="+label+"&srlimit="+limit+"&sroffset="+offset+"&format=json";
    try {
		const result = await sendGetQuery(endpoint,options);
        if (!result.ok) {
			console.log("WikiMedia APIでのクエリエラーが発生しました");
            return;
        }		
        const resultData = await result.json();	
        console.log(resultData);

		const data = resultData.query.search;
		let ids = new Array();
		for(let i = 0; i < data.length; i++){
			// ids.push(data[i].id);
			ids.push(data[i].title);			
		}
		return ids;
    } catch (e) {
            alert(e.message);
        throw e;
    }
}

//WikiMedia APIを使ってIDを取得【wbsearchentities】
//こちらは「前方一致」のみ？
async function getWdIDsBySE(label){
	return getWdIDsByMEse(label,50);
}

async function getWdIDse(label){
	return getWdIDsByMEse(label,1);
}

async function getWdIDsByMEse(label,limit){
    const endpoint ="https://www.wikidata.org/w/api.php"; 
    const options ="?action=wbsearchentities&search="+label+"&language=en&limit="+limit+"&continue="+offset+"&format=json";
    try {
		const result = await sendGetQuery(endpoint,options);
        if (!result.ok) {
			console.log("WikiMedia API【wbsearchentities】のクエリエラーが発生しました");
            return;
        }		
        const resultData = await result.json();	
        console.log(resultData);

		const data = resultData.search;
		let ids = new Array();
		for(let i = 0; i < data.length; i++){
			ids.push(data[i].id);
		}
		return ids;
    } catch (e) {
            alert(e.message);
        throw e;
    }
}

/*
 * クエリ結果の表示【テーブル表示用】
 */
function showResult(resultData,resultArea){
	//クエリ結果のJSONデータを「ヘッダ部(keys)」と「値(data)」に分けて処理する
	const keys = resultData.head.vars;
	const data = resultData.results.bindings;

	removeSearchIng();

	let mesText = "";
	let orgDiv = resultArea.innerHTML;
	if(orgDiv.indexOf("<table")>=0){
		mesText = resultArea.innerHTML.replace("</table>","");
	}
	else{
		mesText = "<table>\n<tr>" ;
		for(let j = 0; j < keys.length; j++){
			mesText+='<th style="background:#afeeee">'
					+getSearchPropLabel(keys[j]) +'</th>';
		}
		mesText+="</tr>\n";
	}

	for(let i = 0; i < data.length; i++){
		mesText+="<tr>";
		
    	for(let j = 0; j < keys.length; j++){
			let val = "-";
			if(data[i][keys[j]]!=null){
				val =data[i][keys[j]].value;
			}
            if(keys[j]==keylink){ //変数名が「keylink」のときは詳細表示へのリンク
                mesText += '<th>'+getLinkURL(val)+'</th>';
            }
            else{
                mesText += '<th>'+getHtmlData(val)+'</th>';
            }			
		} 
		mesText+="</tr>";
	}
	resultArea.innerHTML = mesText+'</table>';

	//「IDsの取得数」か「SPARQLの結果の数」がLIMITの50になった時は「続きを検索」ON
	if(data.length == 50 || contQueryIds){
		contQuery = true; 
	}
	else {
		contQuery = false;
	}

	const contButton = document.getElementById('cont');
	if(contQuery){ 
        contButton.style.display="block";
    }
    else{
        contButton.style.display="none";
    }
}


/*
 * クエリ結果の表示【テーブル表示用】
 */
function showResultNEW(resultData,resultArea){
	//クエリ結果のJSONデータを「ヘッダ部(keys)」と「値(data)」に分けて処理する
	const keys = resultData.head.vars;
	const data = resultData.results.bindings;

	removeSearchIng();

	let mesText = "";
	let orgDiv = resultArea.innerHTML;
	if(orgDiv.indexOf("<table")>=0){
		mesText = resultArea.innerHTML.replace("</table>","");
	}
	else{
		mesText = "<table>\n<tr>" ;
		for(let j = 0; j < keys.length; j++){
			mesText+='<th style="background:#afeeee">'
					+getSearchPropLabel(keys[j]) +'</th>';
		}
		mesText+="</tr>\n";
	}

	let rownum = new Array(data.length);
	rownum[0] = new Array(keys.length);
	for(let j = 0; j < keys.length; j++){
		rownum[0][j] = 1;
	}
	for(let i = 1; i < data.length; i++){
		rownum[i] = new Array(keys.length);
		rownum[i][0] = 1;
		for(let j = 0; j < keys.length; j++){
			if(data[i][keys[j]]!=null && data[i-1][keys[j]]!=null){
				if(data[i][keys[j]].value==data[i-1][keys[j]].value){
					if(j==0){
						rownum[i][0] = 0;
					}
					if(rownum[i][0]==0){
						rownum[i][j] = 0;
						for(let k=i;k>0;k--){
							if(rownum[k][j]>0){
								rownum[k][j]++;
								break;
							}
						}
					}	
					else{
						rownum[i][j] = 1;
					}
				}
				else{
					rownum[i][j] = 1;
				}
			}
			else{
				rownum[i][j] = 1;
			}
		}
	}
	
	for(let i = 0; i < data.length; i++) {
		let rows = data[i][keys[0]].value +'=';
		for(let j = 0; j < keys.length; j++) {
			rows+= rownum[i][j];
		}
		console.log(rows);
	}

	for(let i = 0; i < data.length; i++){
		mesText+="<tr>";
		let valText = "";
	
    	for(let j = 0; j < keys.length; j++){
			let val = "-";
			if(data[i][keys[j]]!=null){
				val =data[i][keys[j]].value;
			}
            if(keys[j]==keylink){ //変数名が「keylink」のときは詳細表示へのリンク
                // mesText += '<th>'+getLinkURL(val)+'</th>';
				valText = getLinkURL(val);
            }
            else{
                // mesText += '<th>'+getHtmlData(val)+'</th>';
				valText = getHtmlData(val);
            }		

			if(rownum[i][j]>1){
				mesText+='<th rowspan="'+rownum[i][j]+'">'+ valText+ "</th>";
			}
			else if(rownum[i][j]!=0){
				mesText+="<th>"+ valText+ "</th>";	
				}		
		} 


		// '<tr><th rowspan="'+rownum+'">'
		mesText+="</tr>";
	}
	resultArea.innerHTML = mesText+'</table>';

	//「IDsの取得数」か「SPARQLの結果の数」がLIMITの50になった時は「続きを検索」ON
	if(data.length == 50 || contQueryIds){
		contQuery = true; 
	}
	else {
		contQuery = false;
	}

	const contButton = document.getElementById('cont');
	if(contQuery){ 
        contButton.style.display="block";
    }
    else{
        contButton.style.display="none";
    }
}


//検索結果表示用の「項目名」の取得
function getSearchPropLabel(p){
	if (typeof(search_prop) === 'undefined'){
		return p;
	}
	if(search_prop==null){
		return p;
	}

	if(p=='item'){
		return "QID";
	}
	else if(p=='itemLabel'){
		return "ラベル";
	}

	//optの処理
	for(let i=0;i<search_prop.length;i++){
		if(search_prop[i].id + "Label" == p){
			return search_prop[i].pname; 
		}
	}

	return p;
}

function getHtmlData(val){
	if(val.startsWith('http://www.wikidata.org/entity/')){//wd:XX
		return '<a href="'+val.replace('http://','https://') + '" target="_blank">'+
			'wd:'+val.replace('http://www.wikidata.org/entity/','')+'</a>';
	}
	else if(val.startsWith('http://www.wikidata.org/prop/direct/')){//wdt:XX
		return '<a href="'+val.replace('http://','https://') + '" target="_blank">'+
			'wdt:'+val.replace('http://www.wikidata.org/prop/direct/','')+'</a>';
	}
	else if(val.startsWith('http')){//URL
		if(val.toUpperCase().match(/\.(jpg)$/i)
			|| val.toUpperCase().match(/\.(png)$/i)
			|| val.toUpperCase().match(/\.(jpeg)$/i)
			|| val.toUpperCase().match(/\.(gif)$/i)
			|| val.toUpperCase().match(/\.(svg)$/i)){
				return '<img src="'+val +'" width="100"/>';
		}
		else{
			return '<a href="'+val.replace('http://','https://') +'" target="_blank">'+val+'</a>';
		}
	}
		
	return val;
}


/*
 * 詳細表示へのリンク用URLの取得
 */
function getLinkURL(val){
    if(val.startsWith('http://www.wikidata.org/entity/')){//wd:XX
        let key = 'wd:'+val.replace('http://www.wikidata.org/entity/','');
		return '<a href="'+detail_html+'?key='+ key + '" target="details">'+ key+'</a>';
	}
    else{
        return '<a href="'+detail_html+'?key='+ val + '" target="details">'+ val+'</a>';
    }
}

/*
 * クエリ結果の表示処理[指定したデータの詳細表示用]
 */
function showResultDetails(resultData,resultArea,props){
	//表示するプロパティの順番を設定
	let propLen = 0;
	if(props!=null){
		propLen = props.length;	
	} 
	const data = resultData.results.bindings;
	const len = data.length;

	if(len==0){
		resultArea.innerHTML = "検索結果なし";
		return;
	}

	let rownum = [];
	let rowprop = [];
	rownum[0] = 1;
	rowprop[0] = data[0]['p'].value;
	for(let i=1 ;i<len;i++){
		rowprop[i] = data[i]['p'].value;
		if(data[i]['p'].value == data[i-1]['p'].value){
			rownum[i] = 0;
			for(let j=i;j>0;j--){
				if(rownum[j]>0){
					rownum[j]++;
					break;
				}
			}
		}
		else{
			rownum[i] = 1;
		}
	}
	// for(var i = 0; i < rownum.length; i++) {
	// 	　console.log(rowprop[i] +'='+rownum[i]);
	// 	}

	//ラベル,説明,上位クラス
	let labelText = "";
	let altLabelText = "";
	let descText = "";
	let subCls = "";
	let insOf = "";
	
	//順番を指定したプロパティ用
	let texts = [];
	for(let j=0 ;j<propLen;j++){
		texts.push('');
	}

	//その他用
	let otherText = "";
	
	//見出し語部分	
	if(data[0]['item']!=null){
		labelText += '<h2 style="background:#afeeee">'+data[0]['itemLabel'].value
			+'<br><font size="3">（Wikidata ID:<a href="'+data[0]['item'].value.replace('http://','https://')
			+'" target="_blank">'
            +data[0]['item'].value.replace('http://www.wikidata.org/entity/',"")
            +'</a>）</font></h2>';
	}

	labelText += '<table class="result-table">' ;
		
	for(let i=0 ;i<len;i++){
		let prop = data[i]['p'].value.replace("http://www.wikidata.org/prop/direct/","wdt:");
		if(prop.endsWith("rdf-schema#label")){
			labelText += showData(data[i],rownum[i]);
		}
		else if(prop.endsWith("core#altLabel")){
			altLabelText += showData(data[i],rownum[i]);
		}
		else if(prop.endsWith("schema.org/description")){
			descText += showData(data[i],rownum[i]);
		}
		else if(prop.endsWith("P279")){
			subCls += showData(data[i],rownum[i]);
		}
		else if(prop.endsWith("P31")){
			insOf += showData(data[i],rownum[i]);
		}
		//wdt:以外のプロパティは表示しない【暫定処理】
		else if(prop.startsWith("wdt:")){
			let sw = true;
			for(let j=0 ;j<propLen;j++){
				if(prop.endsWith(props[j])){	
					texts[j] += showData(data[i],rownum[i]);
					sw = false;
					break;
				}
			}
			if(sw){
				otherText += showData(data[i],rownum[i]);
			}
		}
	}

	// labelText += "</table>\n" ;

	let mesText = labelText + altLabelText + descText +"</table><hr>";

	if(""!=(subCls+insOf)){
		mesText += '<table class="result-table">'+subCls + insOf +"</table><hr>";
	}

	let propText = "";
	for(let j=0 ;j<propLen;j++){
		propText += texts[j];
	}

	if(otherText!=""){
		otherText = '<table class="result-table">' + otherText +"</table>";	
	}

	//表示するプロパティを指定している場合は，「すべて表示」ボタンでの制御を追加
	if(propText!=""){
		mesText += '<table class="result-table">'+propText +"</table><hr>";
		mesText +='<input type="button" id="show_other" value="▼すべて表示" onclick="showOther()">'
					+'<input type="button" id="hide_other"'
				+' style="display: none;" value="▲表示を減らす" onclick="hideOther()"><br>'
		mesText += '<div id="other_prop" style="display: none;" >'+otherText+'</div>';
	}
	else{
		mesText += otherText;
	}

	console.log(mesText);

	resultArea.innerHTML = mesText;
}

//セルの立て結合を考慮した処理
function showData(data_i,rownum){
	var mesText = "" ;
	let prop = "";
	let object = "";
	let lang ="";

	if(data_i['oLabel']['xml:lang'] != null){
		lang += ' (' +data_i['oLabel']['xml:lang'] + ')';
	}
	else if(data_i['itemLabel']['xml:lang'] != null){
		lang += ' (' +data_i['itemLabel']['xml:lang'] + ')';
	}

	if(data_i['propLabel']!=null){//wdt:XXXの述語処理
		prop = '<b>'+data_i['propLabel'].value + '</b>'
		             +'['+ data_i['prop'].value.replace('http://www.wikidata.org/entity/','wdt:') +']';
		

		if(data_i['o'].value.startsWith('http://www.wikidata.org/entity/')){//目的語がwd:XX
			const qid = data_i['o'].value.replace('http://www.wikidata.org/entity/','wd:');
			object += '<b>'+ data_i['oLabel'].value + '</b>' +
					'<a href="'+detail_html+'?key='+qid+ '">'+
					'['+qid+']</a>';
		}
		else if(data_i['o'].value.startsWith('http')){//目的語がURL
			if(data_i['o'].value.endsWith('.jpg')
				|| data_i['o'].value.endsWith('.JPG')
				|| data_i['o'].value.endsWith('.png')
				|| data_i['o'].value.endsWith('.svg')
				|| data_i['o'].value.endsWith('.jpeg')){
					object += '<img src="'+data_i['o'].value +'" width="180">'+'</img>';
			}
			else{
				object += '<a href="'+data_i['o'].value.replace('http://','https://') 
				        +'" target="_blank">'+ data_i['oLabel'].value+'</a>';
				}
		}
		else{//目的語がそれ以外
			object += data_i['oLabel'].value;
			if(data_i['oLabel']['xml:lang'] != null){
				object += ' (' +data_i['oLabel']['xml:lang'] + ')';
			}
			if(data_i['o'].datatype != null){
				object += ' ('
					   + data_i['o'].datatype.replace('http://www.w3.org/2001/XMLSchema#','xsd:')
					                         .replace('http://www.opengis.net/ont/geosparql#','geo:')
				       + ')';
			}
		}	
	}
	else if(data_i['p'].value.startsWith('http://www.wikidata.org/prop/direct-normalized/')){
		if(data_i['o'].value.startsWith('http')){//目的語がURL
			prop = data_i['p'].value.replace('http://www.wikidata.org/prop/direct-normalized/','wdtn:');
			object = '<a href="'+data_i['o'].value.replace('http://','https://') 
						+'" target="_blank">'+ data_i['oLabel'].value+'</a>';
		}
		else{
			prop = data_i['p'].value;
			object = data_i['oLabel'].value+'</a>';
		}
	}
	else if(data_i['p'].value=="http://www.w3.org/2000/01/rdf-schema#label"){
		prop = '<b>名前</b>';
		object = data_i['oLabel'].value+ lang ;
	}
	else if(data_i['p'].value=="http://www.w3.org/2004/02/skos/core#altLabel"){
		prop = '<b>別名</b>';
		object = data_i['oLabel'].value+ lang ;
	}
	else if(data_i['p'].value=="http://schema.org/description"){
		prop ='<b>説明</b>';
		object = data_i['oLabel'].value+ lang ;
	}
	// else{//wdt:XXX以外の述語の処理【検討中】
	// 	mesText += data_i['p'].value+' - '+
	// 				data_i['oLabel'].value+'<br>';
	// }

	//フォーマット調整【検討中】
	// mesText = mesText.replace('-01-01T00:00:00Z','');//日付について「年のみ」の場合は不要部分を削除
	// mesText = mesText.replace('T00:00:00Z','');//日付について「年月日のみ」の場合は不要部分を削除

	//return mesText;
	if(rownum>1){
		return '<tr><th rowspan="'+rownum+'">'+ prop + '</th><td>'+ object +'</td></tr>';
	}
	else if(rownum==0){
		return '<tr><td>'+ object +'</td></tr>';
	}
	else{
		return '<tr><th>'+ prop + '</th><td>'+ object +'</td></tr>';
	}
}

function showOther(){
	document.getElementById("other_prop").style.display = 'block';
	document.getElementById("show_other").style.display = 'none';
	document.getElementById("hide_other").style.display = 'block';
}

function hideOther(){
	document.getElementById("other_prop").style.display = 'none';
	document.getElementById("show_other").style.display = 'block';
	document.getElementById("hide_other").style.display = 'none';
}

/*
 * クエリ結果の表示【WikiMedia API用】
 */
function showWdResult(resultData,resultArea){
	const data = resultData.search;
	let mesText = "" ;
	for(let i = 0; i < data.length; i++){
		mesText+= data[i].match.text
			+'（<a href="'+ data[i].concepturi+'" target="_blank">'+data[i].id+ "</a>）<br>\n";
	}
	resultArea.innerHTML = mesText;//+'</table>';
}

/*
 * クエリ結果の表示【WikiMedia API用】
 */
function showWdResultWithLink(resultData,resultArea){
	const data = resultData.search;
	let mesText = "" ;
	for(let i = 0; i < data.length; i++){
		mesText+= data[i].match.text+"（" + getLinkURL(data[i].concepturi)+"）<br>\n";
	}
	resultArea.innerHTML = mesText;//+'</table>';
}

/*
 * 検索条件の設定 「クエリ表示」用の時はforDev=true;
 */
function loadSearchConds(forDev){  
	let condText = "";
	let condType = '<select id="condType" name="type" >'
		+'<option value="ID">IRI(ID)を入力</option>'
		+'<option value="STR-ja">文字列(ja)</option>'
		+'<option value="REPLACE">置換</option>'
		+'<option value="getID">検索でIDに変換</option>'
		+'</select>';

	for(let i=0;i<search_cond.length;i++){
		//if(search_cond[i].cond != "" || forDev){
			let condID = search_cond[i].id;

			//「検索条件が未設定」または「条件固定（const=true）」のときは「検索時」に非表示
			if((search_cond[i].cond == "" || search_cond[i].const ) && !forDev){
				condText += '<span style="display:none">';
			}else{ 
				condText += '<span>';
			}

			//「クエリ表示」用(forDev=true)の時は表示を変える
			if(forDev){
				condText += '条件('+condID+') 説明:';//search_cond[i].ctext +':';
				condText += '<input id="'+condID+'Text" type="text" value="'+search_cond[i].ctext +'" size="30"/>';
				condText += ' 条件設定:<input id="'+condID+'" type="text" value='+"'"+search_cond[i].cond+"'"+' size="40"/>=';
				condText += condType.replace("cond",condID)
									.replace('"'+search_cond[i].type+'"','"'+search_cond[i].type+'" selected')+'=値:';
			}else{
				condText += '<input id="'+condID+'Text" type="text" value="'+search_cond[i].ctext
						+ '" size="30" style="display:none"/>';
				condText += search_cond[i].ctext +':';
				condText += '<input id="'+condID+'" type="text" value='+"'"+search_cond[i].cond+"'"
						+ ' size="40" style="display:none"/>';
			}
			condText += '<input id="'+condID+'Val" type="text" value="'+search_cond[i].val+'" size="10"/>';
			let ck = "";
			if(search_cond[i].const){
				ck ="checked";
			}

			if(forDev){	
				condText += '<input type="checkbox" id="'+condID+'_ck" ' + ck +'>固定条件';
			}
			else{
				condText += '<input type="checkbox" id="'+condID+'_ck" ' + ck +' style="display:none">';
			}
		condText += '<br></span>';
		//}
	}
	return condText;
}

function saveSearchConds(){ 
	for(let i=0;i<search_cond.length;i++){
		let condID = search_cond[i].id;
		search_cond[i].ctext = document.getElementById(condID+'Text').value;
		search_cond[i].cond  = document.getElementById(condID).value;
		search_cond[i].val = document.getElementById(condID+'Val').value;
		const typeList = document.getElementById(condID+'Type');
		if(typeList!=null){
			const num = typeList.selectedIndex;
			search_cond[i].type = typeList.options[num].value;
		}
		search_cond[i].const = document.getElementById(condID+'_ck').checked;
	}
	return search_cond;
}

/*
 * 検索表示項目の設定
 */
function loadSearchProps(){  
	let propText = "";
	for(let i=0;i<search_prop.length;i++){
		let ck = "";
		if(search_prop[i].optional){
			ck ="checked";
		}
		propText += '項目名(?'+search_prop[i].id + '):<input type="text" id="'+search_prop[i].id + '_name" '
				 +  'value="'+search_prop[i].pname+'" size="20"/>';
		propText += ' ID:<input type="text" id="'+search_prop[i].id + '" '
				 +  'value="'+search_prop[i].prop+'" size="20"/>';
		propText += '<input type="checkbox" id="'+search_prop[i].id+'_ck" ' + ck +'>OPTIONAL<br>';
	}
	return propText;
}

function saveSearchProps(){  
	for(let i=0;i<search_prop.length;i++){
		let propID = search_prop[i].id;
		search_prop[i].prop = document.getElementById(propID).value;
		search_prop[i].pname = document.getElementById(propID+'_name').value;
		search_prop[i].optional = document.getElementById(propID+'_ck').checked;
	}
	return search_prop;
}


/* ------------------------------
 Loading イメージ表示関数
 ------------------------------ */
 function dispLoading(msg){
	// 引数なし（メッセージなし）を許容
	if( msg == undefined ){
	msg = "処理中...";
	}
	// 画面表示メッセージ
	var dispMsg = "<div class='loadingMsg'>" + msg + "</div>";
	// ローディング画像が表示されていない場合のみ出力
	if(document.getElementById("loading") == null){
	document.body.insertAdjacentHTML('afterbegin',"<div id='loading'>" + dispMsg + "</div>");
	}
   }
	
   /* ------------------------------
	Loading イメージ削除関数
	------------------------------ */
   function removeLoading(){
	document.getElementById("loading").remove();
   }

/*
 * 各ボタンの設定
 */
function setButtons(){
	const sendButton = document.getElementById('send');
    const contButton = document.getElementById('cont');
    
    const showQueryCondButton = document.getElementById('showQueryCond');
    const hideQueryCondButton = document.getElementById('hideQueryCond');

    const dispQueryButton = document.getElementById('dispQuery');
    const hideQueryButton = document.getElementById('hideQuery');
    
    const serchCondDiv = document.getElementById('search_cond_div');
    const serchPropDiv = document.getElementById('search_prop_div');

    serchCondDiv.innerHTML = loadSearchConds(false);//詳細検索画面の設定
    serchPropDiv.innerHTML = loadSearchProps();//検索条件設定画面の設定
    
	//検索実行ボタンの処理
	sendButton.addEventListener('click', async () => {
        offset = 0;  
		contQueryIds = false;
        contQuery = false;
        document.getElementById("result_div").innerHTML="";
        contButton.style.display="none";
        makeQuery();
		//makeWikidataQuery();
	}, false);

    //詳細検索表示ボタンの処理
	showQueryCondButton.addEventListener('click', () => {
        document.getElementById('QueryCond_div').style.display = 'block';
        showQueryCondButton.style.display = 'none';
        hideQueryCondButton.style.display = 'block';
        serchCondDiv.innerHTML = loadSearchConds(false);//詳細検索画面の設定
	});
    hideQueryCondButton.addEventListener('click', () => {
        document.getElementById('QueryCond_div').style.display = 'none';
        showQueryCondButton.style.display = 'block';
        hideQueryCondButton.style.display = 'none';
        document.getElementById('query').style.display = 'none';
		dispQueryButton.style.display = 'block';
		hideQueryButton.style.display = 'none';
        saveSearchConds();
        saveSearchProps();
	});

    //クエリ表示ボタンの処理
	dispQueryButton.addEventListener('click', () => {
        document.getElementById('query').style.display = 'block';
		dispQueryButton.style.display = 'none';
		hideQueryButton.style.display = 'block';
		saveSearchConds();
        serchCondDiv.innerHTML = loadSearchConds(true);//詳細検索画面の設定
	});

    //クエリ非表示ボタンの処理
	hideQueryButton.addEventListener('click', () => {
        document.getElementById('query').style.display = 'none';
		dispQueryButton.style.display = 'block';
		hideQueryButton.style.display = 'none';
        saveSearchConds();
        saveSearchProps();
        serchCondDiv.innerHTML = loadSearchConds(false);//詳細検索画面の設定
	});

    //続きを検索実行ボタンの処理
	contButton.addEventListener('click', async () => {
        offset += 50;
        makeQuery();
	}, false);
}

/* 
 * GUIの情報を使ってSPARQLクエリを作る
 */
async function makeSPARQLquery(query){
	let conditions = "{\n";
    let ids; 

    //名称の処理
    const textLABEL = document.getElementById('LABEL').value;
    if(textLABEL!=""){
		if(document.getElementById('LabelFull').checked){
			conditions+= '{?item rdfs:label|skos:altLabel "'+textLABEL+'"@ja.}\n';
			conditions+= 'UNION {?item rdfs:label|skos:altLabel "'+textLABEL+'"@en.}\n';
		}
		else if(document.getElementById('LabelForward').checked){
			ids = await getWdIDsBySE(textLABEL);
			//得られたID一覧の数が上限(=50)になったら,「続きを検索」表示をON
			if(ids.length==50){
				contQueryIds = true;
			}
			const vals = ids.join(" ").replaceAll("Q","wd:Q"); 
			conditions+= 'VALUES ?item {'+vals+'}\n';
		}
		else if(document.getElementById('LabelAmbi').checked){
			ids = await getWdIDs(textLABEL);
			//得られたID一覧の数が上限(=50)になったら,「続きを検索」表示をON
			if(ids.length==50){
				contQueryIds = true;
			}
			const vals = ids.join(" ").replaceAll("Q","wd:Q"); 
			conditions+= 'VALUES ?item {'+vals+'}\n';
		}
		else if(document.getElementById('LabelPart').checked){
			conditions+= '?item rdfs:label ?label.\n';
			conditions+= 'FILTER(contains(?label,"'+textLABEL+'"))' ;
		}      
    }  
        
    //検索条件・検索項目の更新
    document.getElementById('settings_area').value
        ="let search_cond = \n" + JSON.stringify(saveSearchConds(),null,'  ') +";\n\n"
        +"let search_prop = \n" + JSON.stringify(saveSearchProps(),null,'  ') +";\n";

    //検索条件の設定
    for(let i=0; i<search_cond.length ;i++){
        const condID = search_cond[i].id;
        const textCond = search_cond[i].cond; 
        const textVal = search_cond[i].val;
        if(textCond!="" && textVal!=""){
            if(search_cond[i].type =="ID"){
                conditions+= '?item '+textCond+' '+textVal+ '.\n';
            }
            else if(search_cond[i].type =="getID"){
                const qid = await getWdIDse(textVal); //IDを検索で取得     
                conditions+= '?item '+textCond+' '+"wd:"+qid+ '.\n';
            }
            else if(search_cond[i].type =="STR-ja"){
                conditions+= '?item '+textCond+' "'+textVal+ '"@ja .\n';
            }
            else if(search_cond[i].type =="REPLACE"){
                conditions+= textCond.replace('####',textVal)+'\n';
            }
        }  
    }

    //検索項目の設定
    let opt_select = "";
    let options = "";
	for(let i=0;i<search_prop.length;i++){
        const optid = search_prop[i].id;        
        const textOpt = search_prop[i].prop;
        const textPname = search_prop[i].pname; 
        
        if(textOpt!=""){
            opt_select += '?'+optid+'Label';
            if(search_prop[i].optional){
                options += 'OPTIONAL{?item '+ textOpt+' ?'+optid+' .}\n';
            }
            else{
                options += '?item '+ textOpt+' ?'+optid+' .\n';
            }
        }
    }
	
    query = query.replace("{",conditions+options)
                 .replace("?itemLabel","?itemLabel "+opt_select);

    if(offset!=0 && !contQueryIds){
        query += "OFFSET "+offset; 
    }

	return query;
}



//Wikidata ID の検索を実行する　※こちらは廃止の方向で？
async function makeWikidataQuery(){
    const resultArea = document.getElementById('result_div');
    // let options = document.getElementById('query_area').value;
    // const endpoint ="https://www.wikidata.org/w/api.php";
	
	const textLABEL = document.getElementById('LABEL').value;
	if(textLABEL==""){
		alert("検索キーワードを入力してください");
		return;
	}
	const endpoint ="https://www.wikidata.org/w/api.php";
    const options ="?action=wbsearchentities&search="+textLABEL+"&language=en&limit=50&format=json";
	document.getElementById('query_area2').value = options;

    document.getElementById('result_box').style.display="flex";
    showSearchIng(resultArea);

    const resultData = await sendWdQuery(endpoint,options);
    document.getElementById('resjson_area').value = JSON.stringify(resultData,null,'  ');  
    
    //showWdResult(resultData,resultArea); 
	showWdResultWithLink(resultData,resultArea); //詳細表示との連携用
}


/* 
 * 検索中...アニメーションの表示
 */
function showSearchIng(resultArea){
	const orgDiv = resultArea.innerHTML;
	resultArea.innerHTML=orgDiv+'<div id="searching"><h2>検索中...</h2>'
	   + '<div class="flower-spinner"><div class="dots-container">'
	   +'<div class="bigger-dot"><div class="smaller-dot"></div>'
	   +'</div></div></div>'+'<br></div>' ;
}
function removeSearchIng(){
	const searchingDiv = document.getElementById("searching");
	if(searchingDiv!=null){
		searchingDiv.innerHTML="";
	}
}