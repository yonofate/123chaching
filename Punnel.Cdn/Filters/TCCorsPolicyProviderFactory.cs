﻿
using Punnel.Cdn.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Cors;

namespace Punnel.Cdn.Providers
{
    public class TCCorsPolicyProviderFactory : ICorsPolicyProviderFactory
    {
        ICorsPolicyProvider _provider;
        public TCCorsPolicyProviderFactory()
        {
            _provider = new TCCorsPolicyProvider();
        }
        public ICorsPolicyProvider GetCorsPolicyProvider(HttpRequestMessage request)
        {
            return _provider;
        }
    }
}