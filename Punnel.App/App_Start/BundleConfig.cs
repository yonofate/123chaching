using Punnel.Core.Utils;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Optimization;

namespace Punnel.App
{
    public class BundleConfig
    {
        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
                throw new ArgumentNullException("ignoreList");
            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(new StyleBundle("~/contents/styles/css").Include(
                "~/Contents/styles/main.css",
                "~/Contents/styles/vendor/font-builder.css",
                "~/Contents/styles/vendor.css",
                "~/Contents/styles/custom.css",
                //"~/Contents/styles/newstyle.css",
                "~/bower_components/ng-slim-scroll/ng-slim-scroll.css",
                "~/bower_components/bootstrap-daterangepicker/daterangepicker.css",
                "~/bower_components/angular-tooltips/dist/angular-tooltips.css",
                "~/Contents/styles/loading-btn.css"
                ));

            //bundles.Add(new StyleBundle("~/contents/styles/punnellib").IncludeDirectory(
            //"~/Contents/styles/page/animate", "*.css", true));

            //bundles.Add(new StyleBundle("~/contents/styles/pagevendor").IncludeDirectory(
            //"~/Contents/styles/page/vendor", "*.css", true));

            //bundles.Add(new ScriptBundle("~/bundles/pagejs").Include(
            //             "~/Scripts/libs/jquery-3.3.1.js",
            //             "~/Scripts/libs/sweetalert.js",
            //            "~/Scripts/ext/punnel.lib.js"));

            //bundles.Add(new ScriptBundle("~/bundles/pagepreviewjs").Include(
            //     "~/Scripts/libs/jquery-3.3.1.js",
            //             "~/Scripts/libs/sweetalert.js",
            //            "~/Scripts/ext/punnel.preview.js"));

            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                        "~/bower_components/angular/angular.js",
                        "~/Scripts/angular-cookies.js",
                        "~/Scripts/angular-resource.js",
                        "~/Scripts/angular-route.js",
                        "~/Scripts/angular-sanitize.js",
                        "~/bower_components/angular-md5/angular-md5.js",
                        "~/bower_components/ngstorage/ngStorage.js",
                        "~/bower_components/angular-animate/angular-animate.js",
                        "~/Scripts/libs/ui-bootstrap-tpls-2.2.0.js",
                        "~/bower_components/angular-aria/angular-aria.js",
                        "~/bower_components/angular-messages/angular-messages.js",
                        "~/bower_components/angular-material/angular-material.js",
                        "~/bower_components/angular-ui-router/release/angular-ui-router.js",
                        "~/bower_components/angular-ui-router/release/stateEvents.js",
                        "~/bower_components/angular-translate/angular-translate.js",
                        "~/bower_components/angular-translate-loader-url/angular-translate-loader-url.js",
                        "~/bower_components/ng-file-upload/ng-file-upload.js",
                        "~/Scripts/libs/jquery-3.3.1.js",
                        "~/Scripts/libs/jquery-ui-1.12.1/jquery-ui.js",
                        "~/bower_components/ace-builds/src-min-noconflict/ace.js",
                        "~/bower_components/angular-ui-ace/ui-ace.js",
                        "~/Scripts/libs/momentjs/moment.js",
                        "~/Scripts/libs/momentjs/vi.js",
                         "~/bower_components/angular-moment/angular-moment.js",
                         "~/bower_components/bootstrap-daterangepicker/daterangepicker.js",
                        "~/bower_components/angularjs-daterangepicker/src/angular-daterangepicker.js",
                         "~/Scripts/libs/jquery.slimscroll.js",
                         "~/bower_components/angular-slimscroll/angular-slimscroll.js",
                         "~/bower_components/angular-socialshare/angular-socialshare.js",
                         "~/Scripts/libs/sweetalert.js",
                         "~/Scripts/libs/clipboard.js",
                         "~/Scripts/libs/angular-drag-and-drop-lists.js",
                         //"~/Scripts/libs/ng-infinite-scroll.js",
                        "~/bower_components/angular-ui-ace/ui-ace.js",
                        "~/bower_components/tinymce/tinymce.js",
                        "~/bower_components/angular-ui-tinymce/src/tinymce.js",
                        "~/Scripts/libs/angular-local-storage.js",
                        "~/Scripts/libs/signalr/jquery.signalR-2.3.0.js",
                        "~/bower_components/angular-signalr-hub/signalr-hub.js",
                        "~/Scripts/app/signalrHub.js",
                        "~/Scripts/libs/bootstrap.js",
                        "~/Scripts/libs/me-lazyload.js",
                        "~/Scripts/libs/ng-csv.js",
                        "~/bower_components/angular-facebook/lib/angular-facebook.js",
                        "~/bower_components/chartjs/chart.js",
                        "~/bower_components/angular-tooltips/dist/angular-tooltips.js",
                        "~/Scripts/app/main.js",
                        "~/Scripts/app/resources/enum.js",
                         "~/Scripts/app/resources/resource.js",
                         "~/Scripts/app/resources/config.js",
                        "~/Scripts/app/app.js",
                        //"~/Scripts/app/config/templateCaches.js",
                        "~/Scripts/app/config.js",
                        "~/Scripts/app/conts.js",
                        "~/Scripts/app/stateConfig.js")
                         .IncludeDirectory("~/Scripts/app/editors", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/directives", "*.js", true)
                        .IncludeDirectory("~/Scripts/app/services", "*.js", true)
                        //.IncludeDirectory("~/Scripts/app/config", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/common", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/account", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/integration", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/landingpage", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/lead", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/domain", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/affilate", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/form", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/admin_manage", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/iis", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/custom_editor", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/builder", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/image", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/templates", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/analytics", "*.js", true)
                         .IncludeDirectory("~/Scripts/app/controllers/email_template", "*.js", true));

            BundleTable.EnableOptimizations =  bool.Parse(ConfigSettings.Get("BUNDLE", "true"));
        }
    }
}

