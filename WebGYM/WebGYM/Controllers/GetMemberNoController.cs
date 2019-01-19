using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebGYM.Interface;
using WebGYM.ViewModels;

namespace WebGYM.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GetMemberNoController : ControllerBase
    {
        private readonly IMemberRegistration _memberRegistration;
        public GetMemberNoController(IMemberRegistration memberRegistration)
        {
            _memberRegistration = memberRegistration;
        }


        // POST: api/GetMemberNo
        [HttpPost]
        public List<MemberResponse> Post([FromBody] MemberRequest memberRequest)
        {
            try
            {
                var userId = Convert.ToInt32(this.User.FindFirstValue(ClaimTypes.Name));
                return _memberRegistration.GetMemberNoList(memberRequest.MemberName, userId);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
