angular.module("punnelApp").config(["$translateProvider", function (a) {
    a.translations("en", {
        TAB_EVENT: {
            HOVER: "Hover",
            CLICK: "Click",
            PROPERTIES: "Properties"
        },
        GUEST_FORM: {
            LOGIN_HEADER: "Login to your account",
            LOGIN_INTRO: "If you're an existing account please login below to continue:",
            LOGIN_FORM_USERNAME: "Email Address",
            LOGIN_FORM_PASSWORD: "Password",
            LOGIN_FORM_BUTTON: "Login",
            OTHER_LINK_LOGIN: "Exisiting member?",
            OTHER_LINK_FORGETPASSWORD: "Forgot your password?",
            OTHER_LINK_REGISTER: "►Register a free account",
            REGISTER_FORM_HEADER: "Register Your Account",
            REGISTER_FORM_INTRO: "Please register your login details below to access our Editor:",
            REGISTER_FORM_BUTTON: "Register Now",
            RECOVERY_FORM_HEADER: "Recovery Password",
            RECOVERY_FORM_INTRO: "Please provide the email address that you used when you signed up for your Punnel account. We will send you an email that will allow you to reset your password.",
            RECOVERY_FORM_BUTTON: "Send Password Reset",
            USER_NAME: "User Name",
            FULL_NAME: "Full Name",
            LABEL_FREE_FULL: "Free forever",
            LABEL_PHONE: "Số điện thoại",
            LABEL_BACK_LOGIN: "Back to Login page",
            REGISTER_FREE: "ĐĂNG KÝ MIỄN PHÍ"
        },
        GENERAL_DIALOG_FORM: {
            CLOSE: "Close",
            BACK: "Back",
            SEARCH: "Search...",
            PREVIEW: "Preview",
            SAVE: "Save",
            PUBLISH: "Publish",
            CANCEL: "Cancel",
            APPLY: "Apply",
            ON: "On",
            OFF: "Off",
            ADD: "Add",
            CHANGE: "Change",
            REMOVE: "Remove",
            DELETE: "Delete",
            SELECT_TEMPLATE_INTRO: "Please select template",
            ADVANCED: "Advanced",
            ADVANCED_SETTING: "Advanced setting",
            MANAGE_ITEMS: "Manage items",
            DONE: "Done",
            PLACOHLDER: "Search widget...",
            CONTINUE: "Continue",
            HIDE: "Ẩn",
            SHOW: "Hiện",
            CHOSE_CLICK: "Đã Chọn"
        },
        TOPBAR: {
            MENU: "Menu",
            MENU_PAGES: "Manage All pages",
            MENU_DELETED_PAGES: "All deleted pages",
            MENU_USER_DETAIL: "User detail",
            MENU_LOGOUT: "Logout",
            MENU_VIEW_MOBILE: "View on mobile",
            MENU_VIEW_PC: "View on computer",
            MENU_TOOL: "Tool",
            MAIN_PAGE: "Main page",
            CONVERSION_PAGE: "Conversion page",
            RENAME_PUNNEL: "Rename",
            REPORT: "Báo cáo",
            DOWNLOAD_REPORT: "Tải về báo cáo form"
        },
        TOOLS: {
            LAYERS: "Layers",
            PAGE_SETTING: "Page Setting"
        },
        DIALOG_SETTING: {
            SETTING: "Setting",
            CUSTOMIZE: "Customize",
            ANIMATION: "Animation",
            ITEMS_MANAGE: "Manage Items"
        },
        WIDGET: {
            BUTTON: "Button",
            IMAGE: "Image",
            SLIDESHOW: "Slideshow",
            BOX: "Box",
            HEADING: "Heading",
            PARAGRAPH: "Paragraph",
            HTML: "HTML",
            VIMEO: "VIMEO",
            YOUTUBE: "YOUTUBE",
            SHAPE: "Shape",
            CONTACT_FORM: "Contact Form",
            SECTION_WIDGET: "Section",
            CATEGORY_TEXT: "Text",
            CATEGORY_BOX: "Box",
            CATEGORY_IMAGE: "Image",
            CATEGORY_VIDEO: "Video",
            CATEGORY_ALL: "All widgets"
        },
        WIDGET_CUSTOMIZE: {
            TEXT_SETTING_HEADER: "Text Setting",
            FONT_FAMILY: "Font",
            FONT_SIZE: "Font size",
            TEXT_COLOR: "Text color",
            TEXT_ALIGN: "Text align",
            TEXT_ALIGN_LEFT: "Left",
            TEXT_ALIGN_CENTER: "Center",
            TEXT_ALIGN_RIGHT: "Right",
            TEXT_ALIGN_JUSTIFY: "Justify",
            TEXT_FORMAT_BOLD: "Bold",
            TEXT_FORMAT_ITALIC: "Italic",
            TEXT_FORMAT_UNDERLINE: "Underline",
            TEXT_FORMAT_DELETE: "Deleted",
            TEXT_FORMAT_LINK: "Add link",
            TEXT_FORMAT_UNLINK: "Remove link",
            TEXT_FORMAT_CHARACTER_SPACING: "Character spacing",
            TEXT_FORMAT_LINE_SPACING: "Line spacing",
            BACKGROUND_SETTING: "Background Setting",
            BACKGROUND_COLOR: "Background color",
            BACKGROUND_IMAGE: "Background Image",
            BACKGROUND_FORMAT_NORMAL: "Normal",
            BACKGROUND_FORMAT_TILE: "Tile",
            BACKGROUND_FORMAT_TILE_VERTICALLY: "Tile Vertically",
            BACKGROUND_FORMAT_TILE_HORIZONTALY: "Tile Horizontaly",
            BACKGROUND_FORMAT_STRETCH: "Strech",
            BACKGROUND_FORMAT_PARALLAX: "Parallax",
            BORDER_SETTING: "Border Setting",
            BORDER_RADIUS: "Border Radius",
            BORDER_RADIUS_TOP_LEFT: "Top left",
            BORDER_RADIUS_TOP_RIGHT: "Top right",
            BORDER_RADIUS_BOTTOM_LEFT: "Bottom left",
            BORDER_RADIUS_BOTTOM_RIGHT: "Bottom right",
            BORDER_STYLE: "Border style",
            BORDER_STYLE_SOLID: "Solid",
            BORDER_STYLE_DASHED: "Dashed",
            BORDER_STYLE_DOTTED: "Dotted",
            BORDER_COLOR: "Border color",
            BOX_SHADOW_SETTING: "Box Shadow Setting",
            BOX_SHADOW_COLOR: "Shadow Color",
            BOX_SHADOW_BLUE: "Shadow Blur",
            BOX_SHADOW_X: "Shadow X",
            BOX_SHADOW_Y: "Shadow Y",
            STANDARD_BOXES: "Standard boxes",
            CUSTOM_BOXES: "Custom boxes",
            SHOW_MORE: "Show more",
            CODE_HTML: "Code HTML",
            LINK_VIDEO_VIMEO: "Link Video Vimeo",
            LINK_VIDEO_YOUTUBE: "Link Video Youtube",
            LABEL_OVERLAY_TITLE: "Overlay color",
            LABEL_OVERLAY_VALUE: "Select color",
            LABEL_ADDRESS: "Location",
            LABEL_TRANSFORM: "Transform",
            ZOOM: "Phóng to",
            SETTING_HOVER: "Thiết lập khi hover"
        },
        WIDGET_ANIMATION: {
            ANIMATION: "Animation",
            ANIMATION_SETTING: "Animation Setting"
        },
        WIDGET_BUTTON: {
            BUTTON_HEADER: "Button Setting"
        },
        WIDGET_IMAGE: {
            IMAGE_URL: "Image URL"
        },
        WIDGET_SLIDESHOW: {
            SLIDESHOW_SETTING: "Slideshow Setting",
            DURATION: "Duration",
            AUTOPLAY: "Autoplay",
            PAUSE_IN_ACTION: "Pause in action",
            PAUSE_IN_HOVER: "Pause in hover",
            LABEL_SHOW_NAVIGATION: "Show navigation",
            LABEL_SHOW_THUMBNAIL: "Show thumbnail",
            LABEL_DISPLAY_BORDER: "Display border",
            LABEL_DISPLAY_LR_ICON: "Display left/right icons",
            LABEL_DISPLAY_NAVIGATION_ICON: "Display navigation icon",
            LABEL_DISPLAY_CAPTION: "Display image caption",
            LABEL_SHOW_HIDE_ELEMENT: "Show/Hide element",
            LABEL_ACTION: "Slideshow Action",
            LABEL_NAVIGATION_COLOR: "Navigation color",
            LABEL_NUM_ROW: "Number Row",
            LABEL_NUM_COL: "Number Column"
        },
        LANDING_PAGE_MANAGEMENT: {
            LPM_HEADER: "Landing Page Management",
            LPM_BUTTON_NEWPAGE: "New Page",
            LPM_BUTTON_DUPLICATE: "Duplicate"
        },
        GALLERY_MANAGEMENT: {
            ITEM_TITLE: "Title",
            ITEM_DESCRIPTION: "Description",
            ITEM_ACTION: "Redirect to page or URL"
        },
        NEW_LANGUAGE: {
            NEW_WORK: "New work",
            SELECT_TEMPLATE: "Select Template",
            ALL_PAGE_DELETE: "All Pages Deleted",
            BACK_TO_EDITOR: "Back to Editor"
        },
        PAGE_SETTING: {
            PAGE_INFORMATION: "Page Information",
            INTRO_PAGE_INFORMATION: "You can enter a short description about your page.",
            PAGE_TITLE: "Page Title",
            PAGE_DESCRIPTION: "Page Description",
            PAGE_KEYWORD: "Page Keywords",
            LABEL_INTRODUCTION: "Introduction your page in a few words...",
            LABEL_KEYWORDS: "Keywords for your page."
        },
        TOOL_TIP: {
            GROUP_VIDEO: "Video"
        },
        OTHER: {
            CHANGE_SECTION: "Change Section background",
            BORDER_POSTION: "Border width",
            OPACITY: "Opacity",
            COLOR_SETTING: "Color Setting",
            INTRO_CUSTOM_COLOR: "Your custom color",
            FONT_SETTING: "Font Setting",
            TITLE_MANAGE_ITEM_FORM: "Manage items form",
            ADD_NEW_ITEMS_FORM: "Add new item",
            LABEL_COLOR_OPACITY: "Color Opacity"
        },
        lINK_MANAGE: {
            TITLE_LINK_MANAGER: "Link Management",
            INTRO_LINK_TO_PAGE: "Link to page section",
            INTRO_LINK_TO_WEB: "Link to another web address",
            LABEL_ENTER_WEB_ADDRESS: "Enter a web address",
            LABEL_CURRENT_WINDOW: "Current window",
            LABEL_NEW_WINDOW: "New window",
            TITLE_CLICK_HIDE_SHOW: "Ẩn hiện element",
            TITLE_HOVER: "Hiệu ứng khi dê chuột vào"
        },
        CUSTOM_MENU: {
            TITLE_CUSTOM_MENU: "Navigation setting",
            HEADER_ITEM_SETTING: "Items Setting",
            LABEL_TEXT_SIZE: "Text Size",
            LABEL_HOVER_SETTING: "Hover setting",
            LABEL_HOVER_TEXT_COLOR: "Text Color Hover",
            LABEL_HOVER_BACKGROUND_COLOR: "Background Color hover",
            LABEL_ITEM_MENU: "Setting Items Menu",
            LABEL_MARGIN_ITEM: "Margin Item Menu",
            LABEL_HOVER_BORDER: "Border Color hover",
            MOBILE_SETTING: "Tùy chọn item mobile",
            ICON_MOBILE_SETTING: "Tùy chọn icon mobile"
        },
        CUSTOM_REDIRECT_FORM: {
            TITLE_SETTING_REDIRECT_FORM: "Form Redirect",
            LABEL_DESTINATION: "Destination",
            LABEL_SAVE_TO_PC: "Save to PC",
            LABEL_SEND_TO_POST: "Send to POST",
            LABEL_THANKS_MESSAGE: "Thank you message",
            LABEL_TITLE_ACTION_SUBMIT: "Action sau khi submit form",
            LABEL_USING_PAGE_CONVERSION: "Sử dụng trang conversion",
            LABEL_USUNG_PAGE_OTHER: "Trang khác"
        },
        CUSTOM_FORM_SETTING: {
            TITLE_SETTING: "Form Setting",
            LABEL_STYLE_LABEL: "Label Style",
            LABEL_POSTION_LABEL: "Label Position",
            LABEL_POSTION_TOP: "Top",
            LABEL_POSTION_LEFT: "Left",
            LABEL_POSTION_HIDE: "Hide",
            LABEL_FORMAT_LABEL: "Label Format",
            LABEL_STYLE_INPUT: "Input Style",
            LABEL_COLOR_INPUT: "Input Text Color",
            LABEL_COLOR_BACKGROUND_INPUT: "Input Background Color",
            LABEL_COLOR_BORDER_INPUT: "Input Border Color",
            LABEL_DISTANCE_ITEM_FORM: "Distance Items",
            LABEL_MARGIN_ITEM_FORM: "Margin bottom items",
            LABEL_WIDTH_LABEL: "Width Label",
            LABEL_HEIGHT_INPUT: "Height input"
        },
        CUSTOM_SINGER_FORM: {
            TITLE_SETTING: "Field Setting",
            LABEL_CHANGE_TYPE: "Change type",
            LABEL_TYPE: "Type",
            LABEL_VALUE_IS_LABEL: "Label",
            LABEL_PLACEHOLDER: "Placeholder",
            LABEL_REQUIRED_FIELD: "Required field",
            LABEL_NAME_ATTRIBUTE: "Name attribute"
        },
        CUSTOM_TEXT: {
            TITLE_SETTING: "Text Settings"
        },
        CUSTOM_NOTICE: {
            TT_NOTICE: "NOTICE:"
        },
        CUSTOM_FILE_MANAGE: {
            TITLE_SETTING: "File Manager",
            LABEL_UPLOAD: "Upload"
        },
        CUSTOM_GALLERY_MANAGE: {
            TITLE_SETTING: "Gallery Manager",
            PLACEHLDER_LINK_NAME: "# or url action..."
        },
        CUSTOM_ITEM_MENU_SETTING: {
            TITLE_SETTING: " Item Setting"
        },
        MORE_SHAPE_SETTING: {
            TITLE_SETTING: "Select Shape",
            LABEL_CATEGORIES: "Categories",
            LABEL_ALL_ITEM: "All items",
            INTRO_SELECT_SHAPE: "Select shape to your page!"
        },
        CUSTOM_USER_DETAIL: {
            TITLE_SETTING: "User Account Setting",
            LABEL_INFORMATION: "Information",
            LABEL_CHANGE_PASS: "Change password",
            LABEL_OLD_PASS: "Old Password*",
            LABEL_NEW_PASS: "New Password*",
            LABEL_CONFIRM_PASS: "Confirm Password*"
        },
        MANAGE_NEW_PUNNEL: {
            INTRO: "Select one of the following actions to start!",
            LABEL_MANAGE_PUNNEL: "Manage Landing Page",
            LABEL_NEW_TEMPLATE: "New Template",
            LABEL_NEW_SECTION: "New Section"
        },
        CUSTOM_NEW_PUNNEL: {
            INTRO: "Please fill in your page title!",
            PLACOHLDER: "Page Title...",
            SELECT_DEFAULT: "--Please select categrory--"
        },
        CUSTOM_PUBLISH_PUNNEL: {
            INTRO: "How do you want publish your website?",
            LABEL_VIEW_ONLINE: "View online",
            LABEL_DOWNLOAD: "Download",
            LABEL_UPDATE_DOMAIN: "Update domain",
            LABEL_UPDATE_SUB_DOMAIN: "Update sub domain",
            LABEL_CLOSE_PUBLISH: "Continue editing your page",
            LABEL_UPDATE_UPGRADE: "Nâng cấp gói"
        },
        RESTORE_PUNNEL: {
            INTRO: "Management Landingpage Deleted",
            LABEL_RESTORE: "Restore"
        },
        CUSTOM_SUBDOMAIN: {
            TITLE_SETTING: "Update Subdomain",
            INTRO: "Please fill sub domain!",
            PLACOHLDER: "Domain..."
        },
        CUSTOM_DOMAIN: {
            TITLE_SETTING: "Update Domain"
        },
        CUSTOM_SECTION_WIDGET: {
            TITLE_SETTING: "Select Template Section",
            INTRO: "Select template section to start your page!",
            LABEL_BLANK: "Blank"
        },
        CUSTOM_TEMPLATE_MANAGE: {
            INTRO: " Select template to start your page!"
        },
        CUSTOM_ADD_URL_POST_FORM: {
            TITLE: "Link POST xử lý form",
            INTRO: "Nhập vào Link POST xử lý form",
            URL: "URL POST xử lý"
        }
    }),
    a.translations("vi", {
        TAB_EVENT: {
            HOVER: "Hover",
            CLICK: "Click",
            PROPERTIES: "Properties"
        },
        GUEST_FORM: {
            LOGIN_HEADER: "Đăng nhập vào tài khoản",
            LOGIN_INTRO: "Nếu bạn đã tạo tài khoản, vui lòng đăng nhập để tiếp tục:",
            LOGIN_FORM_USERNAME: "Địa chỉ Email",
            LOGIN_FORM_PASSWORD: "Mật khẩu",
            LOGIN_FORM_BUTTON: "Đăng nhập",
            OTHER_LINK_LOGIN: "Đã có tài khoản?",
            OTHER_LINK_FORGETPASSWORD: "Bạn quên mật khẩu?",
            OTHER_LINK_REGISTER: "► ĐĂNG KÝ NGAY",
            REGISTER_FORM_HEADER: "Đăng ký tài khoản",
            REGISTER_FORM_INTRO: "Vui lòng nhập đầy đủ thông tin bên dưới <br> để chúng tôi đồng hành cùng bạn!",
            REGISTER_FORM_BUTTON: "Đăng ký ngay",
            RECOVERY_FORM_HEADER: "Lấy lại mật khẩu",
            RECOVERY_FORM_INTRO: 'Vui lòng nhập email đăng ký của bạn ở dưới!<br> "Mật khẩu mới" sẽ được gửi tới email của bạn!',
            RECOVERY_FORM_BUTTON: "Gửi xác nhận mật khẩu",
            USER_NAME: "Tên tài khoản",
            FULL_NAME: "Họ và tên",
            LABEL_FREE_FULL: "Miễn phí trọn đời",
            LABEL_PHONE: "Số điện thoại",
            LABEL_BACK_LOGIN: "Quay lại trang Đăng nhập",
            REGISTER_FREE: "ĐĂNG KÝ MIỄN PHÍ"
        },
        GENERAL_DIALOG_FORM: {
            CLOSE: "Đóng",
            BACK: "Quay lại",
            SEARCH: "Tìm kiếm...",
            PREVIEW: "Xem thử",
            SAVE: "Lưu",
            PUBLISH: "Công bố",
            CANCEL: "Hủy",
            APPLY: "Áp dụng",
            ON: "Bật",
            OFF: "Tắt",
            ADD: "Thêm",
            CHANGE: "Thay đổi",
            REMOVE: "Gỡ bỏ",
            DELETE: "Xóa",
            SELECT_TEMPLATE_INTRO: "Vui lòng chọn giao diện",
            ADVANCED: "Nâng cao",
            ADVANCED_SETTING: "Thiết lập nâng cao",
            MANAGE_ITEMS: "Danh sách",
            DONE: "Hoàn tất",
            PLACOHLDER: "Nhập tên ứng dụng...",
            CONTINUE: "Tiếp tục",
            HIDE: "Ẩn",
            SHOW: "Hiện",
            CHOSE_CLICK: "Đã Chọn"
        },
        TOPBAR: {
            MENU: "Menu",
            MENU_PAGES: "Quản lý trang",
            MENU_DELETED_PAGES: "Trang đã xóa",
            MENU_USER_DETAIL: "Thông tin cá nhân",
            MENU_LOGOUT: "Thoát",
            MENU_VIEW_MOBILE: "Xem trên mobile",
            MENU_VIEW_PC: "Xem trên máy tính",
            MENU_TOOL: "Công cụ",
            MAIN_PAGE: "Trang chính",
            CONVERSION_PAGE: "Trang chuyển đổi",
            RENAME_PUNNEL: "Đổi tên",
            REPORT: "Báo cáo",
            DOWNLOAD_REPORT: "Tải về báo cáo form"
        },
        TOOLS: {
            LAYERS: "Lớp",
            PAGE_SETTING: "Cài đặt trang"
        },
        DIALOG_SETTING: {
            SETTING: "Setting",
            CUSTOMIZE: "Tùy biến",
            ANIMATION: "Hiệu ứng",
            ITEMS_MANAGE: "Danh sách"
        },
        WIDGET: {
            BUTTON: "Nút",
            IMAGE: "Hình ảnh",
            SLIDESHOW: "Trình diễn",
            BOX: "Hình",
            HEADING: "Tiêu đề",
            PARAGRAPH: "Đoạn chữ",
            HTML: "HTML",
            VIMEO: "VIMEO",
            YOUTUBE: "YOUTUBE",
            SHAPE: "Hình vẽ",
            CONTACT_FORM: "Form liên hệ",
            SECTION_WIDGET: "Section",
            CATEGORY_TEXT: "Chữ",
            CATEGORY_BOX: "Hình",
            CATEGORY_IMAGE: "Ảnh",
            CATEGORY_VIDEO: "Video",
            CATEGORY_ALL: "Tất cả"
        },
        WIDGET_CUSTOMIZE: {
            TEXT_SETTING_HEADER: "Thiết lập chữ",
            FONT_FAMILY: "Kiểu font",
            FONT_SIZE: "Cỡ chữ",
            TEXT_COLOR: "Màu sắc font",
            TEXT_ALIGN: "Căn chỉnh hàng",
            TEXT_ALIGN_LEFT: "Trái",
            TEXT_ALIGN_CENTER: "Giữa",
            TEXT_ALIGN_RIGHT: "Phải",
            TEXT_ALIGN_JUSTIFY: "Cân 2 bên",
            TEXT_FORMAT_BOLD: "Đậm",
            TEXT_FORMAT_ITALIC: "Nghiêng",
            TEXT_FORMAT_UNDERLINE: "Gạch dưới",
            TEXT_FORMAT_DELETE: "Gạch ngang",
            TEXT_FORMAT_LINK: "Thêm liên kết",
            TEXT_FORMAT_UNLINK: "Bỏ liên kết",
            TEXT_FORMAT_CHARACTER_SPACING: "Khoảng cách/chữ",
            TEXT_FORMAT_LINE_SPACING: "Khoảng cách/dòng",
            BACKGROUND_SETTING: "Thiết lập nền",
            BACKGROUND_COLOR: "Màu nền",
            BACKGROUND_IMAGE: "Ảnh nền",
            BACKGROUND_FORMAT_NORMAL: "Mặc định",
            BACKGROUND_FORMAT_TILE: "Lặp lại đều",
            BACKGROUND_FORMAT_TILE_VERTICALLY: "Lặp chiều dọc",
            BACKGROUND_FORMAT_TILE_HORIZONTALY: "Lặp chiều ngang",
            BACKGROUND_FORMAT_STRETCH: "Vừa khung",
            BACKGROUND_FORMAT_PARALLAX: "Giữ vị trí",
            BORDER_SETTING: "Thiết lập viền",
            BORDER_RADIUS: "Bo góc",
            BORDER_RADIUS_TOP_LEFT: "Trên góc trái",
            BORDER_RADIUS_TOP_RIGHT: "Trên góc phải",
            BORDER_RADIUS_BOTTOM_LEFT: "Dưới góc trái",
            BORDER_RADIUS_BOTTOM_RIGHT: "Dưới góc phải",
            BORDER_STYLE: "Kiểu viền",
            BORDER_STYLE_SOLID: "Nét liền",
            BORDER_STYLE_DASHED: "Nét gạch đứt",
            BORDER_STYLE_DOTTED: "Nét chấm",
            BORDER_COLOR: "Màu viền",
            BOX_SHADOW_SETTING: "Thiết lập đổ bóng",
            BOX_SHADOW_COLOR: "Màu bóng",
            BOX_SHADOW_BLUE: "Độ mờ",
            BOX_SHADOW_X: "Chiều ngang",
            BOX_SHADOW_Y: "Chiều dọc",
            STANDARD_BOXES: "Hình hộp cơ bản",
            CUSTOM_BOXES: "Hình hộp kiểu riêng",
            SHOW_MORE: "Xem thêm",
            CODE_HTML: "Mã HTML",
            LINK_VIDEO_VIMEO: "Link của video Vimeo",
            LINK_VIDEO_YOUTUBE: "Link của video Youtube",
            LABEL_OVERLAY_TITLE: "Overlay color",
            LABEL_OVERLAY_VALUE: "Chọn màu",
            LABEL_ADDRESS: "Vị Trí",
            LABEL_TRANSFORM: "Transform",
            ZOOM: "Phóng to",
            SETTING_HOVER: "Thiết lập khi hover"
        },
        WIDGET_ANIMATION: {
            ANIMATION: "Hiệu ứng",
            ANIMATION_SETTING: "Thiết lập hiệu ứng động"
        },
        WIDGET_BUTTON: {
            BUTTON_HEADER: "Tùy chọn cho nút"
        },
        WIDGET_IMAGE: {
            IMAGE_URL: "Địa chỉ file ảnh"
        },
        WIDGET_SLIDESHOW: {
            SLIDESHOW_SETTING: "Tùy chọn trình diễn",
            DURATION: "Thời gian hiển thị",
            AUTOPLAY: "Tự động chạy",
            PAUSE_IN_ACTION: "Tạm dừng khi click",
            PAUSE_IN_HOVER: "Tạm dừng khi rê chuột",
            LABEL_SHOW_NAVIGATION: "Hiển thị danh sách ảnh",
            LABEL_SHOW_THUMBNAIL: "Hiển thị ảnh đại diện nhỏ",
            LABEL_DISPLAY_BORDER: "Hiển thị viền",
            LABEL_DISPLAY_LR_ICON: "Hiển thị nút trái/phải",
            LABEL_DISPLAY_NAVIGATION_ICON: "Hiển thị danh sách ảnh",
            LABEL_DISPLAY_CAPTION: "Hiển thị tiêu đề mỗi file ảnh",
            LABEL_SHOW_HIDE_ELEMENT: "Hiện/Ẩn element",
            LABEL_ACTION: "Thao tác slide show",
            LABEL_NAVIGATION_COLOR: "Màu nút chuyển slide",
            LABEL_NUM_ROW: "Số Hàng",
            LABEL_NUM_COL: "Số Cột"
        },
        LANDING_PAGE_MANAGEMENT: {
            LPM_HEADER: "Quản lý danh sách trang",
            LPM_BUTTON_NEWPAGE: "Tạo mới",
            LPM_BUTTON_DUPLICATE: "Nhân bản"
        },
        GALLERY_MANAGEMENT: {
            ITEM_TITLE: "Tiêu đề",
            ITEM_DESCRIPTION: "Mô tả",
            ITEM_ACTION: "Liên kết tới trang hoặc site khác"
        },
        NEW_LANGUAGE: {
            NEW_WORK: "Tạo mới",
            SELECT_TEMPLATE: "Chọn giao diện",
            ALL_PAGE_DELETE: "Trang đã xóa",
            BACK_TO_EDITOR: "Trở lại trình Chỉnh sửa"
        },
        PAGE_SETTING: {
            PAGE_INFORMATION: "Thông tin trang",
            INTRO_PAGE_INFORMATION: "Bạn có thể cập nhật các thông tin cơ bản về trang tại đây.",
            PAGE_TITLE: "Tiêu đề trang",
            PAGE_DESCRIPTION: "Mô tả về trang",
            PAGE_KEYWORD: "Từ khóa của trang",
            LABEL_INTRODUCTION: "Giới thiệu về trang ngắn gọn",
            LABEL_KEYWORDS: "Từ khóa cho trang"
        },
        TOOL_TIP: {
            GROUP_VIDEO: "Video"
        },
        OTHER: {
            CHANGE_SECTION: "Thay đổi nền của Section",
            BORDER_POSTION: "Độ rộng viền",
            OPACITY: "Độ trong suốt",
            COLOR_SETTING: "Thiết lập màu sắc",
            INTRO_CUSTOM_COLOR: "Màu riêng của bạn",
            FONT_SETTING: "Thiết lập font chữ",
            TITLE_MANAGE_ITEM_FORM: "Quản lý danh sách từ",
            ADD_NEW_ITEMS_FORM: "Thêm mới",
            LABEL_COLOR_OPACITY: "Độ trong suốt màu"
        },
        lINK_MANAGE: {
            TITLE_LINK_MANAGER: "Quản lý liên kết",
            INTRO_LINK_TO_PAGE: "Liên kết tới phần của trang",
            INTRO_LINK_TO_WEB: "Liên kết tới địa chỉ khác",
            LABEL_ENTER_WEB_ADDRESS: "Nhập địa chỉ",
            LABEL_CURRENT_WINDOW: "Mở ở cửa sổ hiện tại",
            LABEL_NEW_WINDOW: "Mở ở cửa sổ mới",
            TITLE_CLICK_HIDE_SHOW: "Ẩn hiện element",
            TITLE_HOVER: "Hiệu ứng khi dê chuột vào"
        },
        CUSTOM_MENU: {
            TITLE_CUSTOM_MENU: "Thiết lập menu chính",
            HEADER_ITEM_SETTING: "Danh sách",
            LABEL_TEXT_SIZE: "Cỡ chữ",
            LABEL_HOVER_SETTING: "Tùy chọn khi rê chuột",
            LABEL_HOVER_TEXT_COLOR: "Màu chữ",
            LABEL_HOVER_BACKGROUND_COLOR: "Màu nền",
            LABEL_ITEM_MENU: "Thiết lập các mục Menu",
            LABEL_MARGIN_ITEM: "Khoảng cách các mục",
            LABEL_HOVER_BORDER: "Màu viền",
            MOBILE_SETTING: "Tùy chọn item mobile",
            ICON_MOBILE_SETTING: "Tùy chọn icon mobile"
        },
        CUSTOM_REDIRECT_FORM: {
            TITLE_SETTING_REDIRECT_FORM: "Chuyển tiếp",
            LABEL_DESTINATION: "Điểm đến",
            LABEL_SAVE_TO_PC: "Lưu về máy",
            LABEL_SEND_TO_POST: "Gửi lệnh POST",
            LABEL_THANKS_MESSAGE: "Nội dung cảm ơn",
            LABEL_TITLE_ACTION_SUBMIT: "Action sau khi submit form",
            LABEL_USING_PAGE_CONVERSION: "Sử dụng trang conversion",
            LABEL_USUNG_PAGE_OTHER: "Trang khác"
        },
        CUSTOM_FORM_SETTING: {
            TITLE_SETTING: "Thiết lập form",
            LABEL_STYLE_LABEL: "Kiểu dáng form",
            LABEL_POSTION_LABEL: "Vị trí nhãn",
            LABEL_POSTION_TOP: "Trên",
            LABEL_POSTION_LEFT: "Trái",
            LABEL_POSTION_HIDE: "Ẩn",
            LABEL_FORMAT_LABEL: "Định dạng nhãn",
            LABEL_STYLE_INPUT: "Kiểu dáng mục nhập",
            LABEL_COLOR_INPUT: "Màu chữ",
            LABEL_COLOR_BACKGROUND_INPUT: "Màu nền",
            LABEL_COLOR_BORDER_INPUT: "Màu viền",
            LABEL_DISTANCE_ITEM_FORM: "Khoảng cách",
            LABEL_MARGIN_ITEM_FORM: "Giãn vị trí",
            LABEL_WIDTH_LABEL: "Chiều dài nhãn",
            LABEL_HEIGHT_INPUT: "Chiều cao input"
        },
        CUSTOM_SINGER_FORM: {
            TITLE_SETTING: "Thiết lập mục nhập",
            LABEL_CHANGE_TYPE: "Thay đổi định dạng",
            LABEL_TYPE: "Loại",
            LABEL_VALUE_IS_LABEL: "Nhãn",
            LABEL_PLACEHOLDER: "Nhãn gợi nhắc",
            LABEL_REQUIRED_FIELD: "Bắt buộc nhập",
            LABEL_NAME_ATTRIBUTE: "Tên của nhãn"
        },
        CUSTOM_TEXT: {
            TITLE_SETTING: "Thiết lập chữ"
        },
        CUSTOM_NOTICE: {
            TT_NOTICE: "CHÚ Ý:"
        },
        CUSTOM_FILE_MANAGE: {
            TITLE_SETTING: "Quản lý file",
            LABEL_UPLOAD: "Tải lên"
        },
        CUSTOM_GALLERY_MANAGE: {
            TITLE_SETTING: "Thư viện ảnh",
            PLACEHLDER_LINK_NAME: "Nhập # hoặc địa chỉ trang web"
        },
        CUSTOM_ITEM_MENU_SETTING: {
            TITLE_SETTING: " Thiết lập item"
        },
        MORE_SHAPE_SETTING: {
            TITLE_SETTING: "Lựa chọn hình vẽ",
            LABEL_CATEGORIES: "Phân loại",
            LABEL_ALL_ITEM: "Tất cả",
            INTRO_SELECT_SHAPE: "Hãy lựa chọn hình vẽ"
        },
        CUSTOM_USER_DETAIL: {
            TITLE_SETTING: "Thiết lập tài khoản",
            LABEL_INFORMATION: "Thông tin cá nhân",
            LABEL_CHANGE_PASS: "Đổi mật khẩu (tùy chọn)",
            LABEL_OLD_PASS: "Mật khẩu cũ*",
            LABEL_NEW_PASS: "Mật khẩu mới*",
            LABEL_CONFIRM_PASS: "Xác nhận mật khẩu*"
        },
        MANAGE_NEW_PUNNEL: {
            INTRO: "Lựa chọn thao tác để bắt đầu!",
            LABEL_MANAGE_PUNNEL: "Quản lý trang",
            LABEL_NEW_TEMPLATE: "Giao diện mới",
            LABEL_NEW_SECTION: "Section mới"
        },
        CUSTOM_NEW_PUNNEL: {
            INTRO: "Tiếp theo, hãy nhập tiêu đề",
            PLACOHLDER: "Tên Trang",
            SELECT_DEFAULT: "--Chọn chuyên mục--"
        },
        CUSTOM_PUBLISH_PUNNEL: {
            INTRO: "Bạn muốn công bố website theo cách nào?",
            LABEL_VIEW_ONLINE: "Xem online",
            LABEL_DOWNLOAD: "Tải về máy",
            LABEL_UPDATE_DOMAIN: "Cập nhật tên miền",
            LABEL_UPDATE_SUB_DOMAIN: "Cập nhật tên miền phụ",
            LABEL_CLOSE_PUBLISH: "Trở lại chỉnh sửa page",
            LABEL_UPDATE_UPGRADE: "Nâng cấp gói"
        },
        RESTORE_PUNNEL: {
            INTRO: "Quản lý các trang đã xóa",
            LABEL_RESTORE: "Kích hoạt lại"
        },
        CUSTOM_SUBDOMAIN: {
            TITLE_SETTING: "Sử dụng tên miền phụ",
            INTRO: "Hãy nhập tên miền bạn muốn sử dụng",
            PLACOHLDER: "Tên miền..."
        },
        CUSTOM_DOMAIN: {
            TITLE_SETTING: "Sử dụng tên miền"
        },
        CUSTOM_SECTION_WIDGET: {
            TITLE_SETTING: "Lựa chọn section",
            INTRO: "Lựa chọn section bạn muốn sử dụng",
            LABEL_BLANK: "Trống"
        },
        CUSTOM_TEMPLATE_MANAGE: {
            INTRO: " Lựa chọn giao diện để sử dụng!"
        },
        CUSTOM_ADD_URL_POST_FORM: {
            TITLE: "Link POST xử lý form",
            INTRO: "Nhập vào Link POST xử lý form",
            URL: "URL POST xử lý"
        }
    }), a.preferredLanguage("en"), a.useSanitizeValueStrategy("escaped")
}]);