using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Net.Mail;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using MimeKit;
using MBN.Utils;
using Punnel.Core.Entities;
using log4net;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Punnel.EmailServices.Offline;
using Google.Apis.Auth.OAuth2.Flows;

namespace Punnel.EmailServices
{
    public class GoogleSheetSvc
    {
        private static readonly ILog _log = LogManager.GetLogger("GoogleSheetSvc");
        private string _user, _tokenJson;
        static string[] Scopes = new[] { Google.Apis.Oauth2.v2.Oauth2Service.Scope.UserinfoProfile, Google.Apis.Oauth2.v2.Oauth2Service.Scope.UserinfoEmail, SheetsService.Scope.Spreadsheets };
        static string GOOGLE_API_CLI = WebUtils.AppSettings("GOOGLE_CLIENT_ID", "480758365207-7l1ucohu8hkjo0icdn66b22foutibfgn.apps.googleusercontent.com");
        static string GOOGLE_API_SECRET = WebUtils.AppSettings("GOOGLE_CLIENT_SECRET", "udmCUyI0AOD-R2rQ76Rx4BzS");
        static string INTEGRATION_TOKEN_ROOT = WebUtils.AppSettings("INTEGRATION_TOKEN_ROOT", @"C:\Punnel\INTEGRATION_TOKENS");
        static string SHEET_TOKEN_ROOT = System.IO.Path.Combine(INTEGRATION_TOKEN_ROOT, "GOOGLE_SHEET_TOKENS");
        public string User { get; set; }
        UserCredential credential;
        FileTokenUtils fileToken;
        public GoogleSheetSvc(string email,string tokenJson="")
        {
            _user = email;
            _tokenJson = tokenJson==null? "" : tokenJson;
            fileToken = new FileTokenUtils(SHEET_TOKEN_ROOT, _user);
        }
        public ApiResponse Auth()
        {
            _log.InfoFormat("authgsheet: {0}", _user);
            ApiResponse res = new ApiResponse();
            if(string.IsNullOrEmpty(_user))
            {
                _log.ErrorFormat("token không tồn tại {0}", _user);
                res.Message = string.Format(Punnel.Core.Entities.Resources.Messages.GSheet_Expired, _user);
                return res;
            }

            var jsonToken = fileToken.GetRefreshToken();
            //chưa có token
            if (jsonToken==null && _tokenJson.Length > 100)
            {
                fileToken.SaveToken(_tokenJson);
            }
            else if (jsonToken == null && _tokenJson.Length == 0)
            {
                _log.Error("chưa có token google");
                res.Message = string.Format(Punnel.Core.Entities.Resources.Messages.GSheet_Expired, _user);
                return res;
            }
            try
            {
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(new GoogleAuthorizationCodeFlow.Initializer
                {
                    ClientSecrets = new ClientSecrets
                    {
                        ClientId = GOOGLE_API_CLI,
                        ClientSecret = GOOGLE_API_SECRET
                    },
                    Scopes = Scopes,
                    DataStore = new FileDataStore(SHEET_TOKEN_ROOT, true)
                },Scopes, _user, CancellationToken.None, new FileDataStore(SHEET_TOKEN_ROOT, true)).Result;

                if (credential.Token.IsExpired(Google.Apis.Util.SystemClock.Default))
                {
                    var refreshResult = credential.RefreshTokenAsync(CancellationToken.None).Result;
                    //check lại
                    jsonToken = fileToken.GetRefreshToken();
                    if (jsonToken == null && _tokenJson.Length > 0)
                    {
                        fileToken.SaveToken(_tokenJson);
                        credential = GoogleWebAuthorizationBroker.AuthorizeAsync(new GoogleAuthorizationCodeFlow.Initializer
                        {
                            ClientSecrets = new ClientSecrets
                            {
                                ClientId = GOOGLE_API_CLI,
                                ClientSecret = GOOGLE_API_SECRET
                            },
                            Scopes = Scopes,
                            DataStore = new FileDataStore(SHEET_TOKEN_ROOT, true)
                        }, Scopes, _user, CancellationToken.None, new FileDataStore(SHEET_TOKEN_ROOT, true)).Result;
                    }
                }

                if (credential.Token != null && credential.Token.AccessToken.Length > 0)
                {
                    res.Data = fileToken.GetRefreshToken();
                    res.Code = System.Net.HttpStatusCode.OK;
                }
            }catch(Exception ex)
            {
                _log.Error(ex);
                res.Message = string.Format(Punnel.Core.Entities.Resources.Messages.GSheet_Expired, _user);
            }
            return res;
        }

