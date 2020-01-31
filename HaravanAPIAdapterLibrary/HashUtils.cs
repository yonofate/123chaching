using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace HaravanAPIAdapterLibrary
{
    public static class HashUtils
    {
        public static T GetAndVerifyHookData<T>(HttpRequest Request, string apisecret)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(GetAndVerifyHookData(Request, apisecret));
        }

        public static string GetAndVerifyHookData(HttpRequest Request, string apisecret)
        {
            var shop = Request.Headers["Haravan-Shop-Domain"];
            var signature = Request.Headers["X-Haravan-Hmac-Sha256"];
            var topic = Request.Headers["X-Haravan-Topic"];

            if (string.IsNullOrEmpty(shop)
                || string.IsNullOrEmpty(signature)
                || string.IsNullOrEmpty(topic))
            {
                throw new InvalidOperationException();
            }

            var content = string.Empty;

            using (StreamReader reader = new StreamReader(Request.InputStream, new UTF8Encoding(false)))
            {
                content = reader.ReadToEnd();
            }

            if (string.IsNullOrEmpty(content))
            {
                throw new InvalidOperationException();
            }

            using (var hashType = new System.Security.Cryptography.HMACSHA256
                (System.Text.Encoding.UTF8.GetBytes(apisecret)))
            {
                var checksum = Convert.ToBase64String(hashType.ComputeHash(System.Text.Encoding.UTF8.GetBytes(content)));
                if (checksum == signature)
                {
                    return content;
                }
            }

            throw new InvalidOperationException();
        }

        public static bool VerifyCallbackAuthenticateCode(HttpRequest request, string apisecret)
        {
            var code = request.QueryString.Get("code");
            var shop = request.QueryString.Get("shop");
            var timestamp = request.QueryString.Get("timestamp");
            var signature = request.QueryString.Get("signature");
            
            var str = string.Format("code={0}shop={1}timestamp={2}", code, shop, timestamp);

            using (HMACSHA256 hashType = new HMACSHA256(Encoding.UTF8.GetBytes(apisecret)))
            {
                var checksum = HashUtils.ToHex(hashType.ComputeHash(Encoding.UTF8.GetBytes(str)));

                if (checksum == signature)
                {
                    return true;
                }
            }

            return false;
        }

        static char HexDigit(int num)
        {
            return (char)((num < 10) ? (num + '0') : (num + ('A' - 10)));
        }

        public static String ToHex(byte[] sArray)
        {
            String result = null;

            if (sArray != null)
            {
                char[] hexOrder = new char[sArray.Length * 2];

                int digit;
                for (int i = 0, j = 0; i < sArray.Length; i++)
                {
                    digit = (int)((sArray[i] & 0xf0) >> 4);
                    hexOrder[j++] = HexDigit(digit);
                    digit = (int)(sArray[i] & 0x0f);
                    hexOrder[j++] = HexDigit(digit);
                }
                result = new String(hexOrder);
            }
            return result.ToLower();
        }

        public static string MD5Hash(string text)
        {
            using (MD5 md5 = new MD5CryptoServiceProvider())
            {

                //compute hash from the bytes of text
                md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));

                //get hash result after compute it
                byte[] result = md5.Hash;

                StringBuilder strBuilder = new StringBuilder();
                for (int i = 0; i < result.Length; i++)
                {
                    //change it into 2 hexadecimal digits
                    //for each byte
                    strBuilder.Append(result[i].ToString("x2"));
                }

                return strBuilder.ToString();
            }
        }
    }
}
