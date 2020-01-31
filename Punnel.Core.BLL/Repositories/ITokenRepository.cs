using System;
using Punnel.Core.Entities.Model;

namespace Punnel.Core.BLL.Repositories
{
    public interface ITokenRepository: IBaseRepository<Token>
    {
        bool Verify(Token obj);
        void AddToken(Token obj);
        bool VerifyByCode(Token obj);
        void DeleteByUser(string userId);
    }
}