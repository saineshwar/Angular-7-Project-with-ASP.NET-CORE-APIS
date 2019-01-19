using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGYM.ViewModels
{
    public class PlanMasterViewModel
    {
        public int PlanID { get; set; }
        public string PlanName { get; set; }
        public decimal? PlanAmount { get; set; }
        public decimal? ServicetaxAmount { get; set; }
        public string ServiceTax { get; set; }
        public bool RecStatus { get; set; }
        public int? SchemeID { get; set; }
        public int? PeriodID { get; set; }
        public decimal? TotalAmount { get; set; }
        public string ServicetaxNo { get; set; }
    }


    public class PlanMasterDisplayViewModel
    {
        public int PlanID { get; set; }
        public string PlanName { get; set; }
        public decimal? PlanAmount { get; set; }
        public decimal? ServicetaxAmount { get; set; }
        public string ServiceTax { get; set; }
        public bool RecStatus { get; set; }
        public int? SchemeID { get; set; }
        public string SchemeName { get; set; }
        public int? PeriodID { get; set; }
        public string Text { get; set; }
        public decimal? TotalAmount { get; set; }
        public string ServicetaxNo { get; set; }
    }

    public class ActivePlanModel
    {
        public string PlanID { get; set; }
        public string PlanName { get; set; }
    }
}
