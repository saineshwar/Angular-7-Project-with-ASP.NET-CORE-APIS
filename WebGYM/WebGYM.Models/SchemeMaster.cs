using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGYM.Models
{
    public class SchemeMaster
    {
        [Key]
        public int SchemeID { get; set; }
        public string SchemeName { get; set; }
        public int Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public bool Status { get; set; }      
    }
}
