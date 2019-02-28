define(['config'], function() {
	require(['jquery', 'jqcookie'], function() {
		
		(function() {
			if ($('.login-idbs').length>0) {
				$('.login-input input').on('focus', function() {
				$('.login-input').find('span').show();
				$(this).attr({
					"placeholder": ''
				});
			});
			$('.login-input input').on('blur', function() {
				$('.login-input').find('span').hide();
				$(this).attr({
					"placeholder": '请输入手机号或邮箱'
				});
			});
			$('.login-pass input').on('focus', function() {
				$('.login-pass').find('span').show();
				$(this).attr({
					"placeholder": ''
				});
			});
			$('.login-pass input').on('blur', function() {
				$('.login-pass').find('span').hide();
				$(this).attr({
					"placeholder": '请输入密码'
				});
			});
			}
			
		})();
		
		//输入框获取焦点的事件

		(function() {
			$('.login-input input').on('focus', function() {
				$('.login-input').find('span').show();
				$(this).attr({
					"placeholder": ''
				});
			});
			$('.login-input input').on('blur', function() {
				$(this).attr({
					"placeholder": '请输入手机号或邮箱'
				});
			});
			$('.login-pass input').on('focus', function() {
				$('.login-pass').find('span').show();
				$(this).attr({
					"placeholder": ''
				});
			});
			$('.login-pass input').on('blur', function() {
				$(this).attr({
					"placeholder": '请输入密码'
				});
			});
		})();


		//注册表单验证
		(function() {
				
			if ($('.registerid').length>0) {
				var telyz = /^[1][3,4,5,7,8][0-9]{9}$/;
				var passwordflag = true;
				var username = false;
				var changezt = false;


				$('.login-qz').on('click', function() {
					if (changezt) {
						$('.login-qz i').css({
							'background-position': "0px -200px"
						});
						changezt = false;
					} else {
						$('.login-qz i').css({
							'background-position': "-45px -200px"
						});
						changezt = true;
					}
					if (passwordflag && username && changezt) {
						$('.login-button input').removeAttr("disabled",);
						$('.login-button input').css({"cursor": "pointer"});
					} else {
						$('.login-button input').attr({
							"disabled": 'disabled'
						});
						$('.login-button input').css({
							"cursor": "not-allowed"
						});
					}
				});


				$('.login-input input').on('blur', function() {
					if ($(this).val() == '') {
						$('.login-input').find('span').html('手机号不能为空').css({
							"color": "red"
						});
						username = false;
					} else {
						if (telyz.test($('.login-input input').val())) {
							$('.login-input').find('span').html('手机号验证成功').css({
								"color": "green"
							});
							username = true;
						} else {
							$('.login-input').find('span').html('手机号验证失败，请正确填写').css({
								"color": "red"
							});
							username = false;
						}
					
					
					var phone=$('.login-input input').val();
					
						$.ajax({
							type: 'post',
							url: 'http://10.31.162.173/iqiyifub/iqiyi/php/userdata.php',
							data: {
								tel: phone
							}
						}).done(function (data) {
							if (data) {
								$('.login-input').find('span').html('该手机号已注册').css({
								"color": "red"
							});
							}
							
						});
						
						
					}
					if (passwordflag && username && changezt) {
						$('.login-button input').removeAttr("disabled",);
						$('.login-button input').css({"cursor": "pointer"});
					} else {
						$('.login-button input').attr({
							"disabled": 'disabled'
						});
						$('.login-button input').css({
							"cursor": "not-allowed"
						});
					}

				});

				$('.login-pass input').on('blur', function() {
					if ($(this).val() == '') {
						$('.login-pass').find('span').html('密码不能为空').css({
							"color": "red"
						});
					} else {
						if (passwordflag) {
							$('.login-pass').find('span').html('密码验证通过').css({
								"color": "green"
							});
							passwordflag = true;
						} else {
							$('.login-pass').find('span').html('密码过于简单，请重新设置').css({
								"color": "red"
							});
							passwordflag = false;
						}

					}
					if (passwordflag && username && changezt) {
						$('.login-button input').removeAttr("disabled");
						$('.login-button input').css({"cursor": "pointer"});
					} else {
						$('.login-button input').attr({
							"disabled": 'disabled'
						});
						$('.login-button input').css({
							"cursor": "not-allowed"
						});
					}
				});
				$('.login-pass input').on('input', function() {
					var regnum = /\d+/; 
					var reglowercase = /[a-z]+/; 
					var reguppercase = /[A-Z]+/;
					var other = /[^0-9a-zA-Z]+/; 
					var num = 0;
					if ($(this).val() == '') {
						$('.login-pass').find('span').html('密码不能为空').css({
							"color": "red"
						});
					} else {
						if ($(this).val().length >= 8 && $(this).val().length <= 14) {
							if (regnum.test($(this).val())) {
								num++;
							}
							if (reglowercase.test($(this).val())) {
								num++;
							}
							if (reguppercase.test($(this).val())) {
								num++;
							}
							if (other.test($(this).val())) {
								num++;
							}
							switch (num) {
								case 1:
									$('.login-pass').find('span').html('弱').css({
										"color": "red"
									});
									passwordflag = false;
									break;
								case 2:
								case 3:
									$('.login-pass').find('span').html('中').css({
										"color": "orange"
									});
									passwordflag = true;
									break;
								case 4:
									$('.login-pass').find('span').html('高').css({
										"color": "green"
									});
									passwordflag = true;
									break;
							}
						} else {
							$('.login-pass').find('span').html('密码长度应在8~14位之间').css({
								"color": "red"
							});
							passwordflag = false;
						}
					}
				})


			}
		
		})();

		//注册过程
		(function() {
			if ($('.registerid').length>0) {
				var phone =$('.login-input input').val();
				var pass = $('.login-pass input').val();
				
				$('.login-button input').on('click', function() {
					
					phone =$('.login-input input').val();
					pass = $('.login-pass input').val();
					$.ajax({
						type: 'post',
						url: 'http://10.31.162.173/iqiyifub/iqiyi/php/userdata.php',
						data: {
							tel: phone,
							password: pass
						}
					}).done(function () {
						$(location).attr('href', 'http://10.31.162.173/iqiyifub/iqiyi/src/login.html');
					});
				});
			}

		})();


		//denglu
		
		(function() {
			if ($('.login-idbs').length>0) {
				$('.login-button input').css({"cursor": "pointer"});
				var phone =$('.login-input input').val();
				var pass = $('.login-pass input').val();
				
				$('.login-button input').on('click', function() {
					
					phone =$('.login-input input').val();
					pass = $('.login-pass input').val();
					$.ajax({
						type: 'post',
						url: 'http://10.31.162.173/iqiyifub/iqiyi/php/userdata.php',
						data: {
							tel: phone,
							password: pass,
							location:true
						}
					}).done(function (data) {
						if(!data){
							alert('登陆失败');
							pass.value='';
						}else{
							alert('登陆成功');
							location.href='http://10.31.162.173/iqiyifub/iqiyi/src/index.html';
							$.cookie('username',phone, {
								expires: 10
							});
						}
					});
				});
			}
		
		})();
		
		//登录状态的确认
		(function () {
			$('.login-head').hover(function () {
				$('.backbox-t').show();
				$('.tuichu').show();
			},function () {
				$('.backbox-t').hide();
				$('.tuichu').hide();
			})
			
			if ($.cookie('username')) {
				$('.login-head').show();
				$('.tuichu a:nth-of-type(1)').html($.cookie('username'));
				$('.login li:nth-of-type(2)').hide();
				$('.login li:nth-of-type(3)').hide();
			}else{
				$('.login-head').hide();
			}
			
			$('.tuichu a:nth-of-type(2)').on('click',function () {
				$.cookie('username',null, { expires:-1});
				window.location.reload();
			})	
			
		})();
		
	})
})
