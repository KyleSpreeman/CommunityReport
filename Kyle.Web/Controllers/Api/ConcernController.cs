using Kyle.Models.Domain;
using Kyle.Models.Requests;
using Kyle.Models.Responses;
using Kyle.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Kyle.Web.Controllers.Api
{
    [AllowAnonymous]
    [RoutePrefix("api/concern")]
    public class ConcernController : ApiController
    {
        private IConcernService _concernService;
        
        public ConcernController(IConcernService concernService)
        {
            _concernService = concernService;
        }

        [HttpPost]
        [Route]
        public HttpResponseMessage Insert(ConcernAddRequest model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    ItemResponse<int> resp = new ItemResponse<int>();
                    resp.Item = _concernService.Insert(model);
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route]
        public HttpResponseMessage SelectAll()
        {
            try
            {
                ItemsResponse<ConcernDomain> resp = new ItemsResponse<ConcernDomain>();
                resp.Items = _concernService.SelectAll();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public HttpResponseMessage SelectById(int id)
        {
            try
            {
                ItemResponse<ConcernDomain> resp = new ItemResponse<ConcernDomain>();
                resp.Item = _concernService.SelectById(id);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {;
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage Update(ConcernDomain model)
        {
            if (ModelState.IsValid)
            {
                SuccessResponse resp = new SuccessResponse();
                _concernService.Update(model);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpPut]
        [Route("upvote")]
        public HttpResponseMessage Upvote(UpvoteDomain model)
        {
            if (ModelState.IsValid)
            {
                SuccessResponse resp = new SuccessResponse();
                _concernService.Upvote(model);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    SuccessResponse resp = new SuccessResponse();
                    _concernService.Delete(id);
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);

            }
        }

    }
}
