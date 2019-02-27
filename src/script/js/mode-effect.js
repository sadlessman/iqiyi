define(['config'], function() {
	require(['jquery'], function() {
		require(['jqlazy'],function () {
			//懒加载
		$("img.lazy").lazyload();
		});
		
		//首页顶部小轮播
		(function () {
			if ($('.head-right')) {
				var $num=0;
				var $conli=$('.head-right').find('li');
				
				$('.head-right .leftarr').on('click',function () {
					
					if($num>1){
						$num=0;
					}
					
					$conli.eq($num).animate({
						opacity:1
					}).siblings('li').animate({
						opacity:0
					});
					$num++;
				});
				$('.head-right .rightarr').on('click',function () {
					
					if($num>1){
						$num=0;
					}
					console.log($conli);
					
					$conli.eq($num).animate({
						opacity:1
					},300).siblings('li').animate({
						opacity:0
					},300);
					$num++;
				});
			}
		})();
		
		
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
		
		//放大镜效果
		(function () {
			$('.smallpic').on('mouseover',function () {
				$('.smallzoom').show();
				$('.bigzoom').show();
				$('.smallpic').mousemove(function(e){
                var x=e.clientX;
                var y=e.clientY;
                var sX=$('.smallpic').offset().left;
                var sY=$('.smallpic').offset().top;
                var mx=x-sX;
                var my=y-sY;
                var mw=$('.smallzoom').width()/2;
                var mh=$('.smallzoom').height()/2;
				
				 $('.smallzoom').css({width:$('.smallpic').width()*$('.bigzoom').width()/$('.bigpic').width()+'px',height:$('.smallpic').height()*$('.bigzoom').height()/$('.bigpic').height()+'px'});
                $('.smallzoom').css({left:mx-mw+'px',top:my-mh+'px'});
				var bili=$('.bigzoom img').width()/$('.smallpic').width();
                   var lw=$('.smallzoom').position().left;
                    var lh=$('.smallzoom').position().top;
                    var maxW=$('.smallpic').width()-$('.smallzoom').width()
                    var maxH=$('.smallpic').height()-$('.smallzoom').height()
                    if(lw<=0){$('.smallzoom').css('left','0px');}
                    if(lw>=maxW){
                        $('.smallzoom').css('left',maxW+'px');
                    }
                    if(lh<=0){$('.smallzoom').css('top','0px');}
                    if(lh>=maxH){
                        $('.smallzoom').css('top',maxH+'px');
                    }
                    var lw=$('.smallzoom').position().left;
                    var lh=$('.smallzoom').position().top;
                    var newX=lw*bili;
                    var newY=lh*bili;
                $('.bigzoom img').css({left:-newX+'px',top:-newY+'px'});
        })

			})
			$('.smallpic').on('mouseout',function () {
				$('.smallzoom').hide();
				$('.bigzoom').hide();
			})
			
			$('.imglist').on('mouseover','li',function () {
				$('.smallpic img').attr({src:$(this).find('img').attr("src")});
				$('.bigpic').attr({src:$(this).find('img').attr("src")});
			})
		})();
		
		//侧边栏出现
		(function () {
			if ($(".right-lan")) {
				
				$(window).on('scroll',function () {
					if ($('html,body').scrollTop()>800) {
						$(".right-lan").show();
					}else{
						$(".right-lan").hide();
					}
				});
				$(".right-gotop").on('click',function () {
					 $('html , body').animate({scrollTop: 0},'slow');
				});
				$(".righht-fankui").on('mouseover',function () {
					$('.righht-fankui').css({"background-position":"-50px 0"})
				});
				$(".right-gotop").on('mouseover',function () {
					$('.right-gotop').css({"background-position":"-50px -128px"})
				});
				$(".righht-fankui").on('mouseout',function () {
					$('.righht-fankui').css({"background-position":"-50px -82px"});
				});
				$(".right-gotop").on('mouseout',function () {
						$('.right-gotop').css({"background-position":"-50px -46px"});
				});
			}
		})();
		
		//首页下部轮播
		(function () {
			if ($('.brand-content')) {
				var $num=0;
				var $conli=$('.brand-content').find('li');
				$('.brand-content').hover(function () {
					$('.brand-content span').show();
				},function () {
					$('.brand-content span').hide();
				});
				$('.brand-content .ljt').on('click',function () {
					
					if($num>1){
						$num=0;
					}
					console.log($conli);
					
					$conli.eq($num).animate({
						opacity:1
					}).siblings('li').animate({
						opacity:0
					});
					$num++;
				});
				$('.brand-content .rjt').on('click',function () {
					
					if($num>1){
						$num=0;
					}
					console.log($conli);
					
					$conli.eq($num).animate({
						opacity:1
					},300).siblings('li').animate({
						opacity:0
					},300);
					$num++;
				});
			}
		})();
		
		
		
		
	})
})
