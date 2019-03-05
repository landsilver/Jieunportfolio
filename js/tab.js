(function ($) {
 $(function () {

  $('#tab').each(function () {
   var $tab = $(this),
    $tabMenu = $tab.find('#tabMenu'),
    $tabList = $tabMenu.find('li'),

    $tabCon = $tab.find('#tabCon'),
    $item = $tabCon.find('li'),
    $img = $item.find('img');

   $tabList.on('click', function (e) {
    e.preventDefault();

    var $this = $(this),
     $a = $this.find('a');

    //클릭된 항목이라면, 값을 반환해라
    if ($this.hasClass('on')) {
     return;
    }
 

   $tabList.removeClass('on');
   $this.addClass('on');
    
    
   //해당 콘텐츠 item 나타내기 
   $item.hide();
   /*콜백함수 처리하려고 이렇게 쓴 것임,,*/
   /*하지만 직접 css에 적어줘도 됨 ! */
  $img.css({
   opacity: 0,
   top: '-128px'
     });
    
   //a요소의 'href' 동작 구현
   $($a.attr('href')).fadeIn('slow');
   $img.stop().animate({
    opacity: 1,
    top: 0
   }, 1000);

   });
   $tabList.first().trigger('click');
  });

 });
})(jQuery);