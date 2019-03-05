(function ($) {
 $(function () {

  /*1
  사용자 브라우저 높이값 = section의 높이값으로 설정
  */

  //innerHeight -> padding 포함
  //outerHeight -> border 포함
  //outerHeight(true) -> margin 포함
  var $win = $(window),
   winH = $win.height(),
   $section = $('#contents section');

  $section.height(winH);


  /*2
   브라우저 사이즈가 바뀔 때마다 section의 높이값도 바뀌게 하기
  */
  $win.on('resize', function () {
   winH = $win.height();
   //=$(this).height();
   //=$(window).height();

   $section.height(winH);
  });


  /*3
  메뉴를 클릭했을 때 해당 section으로 이동
  */

  /*주어: li*/
  $('#gnb').on('click', 'li', function (e) {
   //   e.preventDefault();

   winH = $(window).height();

   var index = $(this).index(),
    newTop = winH * index;

   //글상자 숨겨놓고 시작하기
   $section.find('.txtBox').stop().animate({
    top: '55%',
    opacity: 0
   }, 'fast ');


   //콜백함수 추가 1 -모든 '.txtBox' 숨기기;
   $section.find('.txtBox').stop().animate({
    opacity: 0,
    top: '55%'
   }, 'fast');

   $('html, body').stop().animate({
    scrollTop: newTop
   }, 1500, function () {

    //현재 section 안에 있는 '.txtBox' 나타내기
    $section.find('.txtBox').stop().animate({
     opacity: 1,
     top: '50%'
    }, 'slow');

   });

   //해당 li 요소에만 addClass('on') 주기
   $('#gnb li').removeClass('on');
   $(this).addClass('on');

  });


  /*4
  스크롤했을 때 위, 아래로 이동시키기(플러그인 필요)
  "mousewheel.min.js"
  */
  $section.on('mousewheel', function (e, delta) {
   e.preventDefault();

   //첫 번째, 마지막 section이 아닐 때만 작동 시키기!!
   var index = $(this).index(),
    first = 0,
    last = $section.length - 1,
    $txtBox = $section.find('.txtBox');

   if (delta > 0 && index != first) {
    //위로 스크롤 했을 때
    //&& (and) -> 둘 다 참일 때
    //|| (or) -> 둘 중 하나만 참일 때
    var before = $(this).prev().offset().top,
     index = $section.index();
    
    //1. 글상자 숨기기
    $txtBox.stop().animate({
     top: '55%',
     opacity: 0
    }, 'fast');

  /*  //콜백함수 추가 1 -모든 '.txtBox' 숨기기;
    $section.find('.txtBox').stop().animate({
     opacity: 0,
     top: '55%'
    }, 'fast');*/


    $('html, body').stop().animate({
     scrollTop: before
    }, 1100, function () {

     //현재 section 안에 있는 '.txtBox' 나타내기
     $txtBox.stop().animate({
      opacity: 1,
      top: '50%'
     }, 'slow');

    });

   } else if (delta < 0 && index != last) {
    //아래로 스크롤 했을 때
    var after = $(this).next().offset().top;
    

    //콜백함수 추가 1 -모든 '.txtBox' 숨기기;
    $txtBox.stop().animate({
     opacity: 0,
     top: '55%'
    }, 'fast');

    $('html, body').stop().animate({
     scrollTop: after
    }, 1300, function () {

     //현재 section 안에 있는 '.txtBox' 나타내기
     $txtBox
      
      
      
      .stop().animate({
      opacity: 1,
      top: '50%'
     }, 'slow');
    });

   }

  });


  /*5
  현재 화면(section)에 해당하는 메뉴 활성화시키기
  */
  $win.on('scroll', function () {
   winH = $win.height(),
    scroll = $win.scrollTop() + winH / 2,
    count = $section.length,
    $list = $('#gnb li');

   //   console.log(scroll);
   for (var i = 0; i < count; i++) {
    if (scroll >= winH * i && scroll < winH * (i + 1)) {
     $list.removeClass('on');
     $list.eq(i).addClass('on');
    }
   }


  });


  
  /*7
  스크롤 이벤트 실행 명령
  */
  $win.trigger('scroll');
  
  
 });
})(jQuery);
