using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    public class RenewalController : ControllerBase
    {
        private readonly IRenewal _renewal;
        private readonly IPaymentDetails _paymentDetails;
        private readonly IPlanMaster _planMaster;
        public RenewalController(IRenewal renewal, IPaymentDetails paymentDetails, IPlanMaster planMaster)
        {
            _renewal = renewal;
            _paymentDetails = paymentDetails;
            _planMaster = planMaster;
        }
     
        // GET: api/Renewal/5
        [HttpGet("{memberNo}", Name = "GetRenewal")]
        public RenewalViewModel Get(string memberNo)
        {
            var userId = Convert.ToInt32(this.User.FindFirstValue(ClaimTypes.Name));
            return _renewal.GetMemberNo(memberNo, userId);
        }

        // POST: api/Renewal
        [HttpPost]
        public HttpResponseMessage Post([FromBody] RenewalViewModel renewalViewModel)
        {
            if (_renewal.CheckRenewalPaymentExists(renewalViewModel.NewDate,renewalViewModel.MemberId))
            {
                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    ReasonPhrase = "Already Renewed"

                };
                return response;
            }
            else
            {
                int cmp = renewalViewModel.NewDate.CompareTo(renewalViewModel.NextRenwalDate);
                var userId = this.User.FindFirstValue(ClaimTypes.Name);

                if (cmp > 0)
                {
                    var months = _planMaster.GetPlanMonthbyPlanId(renewalViewModel.PlanID);
                    var calculatedNextRenewalDate = renewalViewModel.NewDate.AddMonths(months).AddDays(-1);
                    renewalViewModel.NextRenwalDate = calculatedNextRenewalDate;

                    renewalViewModel.Createdby = Convert.ToInt32(userId);
                    if (_paymentDetails.RenewalPayment(renewalViewModel))
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.OK,
                            ReasonPhrase = "Renewed Successfully"

                        };
                        return response;
                    }
                    else
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.InternalServerError,
                            ReasonPhrase = "Renewal Failed"

                        };
                        return response;
                    }
                }

                if (cmp < 0)
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        Content = new StringContent("Invalid Date")
                    };
                    return response;
                }
            }

            var responseMessage = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.BadRequest,
                Content = new StringContent("Something went wrong")
            };
            return responseMessage;
        }
    }
}
