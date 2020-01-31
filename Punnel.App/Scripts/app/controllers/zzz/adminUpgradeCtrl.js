angular.module("punnelApp").controller("adminUpgradeCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    console.log(1), b.email = "", b.moths = 1, b.monthplus = 0, b.type = "1", b.codeAff = "", b.paid = "0", b.paidSys = "0", b.admincreateUpgrade = function () {
        $(".parLoading").show(), console.log(1), f.post("/Statistical/upgrade", {
            email: b.email,
            months: parseFloat(b.moths),
            monthplus: parseFloat(b.monthplus),
            type: parseFloat(b.type),
            ref: b.codeAff,
            paid: parseFloat(b.paid),
            usedmoney: parseFloat(b.paidSys)
        }, function (a, b) {
            $(".parLoading").hide(), a ? PN_PAGE.messageLadi("Đã xảy ra lỗi. Vui lòng thử lại") : b && 200 == b.code ? PN_PAGE.messageLadi("Nâng cấp thành công") : PN_PAGE.messageLadi(b.messager)
        })
    }, b.checkUserNhan = function () {
        $(".parLoading").show(), b.email && b.email.length > 0 ? f.post("/Statistical/checkEmail", {
            email: b.email
        }, function (a, c) {
            if ($(".parLoading").hide(), c && 200 == c.code) {
                if (c.data) {
                    var d = "",
                        e = "Gói miễn phí";
                    switch (c.data.type) {
                        case 1:
                            e = "Gói nâng cao";
                            break;
                        case 2:
                            e = "Gói nâng cao";
                            break;
                        case 3:
                            e = "Gói nâng cao"
                    }
                    if (d += "Họ tên: " + c.data.full_name + "\n", d += "Email: " + c.data.email + "\n", c.data.dateTrial && c.data.dateTrial.length > 0 && (d += "Dùng thử: " + c.data.dateTrial + " ngày\n"), c.data.dateActive && c.data.dateActive.length > 0 && (d += "Ngày kích hoạt: " + c.data.dateActive + " ngày\n"), c.data.expired && c.data.expired.length > 0) {
                        var f = new Date(c.data.expired),
                            g = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
                        d += "Ngày hết hạn: " + g + "\n"
                    }
                    c.data.code && c.data.code.length > 0 && (b.ref = c.data.code, d += "Mã giới thiệu: " + c.data.code + "\n"), c.data.uRef && (d += "Số người giới thiệu được: " + c.data.uRef.TotalReferral + "\n", d += "Số người giới thiệu Active: " + c.data.uRef.TotalActivated + "\n", d += "Số tiền đã sử dụng: " + c.data.uRef.UsedMoney + "\n", d += "Tổng tiền khả dụng: " + (c.data.uRef.TotalMoney - c.data.uRef.UsedMoney) + "\n"), d += e, d && d.length > 0 ? PN_PAGE.messageLadi(d) : PN_PAGE.messageLadi("Không có người dùng phù hợp! Vui lòng kiểm tra lại!")
                }
            } else c ? PN_PAGE.messageLadi(c.messager) : PN_PAGE.messageLadi("Vui lòng kiểm tra kết nối hoặc liên hệ với chúng tôi!")
        }) : ($(".parLoading").hide(), PN_PAGE.messageLadi("Vui lòng nhập email!"))
    }
}]);