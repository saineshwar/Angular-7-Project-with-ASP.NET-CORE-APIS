using System;

namespace WebGYM.ViewModels
{
    public class RenewalViewModel
    {
        public int PlanID { get; set; }
        public int? SchemeID { get; set; }
        public string MemberName { get; set; }
        public long MemberId { get; set; }
        public string MemberNo { get; set; }
        public DateTime NextRenwalDate { get; set; }
        public DateTime NewDate { get; set; }
        public Decimal? Amount { get; set; }
        public long PaymentID { get; set; }
        public long? Createdby { get; set; }
    }
}