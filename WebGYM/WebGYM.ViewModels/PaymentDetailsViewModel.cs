using System;

namespace WebGYM.ViewModels
{
    public class PaymentDetailsViewModel
    {
        public long PaymentID { get; set; }
        public string PlanName { get; set; }
        public string SchemeName { get; set; }
        public DateTime? PaymentFromdt { get; set; }
        public DateTime? PaymentTodt { get; set; }
        public decimal? PaymentAmount { get; set; }
        public DateTime? NextRenwalDate { get; set; }
        public string RecStatus { get; set; }
        public string MemberName { get; set; }
        public string MemberNo { get; set; }
    }
}