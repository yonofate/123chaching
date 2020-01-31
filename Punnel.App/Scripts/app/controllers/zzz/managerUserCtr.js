angular.module("punnelApp").controller("managerUserCtr", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.type = "xuat-file", f.get("/user", {}, function (c, d) {
        !d || 200 != d.code || "admin" != d.data.me.role && "aff" != d.data.me.role && "support" != d.data.me.role && "kinhdoanh" != d.data.me.role ? a.go("admin-login") : (PN_PAGE.setCookie("adminAccount", JSON.stringify(d.data.me), 1), b.roleAdmin = d.data.me.role)
    }), b.setActiveDrop = function (a) {
        b.typeDropdown = a
    }, b.loginUser = function () {
        f.post("/Statistical/ActivePassLogin", {}, function (a, b) {
            a ? PN_PAGE.messageLadi("Đã xảy ra lỗi, vui lòng thử lại!") : b && 200 == b.code ? PN_PAGE.messageLadi(b.data) : PN_PAGE.messageLadi(b.messager)
        })
    }, b.showGetInforByDomain = function () {
        $("#elGetInforByDomain").modal("show")
    }, b.domainSearch = "", b.getInforByDomain = function () {
        b.domainSearch && b.domainSearch.length > 0 ? f.post("/Statistical/CheckInfo", {
            domain: b.domainSearch
        }, function (a, b) {
            if (a) PN_PAGE.messageLadi("Đã xảy ra lỗi, vui lòng thử lại!");
            else if (b && 200 == b.code) {
                var c = new Date(b.data.expired),
                    d = new Date(b.data.dateActive),
                    e = "";
                e += "ID Ladipage:    " + b.data.id + "\n", e += "Họ và tên:      " + b.data.full_name + "\n", e += "Email:          " + b.data.email + "\n", e += "Số điện thoại:  " + b.data.phone + " \n", e += "Ngày kích hoạt: " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + "\n", e += "Ngày hết hạn:   " + c.getDate() + "/" + (c.getMonth() + 1) + "/" + c.getFullYear(), PN_PAGE.messageLadi(e)
            } else PN_PAGE.messageLadi(b.messager)
        }) : PN_PAGE.messageLadi("Vui lòng nhập domain để lấy thông tin!")
    }, b.namePage = "Admin Manager", b.setActive = function (c, d) {
        switch (d.stopPropagation(), b.type = c, c) {
            case "xuat-file":
                b.namePage = "Xuất file user", a.go("admin-manager.admin-file-user");
                break;
            case "active-partner":
                b.namePage = "Active Affilate", a.go("admin-manager.admin-active-partner");
                break;
            case "active-partner-old":
                b.namePage = "Active Partner", a.go("admin-manager.admin-active-old-partner");
                break;
            case "active-upgrade":
                b.namePage = "Nâng cấp tài khoản", a.go("admin-manager.admin-upgrade");
                break;
            case "change-email":
                b.namePage = "Đổi Email", a.go("admin-manager.admin-change-email");
                break;
            case "move-ladipage":
                b.namePage = "Di chuyển Ladi Page", a.go("admin-manager.admin-move-ladipage");
                break;
            case "khoiphuc":
                b.namePage = "Khôi phục Ladi Page", a.go("admin-manager.admin-khoiphuc");
                break;
            case "reportAff":
                b.namePage = "Báo cáo Affilate", a.go("admin-manager.admin-affilate-report");
                break;
            case "affInvoice":
                b.namePage = "Affilate Invoice", a.go("admin-manager.admin-affInvoice");
                break;
            case "updateaddpay":
                b.namePage = "Nâng cấp thông tin thanh toán Affilate", a.go("admin-manager.admin-updateAddPayAff");
                break;
            case "ladiFillter":
                b.namePage = "Ladi Finter", a.go("admin-manager.ladiFillter");
                break;
            case "deleteDomain":
                b.namePage = "Xóa domain", a.go("admin-manager.admin-deleteDomain")
        }
    }
}]);