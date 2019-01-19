using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGYM.ViewModels
{
    public class RoleViewModel
    {
        [Required(ErrorMessage = "Enter Role name")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 3)]
        public string RoleName { get; set; }
        public bool Status { get; set; }
        public int? RoleId { get; set; }
    }
}
