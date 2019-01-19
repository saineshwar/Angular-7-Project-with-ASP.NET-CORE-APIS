using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebGYM.Interface;
using WebGYM.ViewModels;

namespace WebGYM.Concrete
{
    public class GenerateRecepitConcrete : IGenerateRecepit
    {
        private readonly IConfiguration _configuration;
        private readonly DatabaseContext _context;

        public GenerateRecepitConcrete(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;

        }
        public GenerateRecepitViewModel Generate(int paymentId)
        {
            using (var con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
            {
                var para = new DynamicParameters();
                para.Add("@PaymentID", paymentId);
                return con.Query<GenerateRecepitViewModel>("GetRecepit", para, null, true, 0, commandType: CommandType.StoredProcedure).SingleOrDefault();
            }
        }
    }
}
