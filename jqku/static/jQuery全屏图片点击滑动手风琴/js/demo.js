// JavaScript Document
$(function(){
		   
	$(".m_top a").click(function(){
		$("html,body").animate({scrollTop: pos}, 1000);
		return false;
	});
	
	$(".i_zgs_li").click(function(){
		$(".i_zgs_li").find('.i_zgstit,.i_zgsmc').hide();
		$(".i_zgs_li").removeClass('js_wzgs');
		$(this).addClass('js_wzgs');
		$(this).find('.i_zgsmc').delay(400).fadeIn();
		$(this).find('.i_zgstit').delay(600).fadeIn();
	});
	
	
});

