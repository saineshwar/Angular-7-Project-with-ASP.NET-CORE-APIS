using System;
using WebGYM.ViewModels;

namespace WebGYM.Interface
{
    public interface IRenewal
    {
        RenewalViewModel GetMemberNo(string memberNo, int userid);
        bool CheckRenewalPaymentExists(DateTime newdate, long memberId);
    }
}