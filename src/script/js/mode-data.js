define(['config'], function() {
	require(['jquery'], function() {
		$('.seek-content input').on('input',function () {
			var seekval=$('.seek-content input').val();
			$('.top-data-list').show();
			$('.top-data-list').html('');
			require(["https://suggest.video.iqiyi.com/?if=mall&key="+seekval+"&callback=define"],
				function(data) {
					var linshidata=$(data.data);
					linshidata.each(function (index,suju) {
						var name=suju.name;
						var num=suju.item_cnt;
						var str=`
						<li><a href="http://so.iqiyi.com/mall?keyword=${name}&source=suggest"><span>${name}</span><em>约${num}件商品</em></a></li>`;
						$('.top-data-list').append(str);
					})
				}
			);
		});
		$('.seek-content input').on('blur',function () {
			setTimeout(function () {
				$('.top-data-list').hide();
			},500)
			
		})
		 
		$('.top-data-list').on("click",'li',function (event) {
			var $lidata= $(event.target).find('span').html();
			$('.seek-content input:nth-of-type(1)').val($lidata);
		})
		$('.seek-content input:nth-of-type(2)').on('click',function () {
			
			var $inputdata=$('.seek-content input:nth-of-type(1)').val();
			var url="http://so.iqiyi.com/mall?keyword="+$inputdata+"&source=suggest"
			location.href=url;
		})
		
	});
})
