// 发送  get 请求，获取天气情况
function myFun(result) {
	var cityName = result.name;
	$.getJSON('http://api.map.baidu.com/telematics/v3/weather?callback=?', {
		// getCurrentCity() 或  cityName
		location: cityName,
		output: 'json',
		ak: 'iw5m2G7ayDow8ofDdDGVUMB3',
		mcode: 'com.BaiduWeather'
	}, function(data) {
		console.log(data);
		// 先取出  result
		var result = data.results[0];
		// 把城市显示在页面上
		$('header').text(result.currentCity);
		// 取出  pm25
		var pm25 = result.pm25;
		// 获取当天天气状况
		var today = result.weather_data[0];
		$('main .icon').css('background-image', 'url(' + today.dayPictureUrl + ')');
		$('main .temper').text(today.temperature);
		$('main .weather').text(today.weather);
		$('main .wind').text(today.wind);
		// 截取当前实时温度
		var nowTemper = today.date.substr(today.date.indexOf('：') + 1);
		nowTemper = nowTemper.replace(')', '');
		$('main .current').text('实时温度' + nowTemper + ' ,空气指数 ' + pm25 + ', ' + getpm25String(pm25));

		// 后三天天气状况
		var sections = $('footer section');
		for(var i = 1; i < result.weather_data.length; i++) {
			// 取出显示的  section
			var section = sections[i - 1];
			// 再取出对应的天气
			var weather = result.weather_data[i];
			// 显示
			$('.week', section).text(weather.date);
			$('.icon', section).css('background-image', 'url(' + weather.dayPictureUrl + ')');
			$('.temper', section).text(weather.temperature);
			$('.weather', section).text(weather.weather);
			$('.wind', section).text(weather.wind);
		}
	});
}
// 根据  pm25 得到空气状况: 优、良、差、严重……
function getpm25String(pm25) {
	if(pm25 <= 50) {
		return '优';
	} else if(pm25 <= 100) {
		return '良';
	} else if(pm25 <= 200) {
		return '轻度污染';
	} else if(pm25 <= 300) {
		return '中度污染';
	} else if(pm25 <= 400) {
		return '重度污染';
	} else if(pm25 <= 500) {
		return '严重污染';
	} else {
		return '专家说: 来场大风是治理雾霾的最佳方案';
	}
}
var myCity = new BMap.LocalCity();
myCity.get(myFun);
// 获取当前所在城市
function getCurrentCity() {
	// 这里有获取当前城市的代码(百度一下)
	// ……
	var city = remote_ip_info['city'];
	return city + '市';
}

