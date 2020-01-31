punnelApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", function ($stateProvider, $routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.otherwise("/loading");
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});
    $stateProvider.state("index", {
        "abstract": true,
        templateUrl: "Scripts/app/views/index.html",
    }).state("loading", {
        url: "/loading",
        templateUrl: "Scripts/app/views/loading.html"
    }).state("auth", {
        url: "/auth",
        templateUrl: "Scripts/app/views/index.html",
            data: {
                pageTitle: ""
            }
    }).state("auth.login", {
        url: "/login/:tid",
        templateUrl: "Scripts/app/views/login/login-social.html",
        data: {
            pageTitle: "Đăng nhập"
        },
        params: { tid: null}
    }).state("auth.login-social", {
        url: "/login-social",
        templateUrl: "Scripts/app/views/login/login-social.html",
        data: {
            pageTitle: "Đăng nhập"
        }
    }).state("auth.complete-register", {
        url: "/complete-register",
        templateUrl: "Scripts/app/views/login/complete-register.html",
        data: {
            pageTitle: "Ho\u00e0n t\u1ea5t \u0111\u0103ng k\u00fd"
        }
    }).state("auth.register", {
        url: "/register/?tid&ref&gt",
        templateUrl: "scripts/app/views/login/register-social.html",
        data: {
            pageTitle: "Đăng kí"
        }
    })
        .state("auth.forgotpass", {
        url: "/forgot-password/",
        templateUrl: "scripts/app/views/login/forgotpass-mobile.html",
        data: {
            pageTitle: "Quên mật khẩu"
        },
            params: { token: null }
        }).state("auth.forgotpass-email", {
            url: "/forgot-password-email/",
            templateUrl: "scripts/app/views/login/forgotpass.html",
            data: {
                pageTitle: "Quên mật khẩu"
            },
            params: { token: null }
        }).state("auth.newpassword", {
        url: "/newpassword/?u&c",
        templateUrl: "scripts/app/views/login/creatnewPassword.html",
        data: {
            pageTitle: "Tạo mật khẩu mới"
        }
        }).state("auth.complete-verifyemail", {
            url: "/complete-verifyemail/?u&c",
            templateUrl: "scripts/app/views/login/verifyEmailRequired.html",
            data: {
                pageTitle: "Xác thực tài khoản"
            }
        }).state("auth.complete-verifymobile", {
            url: "/complete-verifymobile/?u&c",
            templateUrl: "scripts/app/views/login/verifyMobileRequired.html",
            data: {
                pageTitle: "Xác thực tài khoản"
            }
        }).state("auth.verifyemail", {
            url: "/verify-email/?u&c",
            templateUrl: "scripts/app/views/login/verifyEmail.html",
            data: {
                pageTitle: "Xác thực email"
            }
        })
        .state("auth.changeemail", {
            url: "/change-email/?u&c",
            templateUrl: "scripts/app/views/login/changeEmail.html",
            data: {
                pageTitle: "Đổi email"
            }
        })
        .state("auth.changemobile", {
            url: "/change-mobile/?u&c",
            templateUrl: "scripts/app/views/login/changeMobile.html",
            data: {
                pageTitle: "Đổi số điện thoại"
            }
        })
        .state("main", {
            "abstract": true,
        templateUrl: "scripts/app/views/main.html",
    })
        .state("dashboard", {
       "abstract": true,
        url: "/dashboard?tid",
        templateUrl: "scripts/app/views/user_dashboard/user_dashboard.html",
        data: {
            pageTitle: "Dashboard"
        }
    }).state("dashboard.main", {
        url: "",
        templateUrl: "scripts/app/views/user_dashboard/main.html",
        data: {
            pageTitle: "Dashboard"
        }
        }).state("dashboard.expires", {
            url: "/expires",
            templateUrl: "scripts/app/views/user_dashboard/expires.html",
            data: {
                pageTitle: "Tài khoản hết hạn"
            }
        }).state("dashboard.landingpage", {
        url: "/landingpage",
        templateUrl: "scripts/app/views/user_dashboard/projectv2.html",
        data: {
            pageTitle: "Landing page"
        }
    }).state("dashboard.template", {
        url: "/template",
        templateUrl: "scripts/app/views/user_dashboard/template.html",
        data: {
            pageTitle: "Giao diện mẫu"
        }
    }).state("main.newLandingpage", {
        url: "/landingpage-templates",
        templateUrl: "scripts/app/views/template/templates.html",
        data: {
            pageTitle: "Themes"
        }
        }).state("main.upgrade", {
            url: "/upgrade",
            templateUrl: "scripts/app/views/account/upgrade.html",
            data: {
                pageTitle: "Nâng cấp tài khoản"
            }
        }).state("main.payment", {
            url: "/payment/:id",
            templateUrl: "scripts/app/views/account/payment.html",
            data: {
                pageTitle: "Thanh toán",
            },
            params: { id: null }
        }).state("dashboard.lead", {
            url: "/lead?id",
        templateUrl: "scripts/app/views/user_dashboard/lead.html",
            data: {
                pageTitle: "Leads"
            },
            params: { id: null }
        }).state("dashboard.domain", {
            url: "/domain",
            templateUrl: "scripts/app/views/user_dashboard/domain.html",
            data: {
                pageTitle: "Domains"
            }
        }).state("dashboard.integration", {
        url: "/integration",
        templateUrl: "scripts/app/views/user_dashboard/integration.html",
        data: {
            pageTitle: "Tích hợp"
        }
    }).state("dashboard.affiliate", {
        url: "/affiliate",
        templateUrl: "scripts/app/views/user_dashboard/affiliate.html",
        data: {
            pageTitle: "Affiliate"
        }
    }).state("dashboard.autoResponder", {
        url: "/auto-responder",
        templateUrl: "scripts/app/views/user_dashboard/auto_responder_template.html",
        data: {
            pageTitle: "Mẫu Auto Responder"
        }
        }).state("dashboard.emailTemplateDetail", {
            url: "/email-template/detail/email/:id",
            templateUrl: "scripts/app/views/user_dashboard/email_template_detail.html",
            data: {
                pageTitle: "Mẫu Email Responder"
            },
            params: {id: null }
        }).state("dashboard.smsTemplateDetail", {
            url: "/email-template/detail/sms/:id",
            templateUrl: "scripts/app/views/user_dashboard/sms_template_detail.html",
            data: {
                pageTitle: "Mẫu Sms Responder"
            },
            params: { id: null }
        }).state("dashboard.sendmail", {
            url: "/lead/sendmail/:id",
            templateUrl: "scripts/app/views/user_dashboard/sendEmail.html",
            data: {
                pageTitle: "Gửi email"
            },
            params: { id: null }
        }).state("dashboard.analytics", {
            url: "/analytics/page/:id",
            templateUrl: "scripts/app/views/user_dashboard/analytics.html",
            data: {
                pageTitle: "Thống kê Page"
            },
            params: { id: null }
        }).state("dashboard.servermanager", {
        url: "/server-manager",
        templateUrl: "scripts/app/views/admin_manage/iismanager.html",
            data: {
                pageTitle: "Quản lý Hosting"
            }
        })
        .state("dashboard.usermanager", {
            url: "/user-manager?w",
            templateUrl: "scripts/app/views/admin_manage/usermanager.html",
            data: {
                pageTitle: "Quản lý thành viên"
            },
            params: {w:null}
        })
        .state("dashboard.invoicemanager", {
            url: "/invoice-manager",
            templateUrl: "scripts/app/views/admin_manage/invoicemanager.html",
            data: {
                pageTitle: "Quản lý mua dịch vụ"
            }
        })
        .state("dashboard.ticketmanager", {
            url: "/ticket-manager",
            templateUrl: "scripts/app/views/admin_manage/ticketmanager.html",
            data: {
                pageTitle: "Ticket hỗ trợ khách hàng"
            }
        })
        .state("dashboard.promotionmanager", {
            url: "/promotion-manager",
            templateUrl: "scripts/app/views/admin_manage/promotionmanager.html",
            data: {
                pageTitle: "Quản lý khuyến mãi"
            }
        })
        .state("dashboard.promotioncodemanager", {
            url: "/promotion-code-manager/:id",
            templateUrl: "scripts/app/views/admin_manage/promotioncodemanager.html",
            data: {
                pageTitle: "Quản lý code khuyến mãi"
            },
            params: {id:null}
        })
        .state("editor", {
            url: "/editor/:type/:id",
            templateUrl: "scripts/app/views/page/content_page.html",
            data: {
                pageTitle: "Tạo landing page"
            },
            params: { id: null }
        })
        .state("quick-editor", {
            url: "/quick-editor/:id",
            templateUrl: "scripts/app/views/page/quick_editor.html",
            data: {
                pageTitle: "Tạo nhanh landing page"
            },
            params: { id: null }
        })
        .state("preview", {
        url: "/preview/:id?time",
        templateUrl: "scripts/app/views/preview/preview.html",
        data: {
            pageTitle: "Preview Landing Page"
        }
        }).state("preview-template", {
            url: "/preview-template/:type/:id/?cf",
            templateUrl: "/scripts/app/views/preview/preview-template.html",
            data: {
                pageTitle: "Preview Template"
            },
            params: { type: null, id:null, src:null }
        }).state("preview-history", {
        url: "/preview-history/?id&name",
        templateUrl: "views/preview/preview-history.html",
        data: {
            pageTitle: "Preview Landing Page"
        }
    }).state("logout", {
        url: "/logout",
        controller: ["$rootScope", function ($rootScope) {
            $rootScope.logout();
        }]
    }).state("update", {
        url: "/message",
        templateUrl: "views/page/update.html",
        data: {
            pageTitle: "Thông báo"
        }
    })
        .state("set-ref", {
        url: "/set-ref/:ref",
        templateUrl: "views/login/set-ref.html",
        params: { ref: null }
    }).state("not-suport", {
        url: "/using-chrome",
        templateUrl: "scripts/app/views/login/not-support.html"
    }).state("using-themes", {
        url: "/using-themes?tid",
        templateUrl: "views/theme/createProject.html",
        data: {
            pageTitle: "Sử dụng LandingPage"
        }
    }).state("update-serve", {
        url: "/notify-update",
        templateUrl: "update-serve.html",
        data: {
            pageTitle: "Update Server"
        }
    });
}], ["$compileProvider", function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);
