function parseText(text){
	//　○○の××は？
	var index = text.lastIndexOf(text,'の');
	if(index>0){
		var subj = text.substring(0,index-1);
		var prop = text.substring(index+1);
		
		alert('subj:'+subj +'\nprop:'+prop);
		
		var token ={
			'subj' : subj ,
			'\nprop' :prop
		}
		
		return token;
	}
	

}