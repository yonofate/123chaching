using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.EmailServices
{
    public class FileTokenUtils
    {
        string _folderRoot;
        string _uid;
        public FileTokenUtils(string folderRoot, string uid)
        {
            _folderRoot = folderRoot;
            _uid = uid;
        }
        public void SaveToken(string tokenJson)
        {
            string a = "Google.Apis.Auth.OAuth2.Responses.TokenResponse-" + _uid;
            string desc = System.IO.Path.Combine(_folderRoot, a);
            System.IO.File.WriteAllText(desc, tokenJson);
        }
        public bool ExitsToken()
        {
            string a = "Google.Apis.Auth.OAuth2.Responses.TokenResponse-" + _uid;
            string desc = System.IO.Path.Combine(_folderRoot, a);
            return System.IO.File.Exists(desc);
        }

        public string GetRefreshToken()
        {
            string a = "Google.Apis.Auth.OAuth2.Responses.TokenResponse-" + _uid;
            string desc = System.IO.Path.Combine(_folderRoot, a);
            if (System.IO.File.Exists(desc) == false) return null;
            var txt = System.IO.File.ReadAllText(desc);
            var token = Newtonsoft.Json.JsonConvert.DeserializeObject<GoogleApiToken>(txt);
            if (!string.IsNullOrEmpty(token.refresh_token) || (token.Issued.AddSeconds(token.expires_in) >= DateTime.Now)) return Newtonsoft.Json.JsonConvert.SerializeObject(token);
            return null;
        }
    }
}
