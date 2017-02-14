$(document).ready(function(){
    $("#head_nav").click(function(){
        nav=$(".topnav");
        navNum=nav.find("li").length;
        obSize=$(".topnav ul > li").width();

		var $liList = $(".topnav ul > li");
		var i=20;

		var liListArray = $liList.map(function(){
				i=i+$(this).width()+16;
			});
        
        $("html").toggleClass("topnav-open");
        $(".topnav").toggleClass("topnav-open");
        $(".entypo-menu").toggleClass("entypo-close");
        $(".topnav>ul").css("width",i);

        b=$("#close");
        b.bind("mousewheel click touchstart touchend",function(){
            $("html").removeClass("topnav-open");
            $(".topnav").removeClass("topnav-open");
            $(".entypo-menu").removeClass("entypo-close");
            return!1
        });
        
        $(".topnav").bind("mousewheel touchstart",function(a){});
    });
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > 150) {
			$(".side_nav").fadeIn();
		}else{
			$(".side_nav").fadeOut();
		}
	});
    
    $(".head_top, .side_top").click(function(){
        $("html, body").animate({scrollTop:0},400);
        return!1
    });
	
	function fnSetFocus(type, type_nm, add_top) {
        if (type.toUpperCase() != 'ID') {
            var focus_id = '.'+ type_nm;
        } else {
            var focus_id = '#'+ type_nm;
        }

        //Target 고정 처리 S
        var intOffset = $(focus_id).offset();
        var intOffsetTop = intOffset.top - add_top;
        var intOffsetLeft = intOffset.left;

        $('body, html').stop();
        $('body, html').animate({ scrollTop: intOffsetTop }, "slow");
        //Target 고정 처리 E
    };
    
    $('.side_bottom').click(function() {
      fnSetFocus('id', 'footer', 0);
    });
	
	$(".categorylist li a").each(function(h){
		if($(this).find("img[alt*='N']").length<1)
			return;
		
		var tn = $(this).find("img").length;
		var th = $(this).find(".c_cnt");
		var f  = $(this).find("img[alt*='N']");
		if(tn>0){th.addClass("accent");f.hide();}
	});
	
	$(".section_2 .category .open ul li ul li").each(function(){
		var side_nav    = $(this).find("ul");
		var side_length = $(this).find("ul").length;
		var nav_close	= $(this).find("ul").parent();
		var a_rename	= $(this).find("ul").prev();
		if(side_length > 0){
			nav_close.toggleClass("close");
			a_rename.attr({href:"javascript:;"})
		}
		nav_close.click(function(){
			side_nav.slideToggle();
			nav_close.toggleClass("open");
		});
	});
	
	$(".fixed_txt_col li").each(function(h){
		if($(this).find("img.dno").length<1)
			return;

		var th=$(this).find("a");
		var tn=$(this).find("strong img").length;
		if(tn>0){th.append('<span class="thumbnew">N</span>');}
	});
	
	$(".section_1 #article").ready(function(){
		var wfull  = $(this).find(".imageblock .cap1");
		var mbtext = $(this).find(".mobile_list").length;
		var retext = $(this).find(".fixed_img_col");
		var rename = "fixed_txt_col";
		var wnsize = parseInt(window.innerWidth);
		wfull.css("width","100%");
		
		if(mbtext > 0 && wnsize < 768){
			retext.removeClass("fixed_img_col");
			retext.hide();
			retext.toggleClass("fixed_txt_col");
			retext.show();
		}else{
			var fthumb    = $(this).find(".first_thumb").length;
			var fthumbfst = $(this).find(".fixed_img_col ul li:first-child");
			var fstimg    = $(this).find(".fstimg");
			
			$(".fixed_img_col li").each(function(h){
				if($(this).find("img.dno").length<1)
					return;

				var i=$(this).find("a").attr("href");
				var j="R360x0";
				var k="";
				var th=$(this).find(".thumb");
				var d=$(this).find(".thumb img");
				var f=$(this).find(".thumb #str");
				var pp=$(this).find("p");
				var tn=$(this).find("strong img").length;
				var $t=$(this);
				
				if(tn>0){th.append('<span class="thumbnew">N</span>');}
				
				$.ajax({url:i,dataType:"html",success:function(b){
					var tl=b.indexOf('<meta property="og:image" content="',0);
					var en=0;
					var a=0;

					tl=b.indexOf('id="category" href="/category/',0);
					if(tl>0){
						tl=b.indexOf('">',tl);
						var pe=b.indexOf('</a>',tl);
						var strip=b.substring(tl+2,pe);
						strip=strip.replace(/(<([^>]+)>)/ig,"");
					}
					if(tl<0)tl=b.indexOf('<div class="another_category',0);
					if(tl<0)tl=b.indexOf('<!-- article ed -->',0);
					if(tl<0)tl=b.indexOf('</body',0);
					b=b.substring(b.indexOf('<div class="article">',0),tl);
					var e='http://cfile';
					var g='"';
					if(en>0) return;
							if(b.match(e+"(.*?)"+g)!=null){
								a=b.match(e+"(.*?)"+g)[0];
								a=a.substring(0,a.length-1);
								d.removeClass("dno");
								a=a.replace("C74x107",j);
								a=a.replace("S74x74",j);
								a=a.replace("image",j);
								d.attr("src",a.replace('original',j));
								f.hide();
								if(fthumb == 1){
									var w = parseInt(window.innerWidth);
									fstsize_with = $(".fstsize").width();
									fthumbfst.addClass("fstsize");
									diva = $(".fixed_img_col .fstsize .diva");
									fft  = $(".fixed_img_col .fstsize .diva").attr("src");
									diva.attr("src",fft.replace("R360x0","image"));
									hght = diva.height();
									
									var section_size = $(".section_1").width();
									if(w < 768){
										$(".fstsize a").css("height",(section_size*0.5));
										$(".fstsize a .thumb").css("height",(section_size*0.5));
									}else{
										if(w > 767 && w < 960){
											$(".fstsize a").css("height","200");
											$(".fstsize a .thumb").css("height","200");
										}else{
											if(w > 1199){
												$(".fstsize a").css("height","380");
												$(".fstsize a .thumb").css("height","380");
											}else{
												$(".fstsize a").css("height","300");
												$(".fstsize a .thumb").css("height","300");
											}
										}
									};
									fthumb++;
								}else{};
							}else{
								e='http://book.daum-img.net/';
								g='"';
								if(b.match(e+"(.*?)"+g)!=null){
									a=b.match(e+"(.*?)"+g)[0];
									a=a.replace('"','');
									a=a.substring(0,a.length);
									a=a.replace("image",j);
									a=a.replace("R72x100",j);
									d.attr("src",a.replace('original',j));
									d.removeClass("dno");
									f.hide();
								}else{
									e='youtube.com/';
									var c=b.indexOf(e);
									if(c>0){
										c=b.indexOf("/",c+13)+1;
										var l=b.indexOf("?",c);
										if(l<0||l-c>20){
											l=b.indexOf("&",c)
										}
										if(l<0||l-c>20){l=b.indexOf('"',c)}
										var idx=b.substring(c,l);
										d.removeClass("dno");
										d.attr("src","http://i2.ytimg.com/vi/"+idx+"/"+"hqdefault.jpg");
										f.hide();
										$t.addClass("youtube");
									}else{
										e = 'videofarm.daum.net/';
										var c = b.indexOf(e);
										if(c > 0){
											c = b.indexOf("=",c+20)+1;
											var l = b.indexOf("&",c);
											var idx = b.substring(c,l);
											if(idx != "x-shockwave-flash"){
												d.removeClass("dno");
									d.attr("src","http://i1.daumcdn.net/thumb/C120x90/?fname=http://i1.daumcdn.net/svc/image/U03/tvpot_thumb/"+idx+"/thumb.png");
												f.hide();
											}else{}//f.text("No Img")
										}else{
											e="vimeo.com/video/";
											var c=b.indexOf(e);
											if(c>0){
												var idx=b.substring(c+16,c+25);	
												var vimeoVideoID=jQuery.trim(idx);
												jQuery.getJSON('http://vimeo.com/api/v2/video/'+vimeoVideoID+'.json?callback=?',{format:"json"},function(data,status){
													var idx=data[0].thumbnail_large;
													d.removeClass("dno");
													d.addClass("vimimg");							
													d.attr("src",idx)
													f.hide();
												});
											}else{}//f.text("No Img")
										}
									}//videofarm.daum.net
								}//youtube.com
							}
						}
					}
				);
			});
		};
	});
});

