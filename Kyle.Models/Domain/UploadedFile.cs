using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyle.Models.Domain
{
    public class UploadedFile
    {
        public int Id { get; set; }
        public int ConcernId { get; set; }
        public string FileName { get; set; }
        public int Size { get; set; }
        public string Type { get; set; }
        public string SystemFileName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string Modifiedby { get; set; }
    }
}
