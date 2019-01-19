using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebGYM.Interface;
using WebGYM.Models;

namespace WebGYM.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PeriodController : ControllerBase
    {
        private readonly IPeriodMaster _periodMaster;
        public PeriodController(IPeriodMaster periodMaster)
        {
            _periodMaster = periodMaster;
        }

        // GET: api/Period
        [HttpGet]
        public IEnumerable<PeriodTB> Get()
        {
            try
            {
                return _periodMaster.ListofPeriod();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
