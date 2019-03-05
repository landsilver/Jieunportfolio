(function($){
 $(function(){
  
  //**배너 디자인
  $('#banner').each(function(){
   
  //html 요소를 jQuery 객체로 변환하는 변수선언
   var $banner = $(this),
       $slide = $banner.find('.slide'),
       $pic = $slide.find('a'),
       $btn = $banner.find('.btn'),
       $indicator = $banner.find('.indicator');
   
  //일반 변수선언
   var sp = 1500,
       interval = 5000, //몇 초마다 변하는지
       
       count = $pic.length, //이미지 총 개수
       currentIndex = 0,
       timer, //자 동 재 생//전역변수로 선언을 해줘야만 재생, 정지가 가능함
       indicatorHTML = '';
   
   //1. 이미지를 배치하면서 (거의 동시에) 인디케이터를 만들기
   $pic.each(function(i){
    $(this).css({
     left: 100 * i + '%'
    });
    //인디케이터 앵커태그 추가하기 (변수에 문자열을 저장해준 것임)
    indicatorHTML += '<a href="#">'+i+'</a>';
   });
   
   //저장된 인디케이터를 삽입
   $indicator.html(indicatorHTML);
   
  
   //2. 슬라이드 재생 함수 만들기
   function slideShow(j) {
    $slide.animate({
     left: -100 * j + '%'
    }, sp);
    //이동 후 currentIndex값 변경하기
    currentIndex = j;
    
    updateNav();
   }  
   //3. btn, indicator 상태 업데이트 함수 만들기
    function updateNav() {
     
     //인디케이터 상태 업데이트
    $indicator.find('a').removeClass();
    $indicator.find('a').eq(currentIndex).addClass('on');
     
     
    //첫 번째 이미지인 경우 숨김 처리
     if(currentIndex == 0) {
      $btn.find('.prev').addClass('on')
     } else {
      $btn.find('.prev').removeClass('on')
     }
     
     //마지막 이미지인 경우 숨김 처리
     if(currentIndex == count - 1) {
      $btn.find('.next').addClass('on')
     } else {
      $btn.find('.next').removeClass('on')
     }
    
   }
   
   //4. indicator를 클릭하면 해당 이미지로 이동하기
    $indicator.on('click', 'a', function(e){
    e.preventDefault();
    
    //클릭하지 않은 앵커만 작동시키기
   if(!$(this).hasClass('on')) {
      slideShow($(this).index());
    }
    
   });
   
   //5. btn를 클릭했을 때 이전, 이후로 이동시키기
   $btn.on('click', 'a', function(e){
    e.preventDefault();
    
    if($(this).hasClass('next')){
       slideShow(currentIndex + 1)
       } else {
       slideShow(currentIndex - 1)
       }
    
   });
   
   var timer; //언제든 변수선언 가능 ! function 위에만 있으면 됨
   
   //6. 자동재생 함수 만들기
   function startTimer() {
    timer = setInterval(function(){
     
     var nextIndex = (currentIndex + 1) % count;
     
     slideShow(nextIndex);
     
    }, interval); //반드시 시간을 써줘야함
   }
   
   //6-1. 일시정지 함수 만들기
   function stopTimer() {
    clearInterval(timer);
   }
   
   //6-3. 마우스 이벤트에 따른 함수 호출(실행)
   //jQuery 표기방법
  /* $banner
    .on('mouseenter', function(){
    stopTimer();
   })
    .on('mouseleave', function(){
    startTimer();
   });
   */
   
   //javaScript 표기방법
   $banner.on({
    mouseenter: stopTimer,
    mouseleave: startTimer
   })
   
   //슬라이드 함수 호출(인디케이터가 삽입된 후에 만들어줄 것)
   //+자동재생 함수 호출
   slideShow(currentIndex);
   startTimer();
   
  });
  
 });
})(jQuery);