/**
 * Created with JetBrains WebStorm.
 * User: wangshucheng
 * Date: 13-05-12
 * Time: 12:29 PM
 * To change this template use File | Settings | File Templates.
 */
var URLInfo;
URLInfo = {
baseurl:'',
keywords:'',
value:''
    
    
};



function goback(){
    
    
    $('#page_'+sessionStorage.getItem('current_page')).find('.content').children().show();
    $('.footer').show();
    $('.detail_view').hide();
    
    
}

function gohome(){
    $.mobile.changePage('#page_1');
    setPagination(1);
    sessionStorage.setItem("current_page",1);
}

function setPagination(idx)
{
    
    console.log('current page '+idx);
    $this = $('.pagination') ;
    $this.find('a').removeClass('active');
    
    $this.find('#p'+idx).addClass('active');
    addPaginationToDom(idx);
}


function addPaginationToDom(idx){
    var total_pages = sessionStorage.getItem('total_pages');
    var page_num = 0;
    if (idx>total_pages) return;
    
    $('.footer').show();
    
    $('.pagination').empty();
    $('.pagination').append('<li><a  onclick="gohome()" >First</a></li>');
    
    if (idx<=10){
        
        page_num = total_pages >10 ? 10:total_pages;
        
        console.log("totalpage "+total_pages);
        console.log("page "+page_num);
        
        for (i = 1; i<=page_num;i++)
        {
            if (i == idx)
                $('.pagination').append('<li><a href="#"  class = "active" id='+'p'+i+'>'+i+'</a></li>');
            else
                $('.pagination').append('<li><a href="#"  id='+'p'+i+'>'+i+'</a></li>');
            
        }
        if (total_pages > 10){
            $('.pagination').append('<li>...</a></li>');
        }
        
    }
    else if(idx<=20){
        page_num = (total_pages-10) >10 ? 20:total_pages;
        $('.pagination').append('<li>...</a></li>');
        for (i = 11; i<=page_num;i++)
        {
            if (i == idx)
                $('.pagination').append('<li><a href="#"  class = "active" id='+'p'+i+'>'+i+'</a></li>');
            else
                $('.pagination').append('<li><a href="#"  id='+'p'+i+'>'+i+'</a></li>');
            
        }
        
        $('.pagination').append('<li>...</a></li>');
        
    }
    else if(idx<=30){
        page_num = (total_pages-20) >10 ? 30:total_pages;
        $('.pagination').append('<li>...</a></li>');
        for (i = 21; i<=page_num;i++)
        {
            if (i == idx)
                $('.pagination').append('<li><a href="#"  class = "active" id='+'p'+i+'>'+i+'</a></li>');
            else
                $('.pagination').append('<li><a href="#"  id='+'p'+i+'>'+i+'</a></li>');
            
        }
        
    }
    else return;
    
}


// functions:
function getNewsBlocks(type, keyword) {
    
    URLInfo.baseurl = "http://cnewsfinder.appspot.com/?";
    URLInfo.keywords = type;
    URLInfo.value = keyword;
    var url = URLInfo.baseurl + URLInfo.keywords + '=' + URLInfo.value;
    var result = {};
    
    if( (type!='cataname') && (type!='sitename'))
    {
        alert('wrong type');
        return;
    }
    return $.getJSON(url, function (data) {
                     
                     result = data;
                     var reclist;
                     if (type=='cataname')
                     reclist = data['catagory'];
                     else if(type=='sitename')
                     reclist = data['website'];
                     else
                     return;
                     var pageData = '';
                     
                     sessionStorage.setItem('reclist', JSON.stringify(reclist));
                     sessionStorage.setItem('total_pages',Math.floor(reclist.length/5));
                     });
}

