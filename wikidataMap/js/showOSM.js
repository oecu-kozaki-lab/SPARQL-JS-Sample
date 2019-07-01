function showMAP(data,mapid){
	   var lat            = 34.663888888;
	   var lon            = 135.460833333;

   // 位置とズームを決めてマップを描画
   var map = L.map(mapid,{
       center:[lat, lon],
       zoom: 11
   });

   // OpenStreetMapを使うためのおまじない
   var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   });

   //GoogleMapを使う場合
//   var tileLayer = L.tileLayer(
//			'http://mt{s}.google.com/vt/lyrs=m@121&hl=ja&x={x}&y={y}&z={z}',
//			{ subdomains: [0,1,2,3] }
//		).addTo(map);

   tileLayer.addTo(map);

   var icon_w = 21;//14;
   var icon_h = 30;//20;

   var userIcon = L.icon({
       iconUrl: 'icon/image001.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [0, icon_h],
   });



   // 指定した位置にマーカーを置く
   for (var d = 0; d < data.length; d++) {
		var v_label = data[d]['label'].value;
		//var v_cat = data[d]['pin'].value;
		var v_point = data[d]['point'].value.replace("Point","").replace("(","").replace(")","");
		var point = v_point.split(" ");
		v_lat = point[1];
		v_long = point[0];

//カスタマイズアイコンを利用する場合
//	var mapMarker = L.marker([v_lat, v_long], {icon: userIcon});
	var mapMarker = L.marker([v_lat, v_long]);
	   mapMarker.addTo(map);
	   mapMarker.bindPopup('<b>'+v_label+'</b><br>'+v_lat +","+v_long
			   );
   }

}



