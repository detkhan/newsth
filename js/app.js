
feedcat(user_id);
function feedcat(user_id) {
var news = "http://"+hosturl+"/newpaper/api/catnews.php?jsoncallback=?";
$$.getJSON(news, {datatype:'getcat',user_id:user_id}, function (data) {
//console.log(data);
var content='';
var newspaper_id;
content+='<div class="content-block-title">List View Accordion</div> \
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
getcatdata(newspaper_id);
});

content+='</ul>\
                </div>';
$$('#content').append(content);
});
}//function getcat

function getcatdata(newspaper_id) {
  var news = "http://"+hosturl+"/newpaper/api/catnews.php?jsoncallback=?";
  $$.getJSON(news, {datatype:'getcatdata',newspaper_id:newspaper_id,user_id:user_id},function (data1) {
    var  content1='';
    var con_check='';
    $$.each(data1, function(i1, field1){
      var checked=field1.checked;
      if(checked=='checked'){
      var con_check='checked="checked"';
      }
    content1+='<li>\
        <label  class="label-checkbox item-content">\
      <input id="checkbox"  type="checkbox" name="my-checkbox" newscat_id="'+field1.newscat_id+'" '+con_check+'>\
      <div class="item-media">\
        <i class="icon icon-form-checkbox"></i>\
      </div>\
          <div class="item-inner"> \
            <div  class="item-title">'+field1.catalog_name+'</div>\
          </div>\
        </label>\
      </li>';
    //  console.log(newspaper_id);
    });
    var addcat='#catdata'+newspaper_id;
    $$(addcat).append(content1);
  });
}

$$(document).on("click", "#checkbox", function() {
  var isChecked = $$(this).prop('checked');
  var newscat_id=$$(this).attr("newscat_id");
  console.log(newscat_id);
  if(isChecked===true){
  addcatdata(newscat_id);
  console.log("add");
  }else{
delcatdata(newscat_id);
console.log("del");
  }
});

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
