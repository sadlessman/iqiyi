define(['config'], function() {
	require(['jquery'], function() {
		require(['jqlazy'],function () {
			//懒加载
		$("img").lazyload();
		});
		
		//头图折叠功能
		(function () {
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
		})();
		
		
		
		//悬浮二维码
		(function () {
			var $erweibtn=$('.top-right li:nth-of-type(5)');
		var $bakbox=$('.top-right li:nth-of-type(5) .backbox');
		var $erweicontent=$('.erweima');
		
		$erweibtn.hover(function () {
			$bakbox.show();
			$erweicontent.show();
		},
		function () {
			$bakbox.hide();
			$erweicontent.hide();
		});
		})();
		
		
		
		//轮播
		(function () {
			var $lunbo =$('.lunbo');
			var $lunbouli =$('.lunbo ul li');
			var $olbtns=$('.lunbo ol li');
			var $lbleftb =$('.lunbo .left');
			var $lbrightb =$('.lunbo .right');
			var $timer=null;
			var $autoplaytimer=null;
			var $num=0;
			var $numcolor=0;
			
			$lunbo.hover(function () {
				$lbleftb.show();
				$lbrightb.show();
				clearInterval($autoplaytimer);
			},function () {
				$lbleftb.hide();
				$lbrightb.hide();
				$autoplaytimer=setInterval(function(){
					$lbrightb.click();
				},3000);
			})
			
			$olbtns.hover(function () {
				$numcolor=$(this).index();
				$olbtns.eq($numcolor).css({"background":"#ee394b","opacity":"1"});
			},function () {
				$olbtns.eq($numcolor).css({"background":"#000","opacity":"0.4"});
			})
			
			$olbtns.on('click',function () {
				$num=$(this).index();
				$olbtns.eq($num).css({"background":"#ee394b","opacity":"1"});
				change();
			})
			
			
			
			function change(){
				$olbtns.eq($num).css({"background":"#ee394b","opacity":"1"}).siblings('li').css({"background":"#000","opacity":"0.4"});
				$lunbouli.eq($num).animate({
					opacity:1
				}).siblings('li').animate({
					opacity:0
				});
			}
			
			$lbleftb.hover(function () {
				$lbleftb.css({"background-position":"-66px 0"});
			},function () {
				$lbleftb.css({"background-position":"0 0"});
			});
			$lbrightb.hover(function () {
				$lbrightb.css({"background-position":"-66px 0"});
			},function () {
				$lbrightb.css({"background-position":"0 0"});
			});
			
			$lbrightb.on('click',function () {
				$num++;
				if($num>$olbtns.length-1){
					$num=0;
				}
				change();
			});
			
			$autoplaytimer=setInterval(function(){
				$lbrightb.click();
			},3000);
		})();
		
		
		
		
		
		//图片缩放
		(function () {
			var $imgc=$('.imgscle');
			var $imgnum=0;
			$imgc.delegate("img","mouseover",function (event) {
			var target = $(event.target);
			target.css({"transform": "scale(1.1,1.1)"});
		});
			$imgc.delegate("img","mouseout",function (event) {
			var target = $(event.target);
			target.css({"transform": "scale(1,1)"});
		});
		})();
		
		//购物车数量加减功能
		(function () {
			var $numinput=$('.numinput input');
			var $numiadd=$('.changebtn span:nth-of-type(1)');
			var $numijian=$('.changebtn span:nth-of-type(2)');
			var $numinva=$numinput.attr("value");
			$numiadd.on('click',function () {
				$numinva++;
				if($numinva>99){
					$numinva=99;
				}
				$numijian.css({"background-position-y":"-22px"});
				$numinput.attr({value:$numinva});
			});
			$numijian.on('click',function () {
				$numinva--;
				if($numinva<=0){
					$numinva=1;
					$numijian.css({"background-position-y":"-66px"});
				}
				$numinput.attr({value:$numinva});
			});
		})();
		
	
	})
})
