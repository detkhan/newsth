
//feedcat(user_id);


function getuser(){
if(localStorage.user_id)
{
user_id = localStorage.user_id;
}
else
{
var getuser = "http://"+hosturl+"/newpaper/api/getuser.php?jsoncallback=?";
$$.getJSON( getuser, {
    news_id:'news_id',
  format: "json"
  })
    .done(function( data ) {
$$.each(data, function(i, field){
user_id=field.user_id;
localStorage.user_id=field.user_id;
});
});
}
}



$$("#content").html("");
feednews(0,1,0);
//checktop();
var loading = false;
// Attach 'infinite' event handler
$$('.infinite-scroll').on('infinite', function () {
  // Exit, if loading in progress
    if (loading) return;

    // Set loading flag
    loading = true;
    myApp.showPreloader('loading...<br><span class="preloader"><span class="preloader-inner"><span class="preloader-inner-gap"></span><span class="preloader-inner-left"><span class="preloader-inner-half-circle"></span></span><span class="preloader-inner-right"><span class="preloader-inner-half-circle"></span></span></span></span>');

    // Emulate 1s loading
    setTimeout(function () {
      // Reset loading flag
      loading = false;
      var page=$$("#clicknewsbutton").attr('pagenews');
      var typexx=$$("#clicknewsbutton").attr('typex');
      var newscat_idxx=$$("#clicknewsbutton").attr('newscat_idx');
      var checkmenu=$$("#content").attr('checkmenu');
      if(checkmenu==1){
      //console.log(page);
      feednews(page,typexx,newscat_idxx);
myApp.hidePreloader();
      }
  }, 2000);

});

var ptrContent = $$('.pull-to-refresh-content');
ptrContent.on('ptr:refresh', function (e) {
    // Emulate 2s loading
myApp.showPreloader('refresh...<br><span class="preloader"><span class="preloader-inner"><span class="preloader-inner-gap"></span><span class="preloader-inner-left"><span class="preloader-inner-half-circle"></span></span><span class="preloader-inner-right"><span class="preloader-inner-half-circle"></span></span></span></span>');
setTimeout(function () {
      $$("#content").html("");
      feednews(0,1,0);
      myApp.hidePreloader();
myApp.pullToRefreshDone();
  }, 2000);
  });

function feednews(pagex,typex,newscat_idx) {
//myApp.showPreloader('loading...<br><span class="preloader"><span class="preloader-inner"><span class="preloader-inner-gap"></span><span class="preloader-inner-left"><span class="preloader-inner-half-circle"></span></span><span class="preloader-inner-right"><span class="preloader-inner-half-circle"></span></span></span></span>');
$$("#content").attr("checkmenu",'1');
var page=parseInt(pagex);
var next=parseInt(page)+1;
var url = "http://"+hosturl+"/newpaper/api/fetnews.php?jsoncallback=?";
$$.getJSON(url, {page:page,user_id:user_id,type:typex,newscat_id:newscat_idx}, function (data) {
$$.each(data, function(i, field){
  var contentnews='<div class="card facebook-card" id="'+field.newsdetail_id+'"> \
  <div class="card-header">   \
    <div class="item-media"><i class="facebook-avatar"><img src="'+field.news_logo+'" width="34" height="34"></i></div>  \
    <div class="facebook-name">#'+field.catalog_name+'</div>  \
    <div class="facebook-date">'+field.published+'</div>  \
  </div> \
  <div class="card-content"> \
    <div class="card-content-inner"> \
  <div id="newslinkclick" linknews="'+field.news_link+'" newsdetail_id="'+field.newsdetail_id+'"> \
      <p>'+field.news_title+' \
      <img src="'+field.news_image+'" width="100%"> \
  <p id="totallike" class="color-gray">ถูกใจ:<span id="likecon'+field.newsdetail_id+'">'+field.totallike+'</span>แชร์:'+field.totalshare+'อ่านแล้ว:'+field.totalread+'</p> \
    </div> \
  </div> \
  </div> \
   <div class="card-footer"> \
    <a id="likenews" newsdetail_id="'+field.newsdetail_id+'" numlike="'+field.totallike+'" href="#"><div><i class="material-icons">thumb_up</i></div></a> \
    <a id="share" newstitle="'+field.news_title+'"  newsimg="'+field.news_image+'" linknews="'+field.news_link+'" href="#"><div><i class="material-icons">share</i></div> \
  </div> \
  </div> \
';
var divcontent='#'+field.newsdetail_id;
var checkcontent=$$(divcontent).html();
  if(checkcontent){

}else{
$$("#content").append(contentnews);
}

//myApp.showPreloader('loading...<br><span class="preloader"><span class="preloader-inner"><span class="preloader-inner-gap"></span><span class="preloader-inner-left"><span class="preloader-inner-half-circle"></span></span><span class="preloader-inner-right"><span class="preloader-inner-half-circle"></span></span></span></span>');

}); //each
if(next==1){
var content2='<div id="clicknewsbutton" pagenews="'+next+'"  typex="'+typex+'"  newscat_idx="'+newscat_idx+'"></div>';
$$("#content").append(content2);
}else{
$$( "#clicknewsbutton" ).attr( "pagenews", next );
$$( "#clicknewsbutton" ).attr( "typex", typex );
$$( "#clicknewsbutton" ).attr( "newscat_idx", newscat_idx );
}
//myApp.hidePreloader();
});
}//function feednews








