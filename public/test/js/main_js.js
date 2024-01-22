

      // main popup open style
      var layer_OPEN_POP = function (obj_selector){
        setTimeout(() => {
          var obj = $(obj_selector);
          obj.css({'display':'table','opacity':0});
          obj.stop().animate({'opacity':1},500);
        }, 200);
       };



$(function () {

  
    // $(window).resize(function(){
    //   layer_CLOSE('.popup_mn_04');
    //   $('html').removeClass('fixed'); 
    // })

    //한영 전환
    // let btnLang = $(".select_lang a");
    // btnLang.on('click', function() { 
    //     let nowLang = $("#container").attr("data-lang");
    //     let selLang = $(this).attr("data-lang");
    //     if(nowLang != selLang){
    //         selectLanguage(selLang);
    //     }
    //     return false;
    // });

    // var lang = {
    //     "kr": {
    //         "sec_01": ['타이틀', '서브타이틀']
    //     },
    //     "en": {
    //         "sec_01": ['title', 'subtitle']
    //     }
    // }

    // selectLanguage("kr");
    // function selectLanguage(e){
    //     $("#container").attr("data-lang", e);
    //     $(".main_sec_01 .title").text(lang[e]['sec_01'][0])
    //     $(".main_sec_01 .sub_title").text(lang[e]['sec_01'][1])
    // }


    
    //mn_vis :: main visual banner
    $(document).ready(function(){
      const titleBox = $('.mn_vis_wrapper .txt_box');
      const character = $('.mn_vis_wrapper .cha');
      character.addClass('active');
      titleBox.addClass('on');
    })
    // mn_vis :: scroll down
    $('#btn_next').on('click',function(){
      // const pixelToRemUnit = () => {
      //   return 90 / parseFloat(getComputedStyle(document.documentElement).fontSize) + "rem";
      // }
      var headHeight = $('.mn_sec_01').offset().top - 67.5;
      $('html,body').stop().animate({'scrollTop':headHeight },500, 'easeInOutExpo');
    })


    
    // section common - tit scroll
    $(window).scroll(function(){
      $(".tit_box").each(function () {    
        var winh = $(window).height();  
        var scrt = $(window).scrollTop();  
        t = $(this).offset().top
        if (scrt >= t - winh * 0.15) { //scrt 스크롤 탑 값,winh 윈도우 높이 값
          $(this).addClass("on");
        }
      })//each end
      $(".ani_faUp").each(function () {    
        var winh = $(window).height();  
        var scrt = $(window).scrollTop();  
        t = $(this).offset().top
        if (scrt >= t - winh * 0.15) { //scrt 스크롤 탑 값,winh 윈도우 높이 값
          $(this).addClass("on");
        }
      })//each end
    })//scroll

    $(window).resize(function(){
      $(".tit_box").each(function () {    
        var winh = $(window).height();  
        var scrt = $(window).scrollTop();  
        t = $(this).offset().top
        if (scrt >= t - winh * 0.15) { //scrt 스크롤 탑 값,winh 윈도우 높이 값
          $(this).addClass("on");
        }
      })//each end
      $(".ani_faUp").each(function () {    
        var winh = $(window).height();  
        var scrt = $(window).scrollTop();  
        t = $(this).offset().top
        if (scrt >= t - winh * 0.15) { //scrt 스크롤 탑 값,winh 윈도우 높이 값
          $(this).addClass("on");
        }
      })//each end
    })//resize

    //mn_sec_02 counting num
    let countFlag = true;
    $(window).scroll(function(){      
        // $(window).one('scroll', function(){      
          var scrNow = $(window).scrollTop();
          var mn_sec_02 = $('.mn_sec_02').offset().top - 500;
          if(mn_sec_02 < scrNow && countFlag == true){
             $('.mn_sec_02 .count_num').each(function() { 
              var $this = $(this),
                  countTo = $this.attr('data-count');
              $({ countNum: $this.text()}).animate({countNum: countTo},
              {
             
                duration: 2000, 
                easing:'linear',
                step: function() {
                    countFlag = false;
                  $this.text(Math.ceil(this.countNum).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
                  //$this.text(Math.floor(this.countNum));
                },
                complete: function() { 
                    countFlag = false;
                  $this.text(Math.ceil(this.countNum).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
                  //$this.text(this.countNum);
                  return false;
                }
              });
            });
          }      
    })

    // mn_sec_03 tab
    const mn_sec_03_tab = $('.mn_sec_03 .tab_menu');
    const mn_sec_03_cont = $('.mn_sec_03 .tab_cont');

    mn_sec_03_tab.on('click',function(e){
      e.preventDefault();
      const idx = $(this).index();
      mn_sec_03_cont.eq(idx).addClass('active').siblings().removeClass('active');
      $(this).addClass('active').siblings().removeClass('active');
    })

    // mn_sec_03 swiper-container
    var mn_sec_03_swiper = new Swiper('.mn_sec_03 .tab_cont .swiper-container', {
        effect: 'fade',
        observer: true,
        observeParents: true,
        allowTouchMove: true,
        speed: 500,
        resistance: true,
        freeMode: false,
        // navigation: {
        //   nextEl: '.mn_sec_03 .swiper-container .btn_next',
        //   prevEl: '.mn_sec_03 .swiper-container .btn_prev',
        // },
        pagination: {
            el: '.mn_sec_03 .swiper-container .swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 0,
    })
    
    
    // mn_sec_04
    $('.btn_bubble').on('click', function () {
      var idx = $(this).index();
      var pop = $('.popup_mn_04').eq(idx);
      $('html').addClass('fixed'); 
      setTimeout(() => {
        pop.addClass('on');
      }, 300);
    });
    $('.popup_mn_04 .btn_close').on('click', function () {
      $(this).parent().parent().parent().removeClass('on');
      $('html').removeClass('fixed'); 
    });    
    $('.popup_mn_04 .bg').on('click', function () {
      $('html').removeClass('fixed'); 
    });
    
    
    // mn_sec_06 swiper-container
    const h_year = $('.mn_sec_06 .h_year span');
    const h_year_list = ['2023','2022','2021','2020','2019','2018'];
    const h_desc = $('.mn_sec_06 .desc_box');
    const h_desc_list = ["<p>충청권역 플라스틱 회수 확장</p><div class='company'>신세계아이앤씨, 조선호텔앤리조트, 한국쓰리엠(주), KT&G, SK지오센트릭</div>","<p>온라인 플라스틱 회수 시작</p><p>가플지우 해안정화 활동 '이달의 바다' 론칭</p><div class='company'>(주)비와이앤블랙야크, (주)에스에스지닷컴, 브리타, 유익컴퍼니, 자원순환사회연대, CJ제일제당, G마켓</div>","<p>스타필드 하남 가플지우 전시회 진행</p><div class='company'>아이엠어서퍼, 포스코</div>","<p>업사이클 줍깅 키트 제작 기부</p><div class='company'>해양환경공단</div>","<p>79개 점포로 플라스틱 회수 확장</p><p>업사이클 굿즈 제작 및 지역사회 기부</p>","<p>가플지우 파트너십 체결</p><p>이마트 30개 점포 플라스틱 회수 시작</p><div class='company'>이마트, 테라사이클, 한국피앤지</div>"];

    var mn_sec_06_swiper = new Swiper('.mn_sec_06 .swiper-container', {
        observer: true,
        observeParents: true,
        allowTouchMove: true,
        speed: 500,
        resistance: true,
        freeMode: false,
        centeredSlide: true,
        pagination: {
            el: '.mn_sec_06 .swiper-pagination',
            type: "progressbar",
        },
        slidesPerView: 1.2,
        spaceBetween: 64,
        loop: true,           
        loopAdditionalSlides: 1,
        on: {
          slideChange: function () {
              var thisTxt = h_year_list[this.realIndex].toString();
              var thisDesc = h_desc_list[this.realIndex].toString();
              h_year.text(thisTxt);
              h_desc.html(thisDesc);
          },
        },
        breakpoints: {
          1400: {
              spaceBetween: 40,
          },
          1024: {
              spaceBetween: 30,
          },
          767: {
            slidesPerView: 1.1,
              spaceBetween: 20,
          },
          440: {
            slidesPerView: 1.1,
              spaceBetween: 10,
          },
        }
    })

    // 자동 재생 추가
    $(window).on('scroll', function () {
      if($('.mn_sec_06 .slide_wrap').hasClass('on')){
        mn_sec_06_swiper.autoplay.start(3000);
      }    
    });
    $(window).on('load', function () {
      if($('.mn_sec_06 .slide_wrap').hasClass('on')){
        mn_sec_06_swiper.autoplay.start(3000);
      }    
    });


    
    // mn_sec_04 popup
    var popup_mn_04_swiper = new Swiper('.popup_mn_04_01 .swiper-container', {
      effect: 'fade',
      observer: true,
      observeParents: true,
      allowTouchMove: true,
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlide:true,
      speed: 500,
      resistance: true,
      freeMode: false,
      navigation: {
        nextEl: '.popup_mn_04_01 .swiper-container .btn_next',
        prevEl: '.popup_mn_04_01 .swiper-container .btn_prev',
      },
      pagination: {
          el: '.popup_mn_04_01 .swiper-container .swiper-pagination',
          type: 'bullets',
          clickable: true,
      },
  })

});