function createDom(reclist,cat) {
    var title = '';
    title = sessionStorage.getItem('current_keyword');
    if (title==null)
        title = 'news';

    
    
    
    //pageData is one page's core data, it contains 5 news blocks.
    var pageData = '',
    pageData0 = '';
    
    $.each(reclist, function (id, data) {
           var idx = id + 1;
           var number = idx / 5 ;
           
           if (idx > 150) return;
           //            console.log('img'+data["img"]);
           //
           //            console.log('time'+data["time"]);
           //            console.log('author'+data["author"]);
           //            console.log('article'+data["article"]);
           
           
           pageData +=
           "<div class=" + "div_" + idx % 5 + " class = 'content_div'" + " data-idx=" + idx + ">" +
           
           "<img class='img' src=" + data["img"] + ">" +
           "<div class='article'>" +
           
           "<h3 class='title'>" + data["title"] + "</h3>" +
           "<span class='timeauthor' style='color: #db7093'>" + data["time"] + " " + data["author"] + "</span>" +
           data["article"] + "</div>" +
           
           "</div>";
           
           if ((idx % 5 == 0) && (idx != 0)) {
           //newPage is the complete IPAD news page, it includes headers, settings and the content - pageData.
           var newPage = $(
                           "<div class='ui-page hidden'  data-role='page'  id=" + "page_" + number + "> " +
                           //            '<div class="content" >'+
                           '<div data-role="header" class="head" data-theme="c">' +
                           '<h1>'+title+'</h1>' +
                           '<a href="#left-panel" data-icon="bars" data-iconpos="notext" data-shadow="false" data-iconshadow="false">Menu</a>' +
                           '<a href="#right-panel" data-icon="bars" data-iconpos="notext" data-shadow="false" data-iconshadow="false">Menu</a>' +
                           '</div>' +
                           
                           '<div data-role="content"  class="content">' +
                           
                           "<div class=" + "css_" + number % 5 + ">" +
                           //wrap pagedata here:
                           "<div class ='content_div'>" +
                           pageData + // this is the 5 news block
                           "</div>" +
                           
                           '</div>' +
                           
                           '</div>' +
                           
                           
                           '<div data-role="panel" id="left-panel"  class="setting" data-position="left" data-theme="c">\
                           <ul class="cata_listview" data-role="listview" data-theme="d" >\
                           <li data-icon="delete"><a href="#" data-rel="close">关闭</a></li>\
                           </ul>\
                           </div>' +
                           
                           '<div data-role="panel" id="right-panel"  class="setting2" data-position="right" data-theme="c">\
                           <ul class="site_listview" data-role="listview" data-theme="d" >\
                           <li data-icon="delete"><a href="#" data-rel="close">关闭</a></li>\
                           </ul>\
                           </div>' +
                           
                           '<div class="footer" data-role=\"footer\" data-theme="c" >' +
                           //                                            '<span onclick="gohome()">Home</span>' +
                           '<ul class="pagination">'+
                           '<li><a  onclick="gohome()" >First</a></li>'+
                           //                                                '<li><a href="#" class="active" id="p1" title="1">1</a></li>'+
                           //                                                '<li><a href="#"  id="p2">2</a></li>'+
                           //                                                '<li><a  id="p3">3</a></li>'+
                           //                                                '<li><a href="#"  id="p4">4</a></li>'+
                           
                           '</ul>'+
                           '</div>' +
                           
                           //         '</div>'+
                           "</div>"
                           
                           );
           //Add new created page to JQM pageContainer:
           newPage.appendTo($.mobile.pageContainer);
           //Every 5 news create new page, empty pageData.
           pageData = '';
           }
           
           });//end of each loop
    
    
    // $.mobile.changePage('#page_1');
    
    
}


function addDetalViewToDom(reclist){
    $('.content_div').children().click(function () {
                                       
                                       var news_id = $(this).attr("data-idx") - 1;
                                       var pageId = (Math.floor(news_id / 5 + 1));
                                       sessionStorage.setItem('current_page', pageId);
                                       $this = $('#page_' + pageId).find('.content');
                                       $this.children().hide();
                                       $('.footer').hide();
                                       //
                                       var detail_page = $(
                                                           "<div class='detail_view'>" +
                                                           "<a " + 'onclick=goback()' + ">Back</a>" +
                                                           "<h3>" + reclist[news_id]['title'] + "</h3>" +
                                                           "<span>" + reclist[news_id]['time'] + '   ' + "</span>" +
                                                           "<span>" + reclist[news_id]['author'] + "</span><br/>" +
                                                           "<img src=" + reclist[news_id]['img'] + ">" +
                                                           "<p>" + reclist[news_id]['article'] + "</p>" +
                                                           "</div>"
                                                           );
                                       detail_page.appendTo($this);
                                       });
    
}

