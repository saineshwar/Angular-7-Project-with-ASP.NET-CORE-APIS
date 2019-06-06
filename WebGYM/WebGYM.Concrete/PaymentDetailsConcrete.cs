using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using WebGYM.Interface;
using WebGYM.Models;
using WebGYM.ViewModels;
using System.Linq.Dynamic.Core;
using Dapper;

namespace WebGYM.Concrete
{
    public class PaymentDetailsConcrete : IPaymentDetails
    {
        private readonly IConfiguration _configuration;
        private readonly DatabaseContext _context;

        public PaymentDetailsConcrete(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;

        }
        public IQueryable<PaymentDetailsViewModel> GetAll(QueryParameters queryParameters, int userId)
        {
            IQueryable<PaymentDetailsViewModel> allItems = (from payment in _context.PaymentDetails
                                                            where payment.Createdby == userId
                                                            join member in _context.MemberRegistration on payment.MemberID equals member.MemberId
                                                            join plan in _context.PlanMaster on payment.PlanID equals plan.PlanID
                                                            join scheme in _context.SchemeMaster on payment.WorkouttypeID equals scheme.SchemeID
                                                            select new PaymentDetailsViewModel()
                                                            {
                                                                RecStatus = payment.RecStatus,
                                                                PlanName = plan.PlanName,
                                                                MemberName = member.MemberFName + '|' + member.MemberMName + '|' + member.MemberLName,
                                                                MemberNo = member.MemberNo,
                                                                NextRenwalDate = payment.NextRenwalDate,
                                                                PaymentAmount = payment.PaymentAmount,
                                                                SchemeName = scheme.SchemeName,
                                                                PaymentID = payment.PaymentID,
                                                                PaymentFromdt = payment.PaymentFromdt,
                                                                PaymentTodt = payment.PaymentTodt

                                                            }).AsQueryable().OrderBy("PaymentID", queryParameters.IsDescending());

            if (queryParameters.HasQuery())
            {
                allItems = allItems
                    .Where(x => x.MemberName.ToLowerInvariant().Contains(queryParameters.Query.ToLowerInvariant()));
            }

            return allItems
                .Skip(queryParameters.PageCount * (queryParameters.Page - 1))
                .Take(queryParameters.PageCount);
        }

        public int Count(int userId)
        {
            var paycount = (from payment in _context.PaymentDetails
                            where payment.Createdby == userId
                            select payment).Count();
            return paycount;
        }

        public bool RenewalPayment(RenewalViewModel renewalViewModel)
        {
            using (var con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
            {
                con.Open();
                var sqlTransaction = con.BeginTransaction();
                var paramater = new DynamicParameters();
                paramater.Add("@PaymentID", 0);
                paramater.Add("@PlanID", renewalViewModel.PlanID);
                paramater.Add("@WorkouttypeID", renewalViewModel.SchemeID);
                paramater.Add("@Paymenttype", "Cash");
                paramater.Add("@PaymentFromdt", renewalViewModel.NextRenwalDate);
                paramater.Add("@PaymentAmount", renewalViewModel.Amount);
                paramater.Add("@CreateUserID", renewalViewModel.Createdby);
                paramater.Add("@ModifyUserID", renewalViewModel.Createdby);
                paramater.Add("@RecStatus", "A");
                paramater.Add("@MemberID", renewalViewModel.MemberId);
                paramater.Add("@PaymentIDOUT", dbType: DbType.Int32, direction: ParameterDirection.Output);
                int resultPayment = con.Execute("sprocPaymentDetailsInsertUpdateSingleItem", paramater, sqlTransaction,
                    0, CommandType.StoredProcedure);

                if (resultPayment > 0)
                {
                    sqlTransaction.Commit();
                    int paymentId = paramater.Get<int>("PaymentIDOUT");
                    return true;
                }
                else
                {
                    sqlTransaction.Rollback();
                    return false;
                }
            }
        }






    }
}
