using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace Punnel.Theme.Infrastructures
{
    public interface IDatabase
    {
        SqlConnection DefaultConnection();
    }

    public class SqlDatabase : IDatabase
    {
        private readonly IConfiguration _config;
        public SqlDatabase(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection DefaultConnection()
        {
            var connectionString = _config["connectionstring:default"];
            var connection = new SqlConnection(connectionString);
            connection.Open();

            return connection;
        }


        private SqlConnection OpenConnection(string connectionString)
        {
            var connection = new SqlConnection(connectionString);
            connection.Open();

            return connection;
        }
    }
}
