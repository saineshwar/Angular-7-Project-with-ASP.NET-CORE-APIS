using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
    public class GetTotalAmountController : ControllerBase
    {
        private readonly IPlanMaster _planMaster;
        public GetTotalAmountController(IPlanMaster planMaster)
        {
            _planMaster = planMaster;
        }
       

        // POST: api/GetTotalAmount
        [HttpPost]
        public string Post([FromBody] AmountRequestViewModel amountRequest)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    return _planMaster.GetAmount(amountRequest.PlanId, amountRequest.SchemeId);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

      
    }
}