function feedcat(user_id,type) {
var news = "http://"+hosturl+"/newpaper/api/catnews.php?jsoncallback=?";
$$.getJSON(news, {datatype:'getcat',user_id:user_id}, function (data) {
//console.log(data);
var content='';
var newspaper_id;
if(type==0){
var namecat="เลือกติดตามข่าวตามที่สนใจ";
}else{
var namecat="เลือกอ่านข่าวตามหมวดของสำนักพิมพ์";
}
content+='<div class="content-block-title">'+namecat+'</div> \
                <div class="list-block accordion-list"> \
                  <ul>';
$$.each(data, function(i, field){
//console.log(field.newspaper_name);
newspaper_id='';
newspaper_id=field.newspaper_id;

content+='<li class="accordion-item"><a href="#" class="item-content item-link"> \
<div class="item-media">\
<i class="facebook-avatar"><img src="'+field.newpaper_logo+'" width="34" height="34"></i></div>\
                        <div class="item-inner"> \
                          <div class="item-title">\
                            <div class="item-title">'+field.newspaper_name+'</div>\
                          </div> \
                        </div></a> \
                      <div class="accordion-item-content"> \
                      <div class="list-block">\
                        <ul id="catdata'+field.newspaper_id+'">';
content+=' </ul>\
                      </div>\
                      </div> \
                    </li>';
getcatdata(newspaper_id,type);
});

content+='</ul>\
                </div>';
$$('#content').append(content);
});
}//function getcat

function getcatdata(newspaper_id,type) {

  var news = "http://"+hosturl+"/newpaper/api/catnews.php?jsoncallback=?";
  $$.getJSON(news, {datatype:'getcatdata',newspaper_id:newspaper_id,user_id:user_id},function (data1) {
    var  content1='';
    var con_check='';
    $$.each(data1, function(i1, field1){
    if(type==0){
      var checked=field1.checked;
      if(checked=='checked'){
      var con_check='checked="checked"';
      var con_check2='checked="checked"';
    }else{
      var con_check2='checked="no"';
    }
    content1+='<li>\
        <label  class="label-checkbox item-content" id="checkbox" newscat_id="'+field1.newscat_id+'" '+con_check2+'>\
      <input   type="checkbox" name="my-checkbox" newscat_id="'+field1.newscat_id+'" '+con_check+'>\
      <div class="item-media">\
        <i class="icon icon-form-checkbox"></i>\
      </div>\
          <div class="item-inner"> \
            <div  class="item-title">'+field1.catalog_name+'</div>\
          </div>\
        </label>\
      </li>';
    }else{
      content1+='<li>\
          <label  class="item-content" id="barcat" newscat_id="'+field1.newscat_id+'">\
            <div class="item-inner"> \
              <div  class="item-title">'+field1.catalog_name+'</div>\
            </div>\
          </label>\
        </li>';
    }
    //  console.log(newspaper_id);
    });
    var addcat='#catdata'+newspaper_id;
    $$(addcat).append(content1);
  });
}

$$(document).on("click", '#checkbox', function() {
  var isChecked = $$(this).attr('checked');
  var newscat_id=$$(this).attr("newscat_id");
  //alert(isChecked);
  //console.log(newscat_id);
  if(isChecked=="no"){
  addcatdata(newscat_id);
  var isCheckedadd = $$(this).attr('checked',"checked");
  //console.log("add");
  }else{
delcatdata(newscat_id);
  var isCheckedadd = $$(this).attr('checked',"no");
//console.log("del");
  }
});
/*
$$(document).on("click", 'input[type="text"]', function() {
  var isChecked = $$(this).prop('checked');
  var newscat_id=$$(this).attr("newscat_id");
  //console.log(newscat_id);
  if(isChecked===true){
  addcatdata(newscat_id);
  //console.log("add");
  }else{
delcatdata(newscat_id);
//console.log("del");
  }
});
*/
function addcatdata(newscat_id){
  var newsdetail = "http://"+hosturl+"/newpaper/api/catnews.php?jsoncallback=?";
  $$.getJSON( newsdetail, {
      datatype:"addcatdata",
      user_id:user_id,
      newscat_id:newscat_id,
  });
}//function addcatdata

