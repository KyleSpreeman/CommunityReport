using Kyle.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyle.Models.Domain
{
    public class ConcernDomain : ConcernAddRequest
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string DepartmentName { get; set; }
    }
}
