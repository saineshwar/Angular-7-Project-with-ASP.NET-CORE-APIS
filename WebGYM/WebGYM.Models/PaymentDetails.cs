using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGYM.Models
{
    [Table("PaymentDetails")]
    public class PaymentDetails
    {
        [Key]
        public long PaymentID { get; set; }
        public int PlanID { get; set; }
        public int? WorkouttypeID { get; set; }
        public string Paymenttype { get; set; }
        public DateTime PaymentFromdt { get; set; }
        public DateTime PaymentTodt { get; set; }
        public decimal? PaymentAmount { get; set; }
        public DateTime NextRenwalDate { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? Createdby { get; set; }
        public DateTime? ModifyDate { get; set; }
        public int? ModifiedBy { get; set; }
        public string RecStatus { get; set; }
        public long? MemberID { get; set; }
        public string MemberNo { get; set; }
    }

}
