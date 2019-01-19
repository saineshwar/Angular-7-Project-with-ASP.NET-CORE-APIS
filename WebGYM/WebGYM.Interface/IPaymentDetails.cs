using System.Linq;
using WebGYM.Models;
using WebGYM.ViewModels;

namespace WebGYM.Interface
{
    public interface IPaymentDetails
    {
        IQueryable<PaymentDetailsViewModel> GetAll(QueryParameters queryParameters, int userId);
        int Count(int userId);
        bool RenewalPayment(RenewalViewModel renewalViewModel);
    }
}