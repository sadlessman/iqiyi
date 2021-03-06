define(['config'], function() {
	require(['jquery', 'jqcookie'], function() {
		//头部数量的显示
		(function() {
			if ($.cookie('cookienum')) {
					var n = $.cookie('cookienum').split(','); 
					var v = 0;
					if (n.length > 0) {
						$.each(n, function(i, value) {
							v = v +Number(value);
						});
					}
					$('.sidelan ul:nth-of-type(1) li:nth-of-type(2) i').html(v);
					$('.top-right li:nth-of-type(1) em').html(v);
			}
		})();
		//详情页加入购物车的实现
		(function() {
			var arrsid = [];
			var arrnum = [];
			var allnum = 0;

			if (arrnum.length > 0) {
				arrnum = $.cookie('cookienum').split(',');
				$.each(arrnum, function(index, value) {
					allnum += Number(value);
				});
				$('.sidelan ul:nth-of-type(1) li:nth-of-type(2) i').html(allnum);
			}


			function cookietoarray() {
				if ($.cookie('cookiesid') && $.cookie('cookienum')) {
					arrsid = $.cookie('cookiesid').split(',');
					arrnum = $.cookie('cookienum').split(',');
				} else {
					$('.sidelan ul:nth-of-type(1) li:nth-of-type(2) i').html(allnum);
				}
			}
			$('.buybtns input[name="buy"]').on('click', function() {
				allnum = 0;
				var $sid = $(this).parents('.main').find('.smallpic').attr('sid');
				cookietoarray();
				if ($.inArray($sid, arrsid) != -1) {
					var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.numinput input').val());
					arrnum[$.inArray($sid, arrsid)] = num;
					$.cookie('cookienum', arrnum.toString(), {
						expires: 10
					});
				} else {
					arrsid.push($sid);
					$.cookie('cookiesid', arrsid.toString(), {
						expires: 10
					});

					arrnum.push($('.numinput input').val());
					$.cookie('cookienum', arrnum.toString(), {
						expires: 10
					});

				}
				if (arrnum.length > 0) {
					arrnum = $.cookie('cookienum').split(',');
					$.each(arrnum, function(index, value) {
						allnum += Number(value);
					});
				}

				$('.sidelan ul:nth-of-type(1) li:nth-of-type(2) i').html(allnum);
				$('.top-right li:nth-of-type(1) em').html(allnum);
			});
		})();


		//购物车的渲染
		(function() {
			
			function kong() {
				if ($.cookie('cookiesid') && $.cookie('cookienum')) {
					$('.empty-cart').hide();
				} else {
					$('.empty-cart').show();
				}
			}
			
			function priceall() {
				var $sum = 0;
				var $count = 0;
				var x = 0;
				$('.cart-content:visible').each(function(index, element) {
			
					if ($(element).find('.cart-conm input').prop('checked')) {
			
						$sum += parseInt($(element).find('.numinput').find('input').val());
						$count += parseFloat($(element).find('.allprice-li').html());
					}
				});
			
				$('.cart-footer').find('em').html($sum);
				$('#allmoney i').html($count.toFixed(2));
			}
			
			function splist(id, count) {
				$.ajax({
					url: 'http://10.31.162.173/iqiyifub/iqiyi/php/iqiyidata.php', 
					dataType: 'json'
				}).done(function(data) {
					$.each(data, function(index, value) {
						if (id == value.sid) {
							var $clonebox = $('.cart-content:hidden').clone(true, true);
							$clonebox.find('.cart-conm').find('img').attr('src', value.url);
							$clonebox.find('.cart-conm').find('img').attr('sid', value.sid);
							$clonebox.find('.cart-cont').find('p').html(value.title);
							$clonebox.find('.price-li').find('p:nth-of-type(2)').html(value.price);
							$clonebox.find('.numinput').find('input').val(count);
							$clonebox.find('.allprice-li').html((value.price * count).toFixed(2));
							$clonebox.css('display', 'block');
							$('.cartxx-con').append($clonebox);
							priceall();
							kong();
						}
					});
				})
			}
			
			
			function singlegoodsprice(obj) { 
				var $dj = parseFloat(obj.parents('.cart-content').find('.price-li').find('p:nth-of-type(2)').html());
				var $cnum = parseInt(obj.parents('.cart-content').find('.numinput input').val()); 
				return ($dj * $cnum).toFixed(2); 
			}
			
			function cookietoarray() {
				if ($.cookie('cookiesid') && $.cookie('cookienum')) {
					arrsid = $.cookie('cookiesid').split(','); 
					arrnum = $.cookie('cookienum').split(','); 
				}
			}
			
			function setcookie(obj) { 
				cookietoarray(); 
				var $index = obj.parents('.cart-content').find('img').attr('sid');
				arrnum[$.inArray($index, arrsid)] = obj.parents('.cart-content').find('.numinput input').val();
				$.cookie('cookienum', arrnum.toString(), 7);
			}
			
			
			function delgoodslist(sid, arrsid) {
				var $index = -1;
				$.each(arrsid, function(index, value) {
					if (sid == value) {
						$index = index;
					}
				});
				arrsid.splice($index, 1); 
				arrnum.splice($index, 1); 
				$.cookie('cookiesid', arrsid.toString(), 7); 
				$.cookie('cookienum', arrnum.toString(), 7);
			}
			
			
			kong();
			//xuanran
			if ($.cookie('cookiesid') && $.cookie('cookienum')) {
				var s = $.cookie('cookiesid').split(','); //数组sid
				var n = $.cookie('cookienum').split(','); //数组num
				$.each(s, function(i, value) {
					splist(s[i], n[i]);
				});
			}


			$('.allcheck input').on('change', function() {
				$('.cart-content:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
				$('.allcheck input').prop('checked', $(this).prop('checked'));
				priceall();
			});

			var $inputs = $('.cart-content:visible').find(':checkbox');
			$('.cart-content').on('change', $inputs, function() { 
				if ($('.cart-content:visible').find('input:checkbox').length == $('.cart-content:visible').find(
						'input:checked').size()) {
					$('.allcheck input').prop('checked', true);
				} else {
					$('.allcheck input').prop('checked', false);
				}
				priceall(); 
			});



			$('.changebtn span:nth-of-type(1)').on('click', function() {
				var $count = $(this).parents('.cart-content').find('.numinput input').val();
				$count++;
				if ($count >= 99) {
					$count = 99;
				}
				$(this).next().css({
					"background-position-y": "-22px"
				});
				$(this).parents('.cart-content').find('.numinput input').val($count);
				$(this).parents('.cart-content').find('.allprice-li').html(singlegoodsprice($(this))); 
				priceall();
				setcookie($(this));
			});

			$('.changebtn span:nth-of-type(2)').on('click', function() {
				var $count = $(this).parents('.cart-content').find('.numinput input').val();
				$count--;
				if ($count <= 1) {
					$count = 1;
					$(this).css({
						"background-position-y": "-66px"
					});
				}

				$(this).parents('.cart-content').find('.numinput input').val($count);
				$(this).parents('.cart-content').find('.allprice-li').html(singlegoodsprice($(this))); 
				priceall();
				setcookie($(this));
			});

			$('.numinput input').on('input', function() {
				var $reg = /^\d+$/g; 
				var $value = parseInt($(this).val());
				if ($reg.test($value)) { 
					if ($value >= 99) { 
						$(this).val(99);
					} else if ($value <= 0) {
						$(this).val(1);
					} else {
						$(this).val($value);
					}
				} else { 
					$(this).val(1);
				}
				$(this).parents('.cart-content').find('.allprice-li').html(singlegoodsprice($(this))); 
				priceall();
				setcookie($(this));
			})


			

			$('.cart-content').on('click', '.operate-li a', function(ev) {
				cookietoarray(); 
				if (confirm('你确定要删除吗？')) {
					$(this).first().parents('.cart-content').remove(); 
				}
				delgoodslist($(this).first().parents('cart-content').find('img').attr('sid'), arrsid);
				priceall();
				kong();
			});


			$('.cart-footer a:first').on('click', function() {
				cookietoarray(); 
				if (confirm('你确定要全部删除吗？')) {
					$('.cart-content:visible').each(function() {
						if ($(this).find('input:checkbox').is(':checked')) { 
							$(this).remove();
							delgoodslist($(this).find('img').attr('sid'), arrsid);
						}
					});
					priceall();
					kong();
				}
			});

		})();
	})
})
