using System.Collections.Generic;
using Kyle.Models.Domain;

namespace Kyle.Services.Interfaces
{
    public interface ICityDepartmentService
    {
        List<CityDepartmentDomain> SelectAll();
    }
}