        public ApiResponse GetSheetsBySpreadSheetId(string id)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var r = this.Auth();

                if (r.Code != System.Net.HttpStatusCode.OK)
                {
                    return r;
                }
                var service = new SheetsService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "Punnel",
                });

                var result = service.Spreadsheets.Get(id).Execute();
                if (result != null)
                {
                    string sheet_name = "Punnel";
                    var k = result.Sheets.FirstOrDefault(x => x.Properties.Title.ToLower() == "punnel");
                    if (k !=null)
                    {
                        Core.Entities.Integration.GoogleSheet.SpreadPunnelSheetViewModel result_data1 = new Core.Entities.Integration.GoogleSheet.SpreadPunnelSheetViewModel()
                        {
                            Id = result.SpreadsheetId,
                            Name= result.Properties.Title,
                            SheetId = k.Properties.SheetId
                        };
                        res.Data = result_data1;
                        res.Code = System.Net.HttpStatusCode.OK;
                    }
                    else
                    {
                        List<Google.Apis.Sheets.v4.Data.Request> requests = new List<Google.Apis.Sheets.v4.Data.Request>();
                        requests.Add(new Google.Apis.Sheets.v4.Data.Request()
                        {
                            AddSheet = new Google.Apis.Sheets.v4.Data.AddSheetRequest()
                            {
                                Properties = new Google.Apis.Sheets.v4.Data.SheetProperties()
                                {
                                    Title = sheet_name
                                }
                            }
                        });
                        Google.Apis.Sheets.v4.Data.BatchUpdateSpreadsheetRequest requestBody = new Google.Apis.Sheets.v4.Data.BatchUpdateSpreadsheetRequest();
                        requestBody.Requests = requests;
                        var res_updated = service.Spreadsheets.BatchUpdate(requestBody, result.SpreadsheetId).Execute();

                        result = service.Spreadsheets.Get(result.SpreadsheetId).Execute();

                        var pnsheet = result.Sheets[result.Sheets.Count - 1];

                        Core.Entities.Integration.GoogleSheet.SpreadPunnelSheetViewModel result_data = new Core.Entities.Integration.GoogleSheet.SpreadPunnelSheetViewModel()
                        {
                            Id = result.SpreadsheetId,
                            SheetId = pnsheet.Properties.SheetId
                        };
                        res.Data = result_data;
                        res.Code = System.Net.HttpStatusCode.OK;
                    }
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message ="Không tìm thấy Spread Id: " + id;
            }
            return res;
        }

        public ApiResponse CreateSpreadSheet(string name)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var r = this.Auth();

                if (r.Code != System.Net.HttpStatusCode.OK) return r;
                var service = new SheetsService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "Punnel",
                });

                Google.Apis.Sheets.v4.Data.Sheet default_sheet = new Google.Apis.Sheets.v4.Data.Sheet();
                default_sheet.Properties = new Google.Apis.Sheets.v4.Data.SheetProperties()
                {
                    Title = "Punnel"
                };
                List<Google.Apis.Sheets.v4.Data.Sheet> sheets = new List<Google.Apis.Sheets.v4.Data.Sheet>();
                sheets.Add(default_sheet);
                var result = service.Spreadsheets.Create(new Google.Apis.Sheets.v4.Data.Spreadsheet()
                {
                    Properties= new Google.Apis.Sheets.v4.Data.SpreadsheetProperties()
                    {
                        Title= name
                    },
                    Sheets= sheets
                }).Execute();

                if (result != null)
                {
                    var pnsheet = result.Sheets[0];
                    Core.Entities.Integration.GoogleSheet.SpreadPunnelSheetViewModel result_data = new Core.Entities.Integration.GoogleSheet.SpreadPunnelSheetViewModel()
                    {
                        Id = result.SpreadsheetId,
                        SheetId = pnsheet.Properties.SheetId
                    };
                    res.Data = result_data;
                    res.Code = System.Net.HttpStatusCode.OK;
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = ex.Message;
            }
            return res;
        }

        public ApiResponse CreateSheet(string spreadId, string sheetName)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var r = this.Auth();

                if (r.Code != System.Net.HttpStatusCode.OK) return res;
                var service = new SheetsService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "Punnel",
                });

                var spreedSheet = service.Spreadsheets.Get(spreadId).Execute();
                if(spreedSheet != null && spreedSheet.SpreadsheetUrl.Length > 0)
                {
                    if(spreedSheet.Sheets.Any(x=>x.Properties.Title.ToLower()== sheetName.ToLower()))
                    {
                        res.Message = "Sheet này đã có, vui lòng tạo sheet với tên khác";
                        return res;
                    }
                    spreedSheet.Sheets.Add(new Google.Apis.Sheets.v4.Data.Sheet()
                    {
                        Properties= new Google.Apis.Sheets.v4.Data.SheetProperties()
                        {
                            Title= sheetName
                        }
                    });
                    res.Code = System.Net.HttpStatusCode.OK;
                }
                else
                {
                    res.Message = "Thông tin SpreadSheet không hợp lệ";
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = ex.Message;
            }
            return res;
        }

        public ApiResponse AddItemOnSheet(string spreadsheetId, List<Object> data)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var r = this.Auth();
                if (r.Code != System.Net.HttpStatusCode.OK) return r;
                var service = new SheetsService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "Punnel",
                });

                string newRange = GetRange(service, spreadsheetId);

                IList<IList<Object>> objNeRecords = GenerateData(data);

                UpdatGoogleSheetinBatch(objNeRecords, spreadsheetId, newRange, service);
                res.Code = System.Net.HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = ex.Message;
            }
            return res;
        }

        protected static string GetRange(SheetsService service, string SheetId)
        {
            // Define request parameters.
            String spreadsheetId = SheetId;
            String range = "A:A";

            SpreadsheetsResource.ValuesResource.GetRequest getRequest =
                       service.Spreadsheets.Values.Get(spreadsheetId, range);

            ValueRange getResponse = getRequest.Execute();
            IList<IList<Object>> getValues = getResponse.Values;
            if (getValues == null) return getResponse.Range;
            int currentCount = getValues.Count() + 1;

            String newRange = "A" + currentCount + ":A";

            return newRange;
        }

        private static IList<IList<Object>> GenerateData(List<Object> data)
        {
            List<IList<Object>> objNewRecords = new List<IList<Object>>();
            objNewRecords.Add(data);
            return objNewRecords;
        }

        private static void UpdatGoogleSheetinBatch(IList<IList<Object>> values, string spreadsheetId, string newRange, SheetsService service)
        {
            SpreadsheetsResource.ValuesResource.AppendRequest request =
               service.Spreadsheets.Values.Append(new ValueRange() { Values = values }, spreadsheetId, newRange);
            request.InsertDataOption = SpreadsheetsResource.ValuesResource.AppendRequest.InsertDataOptionEnum.INSERTROWS;
            request.ValueInputOption = SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;
            var response = request.Execute();
        }

        private static string Base64UrlEncode(MimeMessage message)
        {
            using (var stream = new MemoryStream())
            {
                message.WriteTo(stream);
                return Convert.ToBase64String(stream.GetBuffer(), 0, (int)stream.Length)
                    .Replace('+', '-')
                    .Replace('/', '_')
                    .Replace("=", "");
            }
        }
    }
}
