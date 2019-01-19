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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SchemeDropdownController : ControllerBase
    {

        private readonly ISchemeMaster _schemeMaster;
        public SchemeDropdownController(ISchemeMaster schemeMaster)
        {
            _schemeMaster = schemeMaster;
        }

        // GET: api/SchemeDropdown
        [HttpGet]
        public IEnumerable<SchemeMaster> Get()
        {
            try
            {
                return _schemeMaster.GetActiveSchemeMasterList();
            }
            catch (Exception)
            {
                throw;
            }
        }

       
    }
}
