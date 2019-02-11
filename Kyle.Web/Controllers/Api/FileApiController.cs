using Kyle.Models.Domain;
using Kyle.Models.Requests;
using Kyle.Models.Responses;
using Kyle.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Kyle.Web.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/file")]
    public class FileApiController : ApiController
    {
        FileService fileService = new FileService();
        string serverFileName = string.Empty;

        public static string GetUntilOrEmpty(string text, string stopAt = ".")
        {
            if (!String.IsNullOrWhiteSpace(text))
            {
                int charLocation = text.IndexOf(stopAt, StringComparison.Ordinal);

                if (charLocation > 0)
                {
                    return text.Substring(0, charLocation);
                }
            }

            return String.Empty;
        }

        [HttpPost]
        [Route("upload")]
        public async Task<HttpResponseMessage> UploadAsync()
        {
            try
            {
                ItemResponse<int> response = new ItemResponse<int>();
                HttpPostedFile postedFile = HttpContext.Current.Request.Files[0];
                int ConcernId = Int32.Parse(GetUntilOrEmpty(postedFile.FileName));
                FileUploadAddRequest model = new FileUploadAddRequest
                {
                    ConcernId = ConcernId,
                    FileName = postedFile.FileName,
                    Size = postedFile.ContentLength,
                    Type = postedFile.ContentType,
                    ModifiedBy = HttpContext.Current.User.Identity.IsAuthenticated ? HttpContext.Current.User.Identity.Name : "anonymous"
                };
                string contentType = Request.Content.Headers.ContentType.MediaType;

                serverFileName = string.Format("{0}_{1}{2}",
                    Path.GetFileNameWithoutExtension(postedFile.FileName),
                    Guid.NewGuid().ToString(),
                    Path.GetExtension(postedFile.FileName));

                model.ServerFileName = serverFileName;

                await SavePostedFile(postedFile);
                response.Item = await fileService.Insert(model);

                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("getall")]
        public HttpResponseMessage GetAll()
        {
            try
            {
                ItemsResponse<UploadedFile> response = new ItemsResponse<UploadedFile>();
                response.Items = fileService.SelectAll();
                ResolveImageUrl(response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        private void ResolveImageUrl(ItemsResponse<UploadedFile> response)
        {
            string serverPath = System.Configuration.ConfigurationManager.AppSettings["fileFolder"];
            foreach (UploadedFile file in response.Items)
            {
                string filePath = Path.Combine(serverPath, file.SystemFileName);
                file.SystemFileName = VirtualPathUtility.ToAbsolute(filePath);
            }
        }

        [HttpGet]
        [Route("getbyconcern/{id:int}")]
        public HttpResponseMessage GetByConcernId(int id)
        {
            try
            {
                ItemResponse<UploadedFile> response = new ItemResponse<UploadedFile>();
                response.Item = fileService.GetByConcernId(id);
                ResolveImageUrlSingle(response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        private void ResolveImageUrlSingle(ItemResponse<UploadedFile> response)
        {
            string serverPath = System.Configuration.ConfigurationManager.AppSettings["fileFolder"];
                string filePath = Path.Combine(serverPath, response.Item.SystemFileName);
                response.Item.SystemFileName = VirtualPathUtility.ToAbsolute(filePath);
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public HttpResponseMessage Delete(int id)
        {
            ItemResponse<UploadedFile> response = new ItemResponse<UploadedFile>();
            response.Item = fileService.Delete(id);
            DeleteFile(response.Item);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        private async Task SavePostedFile(HttpPostedFile postedFile)
        {
            MemoryStream ms = null;
            string rootPath = string.Empty;
            string serverPath = string.Empty;
            string fqn = string.Empty;

            serverPath = System.Configuration.ConfigurationManager.AppSettings["fileFolder"];
            rootPath = HttpContext.Current.Server.MapPath(serverPath);
            fqn = System.IO.Path.Combine(rootPath, serverFileName);

            using (FileStream fs = new FileStream(fqn, FileMode.Append, FileAccess.Write, FileShare.None, bufferSize: postedFile.ContentLength, useAsync: true))
            {
                ms = new MemoryStream();
                postedFile.InputStream.CopyTo(ms);
                await fs.WriteAsync(ms.ToArray(), 0, postedFile.ContentLength);
            }
        }

        private void DeleteFile(UploadedFile uploadedFile)
        {
            string serverPath = System.Configuration.ConfigurationManager.AppSettings["fileFolder"];
            string rootPath = HttpContext.Current.Server.MapPath(serverPath);
            string fqn = System.IO.Path.Combine(rootPath, Path.GetFileName(uploadedFile.SystemFileName));
            File.Delete(fqn);
        }
    }
}
