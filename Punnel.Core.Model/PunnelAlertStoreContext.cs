using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Data.Linq;
using System.Data.Linq.Mapping;
using System.Reflection;
using Punnel.Core.Entities.Notification;

namespace Punnel.Core.Model
{
    partial class PunnelDataContext
    {
        [Function(Name = "[dbo].[msp_GetAlert_ByUser]")]
        public ISingleResult<AlertViewModel> msp_GetAlert_ByUser(
             [Parameter(Name = "@userId", DbType = "nvarchar(128)")] string userId,
             [Parameter(Name = "@limit", DbType = "int")] int limit,
             [Parameter(Name = "@start", DbType = "int")] int start,
             [Parameter(Name = "@type", DbType = "int")] int? type,
             [Parameter(Name = "@total", DbType = "int")] ref int total)
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), userId,limit,start,type,total);
            var res= ((ISingleResult<AlertViewModel>)(result.ReturnValue));
            total = (int)(result.GetParameterValue(4));
            //result.Dispose();
            return res;
        }

        [Function(Name = "[dbo].[msp_CountUnView_ByUser]")]
        public int msp_CountUnView_ByUser(
             [Parameter(Name = "@userId", DbType = "nvarchar(128)")] string userId,
             [Parameter(Name = "@count", DbType = "int")] ref int? count
          )
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), userId, count);
            int k = (int)(result.GetParameterValue(1));
            result.Dispose();
            return k;
        }

        [Function(Name = "[dbo].[msp_Alert_IU]")]
        public int msp_Alert_IU(
            [Parameter(Name = "@id", DbType = "int")] ref int id,
             [Parameter(Name = "@userId", DbType = "nvarchar(128)")] string userId,
             [Parameter(Name = "@referId", DbType = "nvarchar(128)")] string referId,
             [Parameter(Name = "@title", DbType = "nvarchar(200)")] string title,
             [Parameter(Name = "@content", DbType = "nvarchar(1000)")] string content,
             [Parameter(Name = "@type", DbType = "int")] int type,
             [Parameter(Name = "@isBroadCast", DbType = "bit")] bool isBroadCast,
             [Parameter(Name = "@isRead", DbType = "bit")] bool isRead,
             [Parameter(Name = "@link", DbType = "varchar(200)")] string link,
             [Parameter(Name = "@createdDate", DbType = "datetime")] DateTime createdDate,
             [Parameter(Name = "@updatedDate", DbType = "datetime")] DateTime updatedDate
          )
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())),id, userId, referId, title,content, type,isBroadCast,isRead, link,createdDate, updatedDate);
            int v = (int)(result.GetParameterValue(0));
            result.Dispose();
            return v;
        }

        [Function(Name = "[dbo].[msp_AlertUser_IU]")]
        public int msp_AlertUser_IU(
            [Parameter(Name = "@userId", DbType = "nvarchar(128)")] string userId,
             [Parameter(Name = "@latestViewDate", DbType = "datetime")] DateTime latestViewDate
          )
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), userId, latestViewDate);
            int v = ((int)(result.ReturnValue));
            result.Dispose();
            return v;
        }

        [Function(Name = "[dbo].[msp_MobileDevice_IU]")]
        public int msp_MobileDevice_IU(
             [Parameter(Name = "@id", DbType = "varchar(100)")] string id,
            [Parameter(Name = "@userId", DbType = "nvarchar(128)")] string userId,
             [Parameter(Name = "@name", DbType = "varchar(100)")] string name,
              [Parameter(Name = "@token", DbType = "varchar(100)")] string token,
             [Parameter(Name = "@os", DbType = "varchar(50)")] string os,
              [Parameter(Name = "@status", DbType = "bit")] bool status,
             [Parameter(Name = "@activeDate", DbType = "datetime")] DateTime activeDate
          )
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())),id, userId,name,token, os,status,activeDate);
            int v = ((int)(result.ReturnValue));
            result.Dispose();
            return v;
        }

        [Function(Name = "[dbo].[msp_MobileDevice_GetById]")]
        public ISingleResult<MobileDevice> msp_MobileDevice_GetById(
             [Parameter(Name = "@id", DbType = "varchar(100)")] string id)
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), id);
            var res = ((ISingleResult<MobileDevice>)(result.ReturnValue));
            //result.Dispose();
            return res;
        }

        [Function(Name = "[dbo].[msp_MobileDevice_GetByUserId]")]
        public ISingleResult<MobileDevice> msp_MobileDevice_GetByUserId(
             [Parameter(Name = "@userId", DbType = "nvarchar(128)")] string userId)
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), userId);
            var res = ((ISingleResult<MobileDevice>)(result.ReturnValue));
            //result.Dispose();
            return res;
        }

    }
}
