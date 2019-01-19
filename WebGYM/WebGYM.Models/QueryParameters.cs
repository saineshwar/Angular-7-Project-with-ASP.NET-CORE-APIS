using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGYM.Models
{
    public class QueryParameters
    {
        private const int MaxPageCount = 20;
        public int Page { get; set; } = 1;
        private int _pageCount = MaxPageCount;
        public int PageCount
        {
            get { return _pageCount; }
            set { _pageCount = (value > MaxPageCount) ? MaxPageCount : value; }
        }
        public string Query { get; set; }
        public string OrderBy { get; set; } = "MemberFName";
    }
}
