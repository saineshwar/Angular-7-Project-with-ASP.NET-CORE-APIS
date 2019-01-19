using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebGYM.Interface;
using WebGYM.Models;
using WebGYM.ViewModels;

namespace WebGYM.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AssignRolesController : ControllerBase
    {
        private readonly IUsersInRoles _usersInRoles;
        public AssignRolesController(IUsersInRoles usersInRoles)
        {
            _usersInRoles = usersInRoles;
        }


        // GET: api/UsersInRoles
        [HttpGet]
        public IEnumerable<AssignRolesViewModel> Get()
        {
            try
            {
                return _usersInRoles.GetAssignRoles();
            }
            catch (Exception)
            {

                throw;
            }
        }

       
        // POST: api/UsersInRoles
        [HttpPost]
        public HttpResponseMessage Post([FromBody] UsersInRoles usersInRoles)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_usersInRoles.CheckRoleExists(usersInRoles))
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.Conflict
                        };

                        return response;
                    }
                    else
                    {

                        usersInRoles.UserRolesId = 0;
                        _usersInRoles.AssignRole(usersInRoles);

                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.OK
                        };

                        return response;
                    }
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {

                        StatusCode = HttpStatusCode.BadRequest
                    };

                    return response;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }



    }
}
