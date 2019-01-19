using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using WebGYM.Interface;
using WebGYM.Models;

namespace WebGYM.Concrete
{
    public class SchemeMasterConcrete : ISchemeMaster
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public SchemeMasterConcrete(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            _configuration = config;
        }

        public List<SchemeMaster> GetSchemeMasterList()
        {
            var result = (from scheme in _context.SchemeMaster
                          select scheme).ToList();

            return result;
        }

        public SchemeMaster GetSchemeMasterbyId(int schemeId)
        {
            var result = (from scheme in _context.SchemeMaster
                          where scheme.SchemeID == schemeId
                          select scheme).FirstOrDefault();

            return result;
        }

        public bool CheckSchemeNameExists(string schemeName)
        {
            var result = (from scheme in _context.SchemeMaster
                          where scheme.SchemeName == schemeName
                          select scheme).Count();

            return result > 0 ? true : false;
        }

        public bool AddSchemeMaster(SchemeMaster schemeMaster)
        {
            //var connectionString = _configuration.GetConnectionString("DatabaseConnection");

            _context.SchemeMaster.Add(schemeMaster);
            var result = _context.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool UpdateSchemeMaster(SchemeMaster schemeMaster)
        {
            _context.Entry(schemeMaster).Property(x => x.Status).IsModified = true;
            var result = _context.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool DeleteScheme(int schemeId)
        {
            var schememaster = (from scheme in _context.SchemeMaster
                                where scheme.SchemeID == schemeId
                                select scheme).FirstOrDefault();
            if (schememaster != null)
            {
                _context.SchemeMaster.Remove(schememaster);
                var result = _context.SaveChanges();

                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public List<SchemeMaster> GetActiveSchemeMasterList()
        {
            var result = (from scheme in _context.SchemeMaster
                          where scheme.Status == true
                select scheme).ToList();

            return result;

        }
    }
}
