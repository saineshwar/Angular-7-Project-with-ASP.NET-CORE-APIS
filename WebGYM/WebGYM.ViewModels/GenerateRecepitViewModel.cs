using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGYM.ViewModels
{
    public class GenerateRecepitViewModel
    {
        public string MemberNo { get; set; }
        public string MemberName { get; set; }
        public string PlanName { get; set; }
        public string SchemeName { get; set; }
        public string PaymentFromdt { get; set; }
        public string PaymentTodt { get; set; }
        public string NextRenwalDate { get; set; }
        public string PaymentAmount { get; set; }
        public string CreateDate { get; set; }
        public string ServiceTax { get; set; }
        public string PlanAmount { get; set; }
        public string ServicetaxAmount { get; set; }
    }
}
