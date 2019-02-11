using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [AllowAnonymous]
    [RoutePrefix("api/department")]
    public class CityDepartmentController : ApiController
    {
        ICityDepartmentService _cityDepartmentService;

        public CityDepartmentController(ICityDepartmentService cityDepartmentService)
        {
            _cityDepartmentService = cityDepartmentService;
        }

        [HttpGet]
        [Route]
        public HttpResponseMessage SelectAll()
        {
            try
            {
                ItemsResponse<CityDepartmentDomain> resp = new ItemsResponse<CityDepartmentDomain>();
                resp.Items = _cityDepartmentService.SelectAll();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

    }
}