function makeHTML(textNode) {
	var re = /(?:(?=(?:http|https):)([a-zA-Z][-+.a-zA-Z\d]*):(?:((?:[-_.!~*'()a-zA-Z\d;?:@&=+$,]|%[a-fA-F\d]{2})(?:[-_.!~*'()a-zA-Z\d;\/?:@&=+$,\[\]]|%[a-fA-F\d]{2})*)|(?:(?:\/\/(?:(?:(?:((?:[-_.!~*'()a-zA-Z\d;:&=+$,]|%[a-fA-F\d]{2})*)@)?(?:((?:(?:(?:[a-zA-Z\d](?:[-a-zA-Z\d]*[a-zA-Z\d])?)\.)*(?:[a-zA-Z](?:[-a-zA-Z\d]*[a-zA-Z\d])?)\.?|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[(?:(?:[a-fA-F\d]{1,4}:)*(?:[a-fA-F\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(?:(?:[a-fA-F\d]{1,4}:)*[a-fA-F\d]{1,4})?::(?:(?:[a-fA-F\d]{1,4}:)*(?:[a-fA-F\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))?)\]))(?::(\d*))?))?|((?:[-_.!~*'()a-zA-Z\d$,;:@&=+]|%[a-fA-F\d]{2})+))|(?!\/\/))(\/(?:[-_.!~*'()a-zA-Z\d:@&=+$,]|%[a-fA-F\d]{2})*(?:;(?:[-_.!~*'()a-zA-Z\d:@&=+$,]|%[a-fA-F\d]{2})*)*(?:\/(?:[-_.!~*'()a-zA-Z\d:@&=+$,]|%[a-fA-F\d]{2})*(?:;(?:[-_.!~*'()a-zA-Z\d:@&=+$,]|%[a-fA-F\d]{2})*)*)*)?)(?:\?((?:[-_.!~*'()a-zA-Z\d;\/?:@&=+$,\[\]]|%[a-fA-F\d]{2})*))?)(?:#((?:[-_.!~*'()a-zA-Z\d;\/?:@&=+$,\[\]]|%[a-fA-F\d]{2})*))?)/img;			
	var source = textNode.data;
	return source.replace(re, function() {
		var url = arguments[0];
		var a = $('<a></a>').attr({'href': url, 'target': '_blank'}).text(url);
		return url.match(/^https?:\/\/$/) ? url : $('<div></div>').append(a).html();
	});
};
	 
function eachText(node, callback) {
	$.each(node.childNodes, function() {
		if (this.nodeType != 8 && this.nodeName != 'A') {
			this.nodeType != 1 ? callback(this) : eachText(this, callback);
		}
	});
};

$(".section_1 #article").ready(function(){
	var lnk = $(this).find(".comment_list");
	return lnk.each(function() {
		var queue = [];
		eachText(this, function(e) {
			var html = makeHTML(e);
			if (html != e.data) {
				queue.push([e, makeHTML(e)]);
			}
		});
		$.each(queue, function(i, x) {
			$(x[0]).replaceWith(x[1]);
		});
	});
});

$(".section_2 .sidebox").ready(function(){
	var tmpDom = $(this).find(".t_menu_area");
	$(tmpDom).append(toLog);
});

thumbsize = function(x_size,y_size){
	var w = parseInt(window.innerWidth);
	var section_size  = $(".section_1").width();
	if(w < 768){
		var thumb_x_size = x_size;
		var thumb_y_size = y_size;
		var thumb_x = section_size * 0.5;
		var thumb_y = thumb_x * thumb_y_size / thumb_x_size;
		var hght = $(".fstsize a .thumb .diva").height();
		$(".fixed_img_col ul li a").css("height",thumb_y);
		$(".thumb img").css("min-height",thumb_y);
		$(".fstsize").css("height",(section_size * 0.5));
		$(".fstsize a").css("height",(section_size * 0.5));
		$(".fstsize a .thumb").css("height",(section_size * 0.5));
		$(".fixed_img_col ul li a .thumb #str").css("top",(thumb_y * 0.5));
		$(".fixed_img_col ul .fstsize a .thumb #str").css("top",(section_size * 0.5)*0.5);
		$(".fixed_img_col ul .fstsize a .thumb #str").css("left",(section_size * 0.5));
	}else{
		if(w > 767 && w < 960){
			var thumb_x_size = x_size;
			var thumb_y_size = y_size;
			var thumb_x = 230;
			var thumb_y = thumb_x * thumb_y_size / thumb_x_size;
			var hght = $(".fstsize a .thumb .diva").height();
			$(".fixed_img_col ul li a").css("height",thumb_y);
			$(".thumb img").css("min-height",thumb_y);
			$(".fstsize").css("height","200");
			$(".fstsize a").css("height","200");
			$(".fstsize a .thumb").css("height","200");
			$(".fixed_img_col ul li a .thumb #str").css("top",(thumb_y * 0.5));
			$(".fixed_img_col ul .fstsize a .thumb #str").css("top","100");
			$(".fixed_img_col ul .fstsize a .thumb #str").css("left","235");
		}else{
			if(w > 1199){
				var thumb_x_size = x_size;
				var thumb_y_size = y_size;
				var thumb_x = 290;
				var thumb_y = thumb_x * thumb_y_size / thumb_x_size;
				var hght = $(".fstsize a .thumb .diva").height();
				$(".fixed_img_col ul li a").css("height",thumb_y);
				$(".thumb img").css("min-height",thumb_y);
				$(".fstsize").css("height","380");
				$(".fstsize a").css("height","380");
				$(".fstsize a .thumb").css("height","380");
//				$(".fstsize a .thumb .diva").css("top",((hght-380)*0.5*-1));
				$(".fixed_img_col ul li a .thumb #str").css("top",(thumb_y * 0.5));
				$(".fixed_img_col ul .fstsize a .thumb #str").css("top","190");
				$(".fixed_img_col ul .fstsize a .thumb #str").css("left","445");
			}else{
				var thumb_x_size = x_size;
				var thumb_y_size = y_size;
				var thumb_x = 230;
				var thumb_y = thumb_x * thumb_y_size / thumb_x_size;
				var hght = $(".fstsize a .thumb .diva").height();
				$(".fixed_img_col ul li a").css("height",thumb_y);
				$(".thumb img").css("min-height",thumb_y);
				$(".fstsize").css("height","300");
				$(".fstsize a").css("height","300");
				$(".fstsize a .thumb").css("height","300");
				$(".fixed_img_col ul li a .thumb #str").css("top",(thumb_y * 0.5));
				$(".fixed_img_col ul .fstsize a .thumb #str").css("top","150");
				$(".fixed_img_col ul .fstsize a .thumb #str").css("left","355");
			};
		};
	};
	$(window).resize(function(){
		var w = parseInt(window.innerWidth);
		var section_size = $(".section_1").width();
		if(w < 768){
			var thumb_x_size = x_size;
			var thumb_y_size = y_size;
			var thumb_x = section_size * 0.5;
			var thumb_y = thumb_x * thumb_y_size / thumb_x_size;
			var hght = $(".fstsize a .thumb .diva").height();
			$(".fixed_img_col ul li a").css("height",thumb_y);
			$(".thumb img").css("min-height",thumb_y);
			$(".fstsize").css("height",(section_size * 0.5));
			$(".fstsize a").css("height",(section_size * 0.5));
			$(".fstsize a .thumb").css("height",(section_size * 0.5));
			$(".fixed_img_col ul li a .thumb #str").css("top",(thumb_y * 0.5));
			$(".fixed_img_col ul .fstsize a .thumb #str").css("top",(section_size * 0.5)*0.5);
			$(".fixed_img_col ul .fstsize a .thumb #str").css("left",(section_size * 0.5));
		}else{
			if(w > 767 && w < 960){
				var thumb_x_size = x_size;
				var thumb_y_size = y_size;
				var thumb_x = 230;
				var thumb_y = thumb_x * thumb_y_size / thumb_x_size;
				var hght = $(".fstsize a .thumb .diva").height();
				$(".fixed_img_col ul li a").css("height",thumb_y);
				$(".thumb img").css("min-height",thumb_y);
				$(".fstsize").css("height","200");
				$(".fstsize a").css("height","200");
				$(".fstsize a .thumb").css("height","200");
				$(".fixed_img_col ul li a .thumb #str").css("top",(thumb_y * 0.5));
				$(".fixed_img_col ul .fstsize a .thumb #str").css("top","100");
				$(".fixed_img_col ul .fstsize a .thumb #str").css("left","235");
			}else{
				if(w > 1199){
					var thumb_x_size = x_size;
					var thumb_y_size = y_size;
					var thumb_x = 290;
					var thumb_y = thumb_x * thumb_y_size / thumb_x_size;
					var hght = $(".fstsize a .thumb .diva").height();
					$(".fixed_img_col ul li a").css("height",thumb_y);
					$(".thumb img").css("min-height",thumb_y);
					$(".fstsize").css("height","380");
					$(".fstsize a").css("height","380");
					$(".fstsize a .thumb").css("height","380");
					$(".fixed_img_col ul li a .thumb #str").css("top",(thumb_y * 0.5));
					$(".fixed_img_col ul .fstsize a .thumb #str").css("top","190");
					$(".fixed_img_col ul .fstsize a .thumb #str").css("left","445");
				}else{
					var thumb_x_size = x_size;
					var thumb_y_size = y_size;
					var thumb_x = 230;
					var thumb_y = thumb_x * thumb_y_size / thumb_x_size;
					var hght = $(".fstsize a .thumb .diva").height();
					$(".fixed_img_col ul li a").css("height",thumb_y);
					$(".thumb img").css("min-height",thumb_y);
					$(".fstsize").css("height","300");
					$(".fstsize a").css("height","300");
					$(".fstsize a .thumb").css("height","300");
					$(".fixed_img_col ul li a .thumb #str").css("top",(thumb_y * 0.5));
					$(".fixed_img_col ul .fstsize a .thumb #str").css("top","150");
					$(".fixed_img_col ul .fstsize a .thumb #str").css("left","355");
				};
			};
		};
	});
};
