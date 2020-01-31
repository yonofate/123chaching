var bank = [{
    name: "",
    code: ""
}],
white = "#ffffff";
var testResize = "false",
    checkClick = 1,
    htmlGroup;
htmlGroup = '<div class="widget-element widget-snap widget-group widget-dragg" pn-type="group-tmp" id="GROUP_TMP" pn-lang="GROUP"><div class="widget-content" pn-type="content-group"></div></div>';
var TOP_FRAME = 40,
    LEFT_FRAME = 0,
    URL_IMAGE = "https://hstatic.punnel.com/img/",
    uid = 0,
    ladi = 0,
    scriptFB = '<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.5";fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>',
    lp_domain = [],
    itemTracking = [{
        name: "Facebook AddToCart",
        value: "fbq('track', 'AddToCart');"
    }, {
        name: "Facebook Purchase",
        value: "fbq('track', 'Purchase');"
    }, {
        name: "Facebook CompleteRegistration",
        value: "fbq('track', 'CompleteRegistration');"
    }, {
        name: "Facebook Lead",
        value: "fbq('track', 'Lead');"
    }, {
        name: "Google Analytics sự kiện",
        value: "ga('send', 'event', {\n eventCategory: 'General',\n eventAction: 'click',\n eventLabel: 'Lead',\n eventValue: 10});"
        }
    ],
    typeColor = "",
    typeImage = "",
    clickIframe = !1,
    ratio = "",
    dummyData = DummyData,
    selectedItem = null,
    keyDownSl = null,
    groupElement = [],
    parentGroup = null,
    keyDownCtrl = !1,
    keyDownCtrlG = !1,
    dbClickBox = !1,
    deviceEdit = "desktop",
    addMenu = !1,
    snapValue = new Array,
    preview = !1,
    apiElement = dummyData.apiElement,
    section = {},
    pageSelect = "main",
    vitriUndo = 0,
    pageMouseX, pageMouseY, pageSave = !0,
    tranlateTT, mouseIsMove = !1,
    changePage = [],
    listImage = [],
    StartListImage = [],
    typeLadingpage = "0",
    typeTemplate = "10",
    typeSection = "20",
    typeAddNew = 0,
    roleUser = 0,
    wgSectionItem = [],
    colorUsing = "#ffffff",
    itemFieldFormUsing = [],
    altdown = !1,
    shiftdown = !1,
    postionSelectionText = 0,
    numMouseMove = 0,
    elementFullScreen = void 0,
    htmlMainPage = "",
    arrIdOnScreen = [],
    topScroll = 0,
    interval, arrIdPopup = [],
    arrSnapElementFull, typeselecteShape, setTimeOnBuilder, ctrlZElement = {
        mobile: {
            main: [],
            popup: []
        },
        desktop: {
            main: [],
            popup: []
        }
    },


    googleScope = "https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly",
    clientIdGoogle = "570474941256-c9o2691vc23qbga72oaudm4nq39jvpld.apps.googleusercontent.com",
    ApiPath = "/api",
    ApiStatic = "https://hstatic.punnel.com/img/",
    ApiBase = "/",
    ApiThemes = "http://themes.punnel.vn",
    ApiDemo = "https://punnel.co/",
    SiteDomain="punnel.com",
    DomainDemo = "punnel.co",
    ApiStaticM = "https://hstatic.punnel.com/m/",
    ApiStaticT = "https://hstatic.punnel.com/t/",
    ApiStaticD = "https://hstatic.punnel.com/d/",
    apiStaticDefault = "https://hstatic.punnel.com/img/",
    formatDate = "dd/MM/yyyy",
    formatDateTime = "dd/MM/yyyy HH:mm:ss",
    FB_APP_ID = "986046761559978",
    ZALO_ME_ID = "3605366824087211623";