using System;
using System.Collections.Generic;
using System.Linq;
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
    public class AllActivePlanMasterController : ControllerBase
    {

        private readonly IPlanMaster _planMaster;
        public AllActivePlanMasterController(IPlanMaster planMaster)
        {
            _planMaster = planMaster;
        }

        // GET: api/AllActivePlanMaster/5
        [HttpGet("{id}", Name = "GetAllActivePlan")]
        public List<ActivePlanModel> Get(int? id)
        {
            try
            {
                if (id != null)
                {
                    return _planMaster.GetActivePlanMasterList(id);
                }
                else
                {
                    return new List<ActivePlanModel>()
                {
                    new ActivePlanModel()
                    {
                        PlanID = string.Empty,
                        PlanName = ""
                    }
                };
                }
            }
            catch (Exception)
            {

                throw;
            }
           
        }


    }
}