function delcatdata(newscat_id){
  var newsdetail = "http://"+hosturl+"/newpaper/api/catnews.php?jsoncallback=?";
  $$.getJSON( newsdetail, {
      datatype:"delcatdata",
      user_id:user_id,
      newscat_id:newscat_id,
  });
}//function delcatdata

$$(document).on("click", "#barcat", function() {
$$("#content").html("");
myApp.attachInfiniteScroll($$('.infinite-scroll'));
var addback='<a id="catbar" href="#" class="floating-button color-pink"> \
Back \
  </a>';
$$(".page").append(addback);
var newscat_id=$$(this).attr('newscat_id');
 feednews(0,3,newscat_id);
});




$$(document).on("click", "#feed", function() {
 $$(".floating-button").html("").hide();
$$('.tab-link-highlight').transform('translate3d(0%, 0px, 0px)');
$$("#content").html("");
myApp.attachInfiniteScroll($$('.infinite-scroll'));
feednews(0,1,0);
});

$$(document).on("click", "#catalog", function() {
$$(".floating-button").html("").hide();
$$('.tab-link-highlight').transform('translate3d(100%, 0px, 0px)');
$$("#content").html("");
feedcat(user_id,0);
myApp.detachInfiniteScroll($$('.infinite-scroll'));
});
$$(document).on("click", "#newstop", function() {
$$(".floating-button").html("").hide();
$$('.tab-link-highlight').transform('translate3d(200%, 0px, 0px)');
$$("#content").html("");
feednews(0,2,0);
 });
 $$(document).on("click", "#catbar", function() {
$$("#content").html("");
 $$('.tab-link-highlight').transform('translate3d(300%, 0px, 0px)');
 $$(".floating-button").html("").hide();
 feedcat(user_id,1);
 myApp.detachInfiniteScroll($$('.infinite-scroll'));
 });
 $$(document).on("click", "#setting", function() {
$$(".floating-button").html("").hide();
$$("#content").html("");
setting();
$$('.tab-link-highlight').transform('translate3d(400%, 0px, 0px)');
 myApp.detachInfiniteScroll($$('.infinite-scroll'));
 });

$$('a.tab-link').click(function(){
    $$('a.tab-link').removeClass("active");
    $$(this).addClass("active");
});

function setting() {
var content='<div class="card"> \
    <div class="card-header">นโยบายความเป็นส่วนตัว</div> \
    <div class="card-content"> \
<div class="card-content-inner">\
โปรแกรมนี้จัดทำขึ้นมาเพื่อรวบรวมลิงค์ข่าวจากเวบข่าวต่าง ๆ ไม่ได้เก็บข้อมูลเนื้อหาข่าวใด ๆ ไว้ในเครื่องเซอเว่อร์หรือในแอพพลิเคชั่น</br>สำนักข่าวอาจจะมีการเพิ่มลดเปลี่ยนแปลงโดยไม่แจ้งให้ทราบล่วงหน้า</br>ติดต่อสอบถามหรือจ้างงานได้ที่ nawacenter@gmail.com </div>\
    </div>\
  </div>';
  $$('#content').append(content);
}


$$(document).on("click", "#likenews", function() {
var newsdetail_id=$$(this).attr('newsdetail_id');
var numlike=$$(this).attr('numlike');
var numlikeall=parseInt(numlike)+1;
var n = numlikeall.toString();
var totallike = "http://"+hosturl+"/newpaper/api/totallike.php?jsoncallback=?";
$$.getJSON( totallike, {
    newsdetail_id:newsdetail_id,
  format: "json"
  });
$$("#likecon"+newsdetail_id).html("");
$$("#likecon"+newsdetail_id).append(n);


 });


$$(document).on("click", "#share", function() {
var newstitle=$$(this).attr('newstitle');
var newsimg=$$(this).attr('newsimg');
var newslink=$$(this).attr('linknews');
var newsdetail_id=$$(this).attr('newsdetail_id');
var totalshare = "http://"+hosturl+"/newpaper/api/totalshare.php?jsoncallback=?";
 $$.getJSON( totalshare, {
     newsdetail_id:newsdetail_id,
  format: "json"
   });
window.plugins.socialsharing.share(null, null, null, newslink);

  });

$$(document).on("click", "#newslinkclick", function() {
  var newslink=$$(this).attr('linknews');
  var newsdetail_id=$$(this).attr('newsdetail_id');
   var totalread = "http://"+hosturl+"/newpaper/api/totalread.php?jsoncallback=?";
    $$.getJSON( totalread, {
        newsdetail_id:newsdetail_id,
    	format: "json"
      });
  var ref = cordova.InAppBrowser.open(newslink, '_blank', 'location=yes','hardwareback=yes');
  with (ref) {

          addEventListener('exit', loadexitCallBack);
      }

   });
   var numads=0;
   function loadexitCallBack(){
  if(numads==0){
  if(AdMob) AdMob.showInterstitial();
  }
  numads++;
   }
