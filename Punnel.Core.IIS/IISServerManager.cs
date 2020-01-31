using log4net;
using Microsoft.Web.Administration;
using Punnel.Core.Entities.IIS;
using Punnel.Core.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Punnel.Core.IIS
{
    public class IISServerManager
    {
        private static readonly ILog _log = LogManager.GetLogger(typeof(IISServerManager));

        private static readonly string IIS_POOL = ConfigSettings.Get("IIS_POOL", "DefaultAppPool");
        private static readonly string IIS_BINDING = ConfigSettings.Get("IIS_BINDING", "http");
        private static readonly string PUBLISH_FOLDER_ROOT = ConfigSettings.Get("PUBLISH_FOLDER_ROOT", @"C:\Punnel\LANDING_PAGES");

        ServerManager serverMgr;

        public IISServerManager()
        {
            serverMgr = new ServerManager();
        }

        public virtual List<SiteInfo> GetSites()
        {
            List<SiteInfo> l = new List<SiteInfo>();
            foreach (var item in serverMgr.Sites)
            {
                l.Add(new SiteInfo()
                {
                    Name = item.Name,
                    Path = item.Applications["/"].VirtualDirectories["/"].PhysicalPath,
                    AutoStart = item.ServerAutoStart
                });
            }
            var rootPath = PUBLISH_FOLDER_ROOT + @"\";
            var list = l.Where(x => x.Path.Contains(rootPath)).ToList();
            foreach(var item in list)
            {
                item.Path = item.Path.Replace(rootPath, "");
            }
            return list;
        }
        public virtual async Task<string> AddWebsite(string host)
        {
            try
            {
                host = host.ToLower().Trim();
                string ipAddress = "*";
                string strApplicationPool = IIS_POOL;
                string bindinginfo = ipAddress + ":80:" + host;
                string bindinginfowww = ipAddress + ":80:www." + host;
                Boolean bWebsite = IsWebsiteExists(host);
                if (!bWebsite)
                {
                    var localPath = System.IO.Path.Combine(PUBLISH_FOLDER_ROOT, host);
                    Site mySite = serverMgr.Sites.Add(host, IIS_BINDING, bindinginfo, localPath);
                    mySite.Bindings.Add(bindinginfowww, IIS_BINDING);
                    mySite.ApplicationDefaults.ApplicationPoolName = strApplicationPool;
                    mySite.ServerAutoStart = true;
                    serverMgr.CommitChanges();
                }
                return host;
            }catch(Exception ex)
            {
                _log.Error(ex);
            }
            return host;
        }

        public virtual async Task<string> ChangeWebsite(string oldHost, string newHost)
        {
            RemoveWebsite(oldHost);
            return await AddWebsite(newHost);
        }

        public virtual void RemoveWebsite(string host)
        {
            try
            {
                Boolean bWebsite = IsWebsiteExists(host);
                if (bWebsite)
                {
                    Site s1 = serverMgr.Sites[host];
                    serverMgr.Sites.Remove(s1);
                    serverMgr.CommitChanges();
                }
            } catch (Exception) { }
        }

        public virtual bool IsWebsiteExists(string name)
        {
            Boolean flagset = false;
            SiteCollection sitecollection = serverMgr.Sites;
            foreach (Site site in sitecollection)
            {
                if (site.Name == name.ToString())
                {
                    flagset = true;
                    break;
                }
                else
                {
                    flagset = false;
                }
            }
            return flagset;
        }

        public async Task GenerateSSL(string host)
        {
            var client = new LetsEncryptClient(LetsEncryptClient.StagingV2);
            await client.Init("hi@mixdo.vn", CancellationToken.None);
            var tos = client.GetTermsOfServiceUri(); // user should agree to this
            _log.InfoFormat("tos {0}",tos);
            // start a new order for the *.example.net wildcard domain
            Dictionary<string, string> challenges = await client.NewOrder(new[]
            {
               "*.lamdeptuthiennhien.vn"
            });
            _log.InfoFormat("challenges {0}", challenges.Count);
            // do the DNS challenge
            foreach (var challenge in challenges)
            {
                await UpdateDnsServer(host: "_acme-challenge." + challenge.Key, token: challenge.Value, recordType: "TXT");
            }

            // Now that the DNS is updated, let Let's Encrypt know that it can validate them
            await client.CompleteChallenges();

            // get the certificate for the successful order
            var cert = await client.GetCertificate();
            //combine public cert with the private key for a full pfx
            var pfx = cert.Cert.CopyWithPrivateKey(cert.PrivateKey);
            _log.InfoFormat("pfx", pfx.FriendlyName);
            File.WriteAllBytes(host + ".pfx", pfx.Export(X509ContentType.Pfx));
        }

        private Task UpdateDnsServer(string host, string token, string recordType)
        {
            Site site = serverMgr.Sites[host];
            return null;
            //throw new NotImplementedException();
        }

        void test()
        {
           var h= ACMESharp.Providers.IIS.IisHelper.ListDistinctWebSites();
        }
    }
}
