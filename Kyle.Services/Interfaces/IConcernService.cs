using System.Collections.Generic;
using Kyle.Models.Domain;
using Kyle.Models.Requests;

namespace Kyle.Services.Interfaces
{
    public interface IConcernService
    {
        void Delete(int id);
        int Insert(ConcernAddRequest model);
        List<ConcernDomain> SelectAll();
        ConcernDomain SelectById(int id);
        void Update(ConcernDomain model);
        void Upvote(UpvoteDomain model);
    }
}