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
    public class RenewalDetailsController : ControllerBase
    {
        private readonly IRenewal _renewal;
        public RenewalDetailsController(IRenewal renewal)
        {
            _renewal = renewal;
        }
          
        // POST: api/RenewalDetails
        [HttpPost]
        public RenewalViewModel Post([FromBody] MemberNoRequest memberNoRequest)
        {
            var userId = Convert.ToInt32(this.User.FindFirstValue(ClaimTypes.Name));
            return _renewal.GetMemberNo(memberNoRequest.MemberNo, userId);
        }
    }
}
