define(['config'], function() {
	require(['jquery'], function() {
		
		//头图折叠功能
		var $changeimg=$('.img-top span');
		var $imgtop=$('.img-top');
		setTimeout(function () {
			$changeimg.click();
		},5000);
		$changeimg.on("click",function () {
			if ($imgtop.height()!=60) {
				$imgtop.animate({
					height:60,
					}, 200,function () {
						 $changeimg.html('展开');
						 $changeimg.after().css({"background-position":"0 0"});
						 $imgtop.css({"background-image":"url(https://pic0.iqiyipic.com/common/20190211/bc8452dd02b54be3bc96b7532c2f1224.jpg)"});
					} );
			}else{
				$imgtop.css({"background-image":"url(https://pic0.iqiyipic.com/common/20190211/1922081dbef5496880f8b0f8073cad3c.jpg)"});
				$imgtop.animate({
				height:400,
				}, 200 ,function () {
					$changeimg.html('收起');
					$changeimg.after().css({"background-position":"0 -15px"});
				});
			}
			
		});
	})
})
