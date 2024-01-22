
  //레이어 오픈 
	var layer_OPEN = function (obj_selector){
		var obj = $(obj_selector);
		obj.css({'display':'table','opacity':0});
		obj.stop().animate({'opacity':1},500);
	};

	//레이어 클로즈
	var layer_CLOSE = function (obj_selector){
		var obj = $(obj_selector);	
		obj.stop().animate({'opacity':0},500,function (){
			$(this).css({'display':'none'});	
		});
	};


$(function(){
 // 헤더
 $(".btn_menu").on('click',function(){	
	$('html').toggleClass('fixed');   
	$('#header .nav_mo').toggleClass('on');
		$('#header').toggleClass('active_mo');
		$(this).toggleClass('switch'); 
})

// 헤더 스크롤시 변경
// $(window).scroll(function () {
// 	var st = $(this).scrollTop();
// 	var navbarHeight = $('header').outerHeight();
// 	//var winw = $(window).width()
// 	//if( winw > 1024){
// 		if( st > navbarHeight){
// 			$("#header").addClass('active')
// 		}else{      
// 			$("#header").removeClass('active')
// 		}
// 	//} 
// })


	// 최상단 버튼
	$('#btn_top').on('click',function(){
		$('html,body').stop().animate({'scrollTop':0},500, 'easeInOutExpo');
	})

	$(window).scroll(function(){
		var btnTop = $('#btn_top');
		var $window = $(window), anchor = $window.scrollTop() + $window.height();
    var fot = $('#footer').offset().top;
      if (anchor > fot) btnTop.removeClass('fixed');
      else btnTop.addClass('fixed');
	})

	// $(window).scroll(function(){
	// 	var ftTop = $('#footer').offset().top;
	// 	var btTop = $('#btn_top').offset().top;	
	// 	// var w = $(window).scrollTop();	
  //   //if (winW >= 1200) {
	// 		if (ftTop < btTop){
	// 			$('#btn_top').stop().animate({'bottom': '20rem'},200, 'easeInOutExpo')
	// 		}
	// 		if (ftTop >= btTop){
	// 			$('#btn_top').stop().animate({'bottom': '3rem'},200, 'easeInOutExpo')
	// 		}
	// 	//}
	// })
	// $(window).resize(function(){		
	// 	var ftTop = $('#footer').offset().top;
	// 	var btTop = $('#btn_top').offset().top;	
	// 		if (ftTop < btTop){
	// 			$('#btn_top').stop().animate({'bottom': '20rem'},200, 'easeInOutExpo')
	// 		}
	// 		if (ftTop >= btTop){
	// 			$('#btn_top').stop().animate({'bottom': '3rem'},200, 'easeInOutExpo')
	// 		}
	// })
})
  



