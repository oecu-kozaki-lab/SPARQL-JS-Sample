function parseText(text){
	//　○○の××は？
	var index = text.lastIndexOf("の");
	if(index>0){
		var subj = text.substring(0,index);
		var prop = text.substring(index+1);
		var endChar = prop.lastIndexOf("？");
			if(endChar+1 == prop.length){
				//alert('「？」の除去');
				prop = prop.substring(0,endChar);
			}
		endChar = prop.lastIndexOf("は");
			if(endChar+1 == prop.length){
				//alert('「は」の除去');
				prop = prop.substring(0,endChar);
			}
			
		var token ={
			'subj' : subj ,
			'prop' :prop
		}
		
		console.log('subj:'+token.subj +'\nprop:'+token.prop);
		
		return token;
	}
}
