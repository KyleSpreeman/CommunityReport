using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyle.Models.Requests
{
    public class FileUploadAddRequest
    {
        public int ConcernId { get; set; }
        public string FileName { get; set; }
        public int Size { get; set; }
        public string Type { get; set; }
        public string ServerFileName { get; set; }
        public string ModifiedBy { get; set; }
    }
}
