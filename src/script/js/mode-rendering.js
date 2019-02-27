define(['config'], function() {
	require(['jquery'], function() {
		(function () {
			if ($('#index-footer')) {
				$('#index-footer').load('footer.html');
			}
			
		})();
		
		
		//主页数据渲染
		(function () {
			var $contentbox=$('.commodity');
			$.ajax({
				url:'http://10.31.162.173/iqiyifub/iqiyi/php/iqiyidata.php',
				dataType:'json'
			}).done(function(data){
				
				var $html='<ul>';
				$.each(data,function(index,value){
					$html+=`
						<li>
							<a href="http://10.31.162.173/iqiyifub/iqiyi/src/details.html?sid=${value.sid}" class="img-a"><img src="${value.url}" ></a>
							<div class="particulars">
								<a href="">${value.title}</a>
								<div class="sparticulars">
									
									<em>正版授权</em>
									
								</div>
								<p>
								火影忍者原创潮牌
								</p>
								<p><span>¥${value.price}</span><span>已售 1895</span></p>
							</div>
						</li>`
				});
				$html+='</ul>';
				$contentbox.html($html);
			});
		})();
		
		
		
		//详情页信息渲染
		
		(function () {
			if ($('.details-xr').length>0) {
				var xxid = location.search.substring(1).split('=')[1];
			
			$.ajax({
				url: 'http://10.31.162.173/iqiyifub/iqiyi/php/userdata.php',
				data: {
					sid: xxid
				},
				dataType: 'json'
			}).done(function(data) {//data:后端返回的和id对应的数据
				$('.smallpic img').attr('src', data.url);
				$('.bigzoom img').attr('src', data.url);
				$('.smallpic').attr('sid', data.sid);
				$('.nav-lian .spname').html(data.title);
				$('.spbt-t').html(data.title);
				$('.price .price-num em').html(data.price);
				var arr = data.urls.split(',');
				var str = '';
				$.each(arr, function(index, value) {
					str += '<li><img src="' + value + '"/></li>';
				});
				$('.imglist ul').html(str);
			});
			}
		})();
	})
})
	