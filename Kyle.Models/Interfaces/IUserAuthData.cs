using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyle.Models
{
    public interface IUserAuthData
    {
        int Id { get; }
        string Name { get; }
        IEnumerable<string> Roles { get; }
    }
}
