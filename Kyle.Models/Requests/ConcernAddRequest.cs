using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyle.Models.Requests
{
    public class ConcernAddRequest
    {
        public string CityDepartment { get; set; }
        public string FileReference { get; set; }
        public string ConcernTitle { get; set; }
        public string ConcernDescription { get; set; }
        public int ConcernLevel { get; set; }
        public string Status { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
    }
}
