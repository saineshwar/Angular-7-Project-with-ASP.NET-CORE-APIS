using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGYM.ViewModels
{
    public class AssignRolesViewModel
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public int UserRolesId { get; set; }
    }
}