function addSwapFunctionToDom(){
    //Swap function:
    
    $('div.ui-page').on("swipeleft", function () {
                        
                        $('.footer').show();
                        
                        var c_page =JSON.parse(sessionStorage.getItem("current_page"));
                        var total_pages =JSON.parse(sessionStorage.getItem("total_pages"));
                        if (c_page >=total_pages) return;
                        
                        
                        
                        console.log('left');
                        var nextpage = $(this).next('div[data-role="page"]');
                        console.log('nextpage is '+nextpage.length);
                        if (nextpage.length > 0) {
                        $.mobile.changePage(nextpage, {transition:"slide",
                                            reverse:false}, true, true);
                        
                        
                        c_page+=1;
                        sessionStorage.setItem("current_page",c_page);
                        console.log('c_page is'+c_page);
                        setPagination(c_page);
                        }
                        
                        
                        });
    $('div.ui-page').on("swiperight", function () {
                        
                        
                        
                        console.log('swipe right');
                        var c_page = sessionStorage.getItem("current_page");
                        if (c_page <=1 ) return;
                        
                        
                        var prevpage = $(this).prev('div[data-role="page"]');
                        if (prevpage.length > 0) {
                        $.mobile.changePage(prevpage, {transition:"slide",
                                            reverse:true}, true, true);
                        
                        c_page -=1;
                        sessionStorage.setItem("current_page",c_page);
                        setPagination(c_page);
                        
                        }
                        
                        
                        });
}

function  addListToSetting(){
    
    var cat_list = JSON.parse(sessionStorage.getItem('catlist'));
    var site_list = JSON.parse(sessionStorage.getItem('sitelist'));
    $cat = $(".cata_listview");
    $site= $(".site_listview");
    $.map(cat_list,function(k,v){
          $cat.append('<li><a href="#" name="'+v+'">'+k+'</a></li>');
          })
    
    $.map(site_list,function(k,v){
          $site.append('<li><a href="#" name="'+v+'">'+k+'</a></li>');
          })
};

function getCategoryList()
{
    var sitelist={},
    catlist={};
    var url = 'http://cnewsfinder.appspot.com/?listname';
    $.getJSON(url,function(data){
              $.each(data["website"],function(k,v){
                     console.log(k+':'+v);
                     sitelist[k]=v;
                     }),
              $.each(data["catagory"],function(k,v){
                     console.log(k+':'+v);
                     catlist[k]=v;
                     })
              
              
              }).then(
                      function(){
                      sessionStorage.setItem('sitelist', JSON.stringify(sitelist));
                      sessionStorage.setItem('catlist', JSON.stringify(catlist));
                      },
                      function(){
                      alert('Can not get site list,check network connection');
                      }
                      )
}

function addSettingToDom(){
    //click setting change category:
    $('.setting li').click(function () {
                           var cat = $(this).find('a').attr('name');
                           
                           //set current type and keyword:
                           sessionStorage.setItem('current_keyword', cat);
                           sessionStorage.setItem('current_type', 'cataname');
                           
                           var cat = sessionStorage.getItem('current_keyword');
                           console.log('cat='+cat);
                           getNewsBlocks('cataname', cat).then(
                                                               function () {
                                                               //when success , call DOM builder:
                                                               console.log('change cat done:' + cat);
                                                               //    $('body').children().empty();
                                                               //  var reclist = JSON.parse(sessionStorage.getItem('reclist'));
                                                               
                                                               $.mobile.pageContainer.empty();
                                                               //$.mobile.changePage('#page_1');
                                                               window.location = 'index.html';
                                                               
                                                               },
                                                               function(){
                                                               console.log('cat failed');
                                                               return;
                                                               }
                                                               );
                           
                           });
    
    //click setting change website:
    $('.setting2 li').click(function () {
                            var site = $(this).find('a').attr('name');
                            
                            //set current type and keyword:
                            sessionStorage.setItem('current_keyword', site);
                            sessionStorage.setItem('current_type', 'sitename');
                            
                            var site = sessionStorage.getItem('site');
                            console.log('site='+site);
                            getNewsBlocks('sitename', site).then(
                                                                 function () {
                                                                 //when success , call DOM builder:
                                                                 console.log('change site done:' + site);
                                                                 //    $('body').children().empty();
                                                                 //  var reclist = JSON.parse(sessionStorage.getItem('reclist'));
                                                                 
                                                                 $.mobile.pageContainer.empty();
                                                                 //$.mobile.changePage('#page_1');
                                                                 window.location = 'index.html';
                                                                 
                                                                 },
                                                                 function(){
                                                                 console.log('site failed');
                                                                 return;
                                                                 }
                                                                 );
                            
                            });
}



