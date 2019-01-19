using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGYM.Models
{
    [Table("PeriodTB")]
    public class PeriodTB
    {
        [Key]
        public int PeriodID { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
    }


}
