using System.Collections.Generic;
using WebGYM.Models;
using WebGYM.ViewModels;

namespace WebGYM.Interface
{
    public interface IUsersInRoles
    {
        bool AssignRole(UsersInRoles usersInRoles);
        bool CheckRoleExists(UsersInRoles usersInRoles);
        bool RemoveRole(UsersInRoles usersInRoles);
        List<AssignRolesViewModel> GetAssignRoles();
    }
}