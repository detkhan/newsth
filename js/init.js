// Init app
var $$ = Dom7;
var myApp = new Framework7({
    router: true,
//    dynamicPageUrl: 'content-{{index}}',
    // ... other parameters
});

// Init main view
// Initialize View
var mainView = myApp.addView('.view-main')

// Load about page:
mainView.router.load({pageName: 'index'});
var hosturl="www.nawacore.com";
var user_id;
