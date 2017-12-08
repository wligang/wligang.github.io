// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
	$$('.create-page').on('click', function () {
        createContentPage();
    });
});
myApp.onPageInit('form', function (page) {
//进入注册页之后执行下面的方法
	$$("#headimg").on("click",function(){
		$$('#headfile').click();
	})
	$$('#headfile').on("change",function(){
		var d=$("#headfile").readAsDataURL(handler,$("#pre_headimg"),$("#headimg"));
		$$(".headimg_64").val($("#headimg").attr("src"));
	})
	
	//提交表但之后
	$$('form.ajax-submit').on('submitted', function (e) {
		var xhr = e.detail.xhr; // actual XHR object
		var data = e.detail.data; // Ajax repsonse from action file
		// do something with response data
		
		
	});
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}