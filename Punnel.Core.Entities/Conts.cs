using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities
{
    public static class Conts
    {
        public const string Cpanel_user = "cpanel_user";
        #region Roles
        public const string Role_Member = "member";
        public const string Role_Editor = "editor";
        public const string Role_Super = "super";
        public const string Role_Agent = "agent";
        public const string Role_Admin = "admin";
        #endregion

        #region Cache table name
        public const string CACHE_KEY_ALL = "ALL";
        public const string CACHE_HASHTABLE_TEMPLATE = "TEMPLATE";
        public const string CACHE_HASHTABLE_LANDINGPAGE = "LANDINGPAGE";
        public const string CACHE_HASHTABLE_TEMPLATE_CATEGORY = "TEMPLATE_CATEGORY";
        public const string CACHE_HASHTABLE_COLLECTION = "COLLECTION";
        public const string CACHE_HASHTABLE_IMAGESTOCK = "IMAGESTOCK";
        public const string CACHE_HASHTABLE_FILE = "FILE";
        #endregion

        #region redis
        public const string REDIS_TEMPLATE_KEY = "template:key";
        public const string REDIS_TEMPLATE_SEARCH = "template:search";
        public const string REDIS_TEMPLATECATEGORY_KEY = "templatecategory:key";
        public const string REDIS_TEMPLATECATEGORY_TYPE = "templatecategory:type";
        #endregion
    }
}
