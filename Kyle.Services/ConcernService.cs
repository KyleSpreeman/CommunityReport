using Kyle.Data;
using Kyle.Data.Providers;
using Kyle.Models.Domain;
using Kyle.Models.Requests;
using Kyle.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyle.Services
{
    public class ConcernService : IConcernService
    {
        IDataProvider _dataProvider;

        public ConcernService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Insert(ConcernAddRequest model)
        {
            int returnVal = 0;
            _dataProvider.ExecuteNonQuery("concern_insert",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    SqlParameter parm = new SqlParameter();
                    parm.ParameterName = "@Id";
                    parm.SqlDbType = System.Data.SqlDbType.Int;
                    parm.Direction = System.Data.ParameterDirection.Output;
                    paramCol.Add(parm);
                    paramCol.AddWithValue("@CityDepartment", model.CityDepartment);
                    if (model.FileReference == null)
                    {
                        paramCol.AddWithValue("@FileReference", System.DBNull.Value);
                    }
                    else
                    {
                        paramCol.AddWithValue("@FileReference", model.FileReference);
                    }
                    paramCol.AddWithValue("@ConcernTitle", model.ConcernTitle);
                    paramCol.AddWithValue("@ConcernDescription", model.ConcernDescription);
                    paramCol.AddWithValue("@ConcernLevel", 1);
                    paramCol.AddWithValue("@Status", "Reported");
                    paramCol.AddWithValue("@Address", model.Address);
                    paramCol.AddWithValue("@City", model.City);
                    paramCol.AddWithValue("@State", model.State);
                    paramCol.AddWithValue("@Zip", model.Zip);
                    if (model.Longitude == null)
                    {
                        paramCol.AddWithValue("@Longitude", System.DBNull.Value);
                    }
                    else
                    {
                        paramCol.AddWithValue("@Longitude", model.Longitude);
                    }
                    if (model.Latitude == null)
                    {
                        paramCol.AddWithValue("@Latitude", System.DBNull.Value);
                    }
                    else
                    {
                        paramCol.AddWithValue("@Latitude", model.Latitude);
                    }
                },
                returnParameters: delegate (SqlParameterCollection paramCol)
                {
                    returnVal = (int)paramCol["@Id"].Value;
                }
            );
            return returnVal;
        }
        public List<ConcernDomain> SelectAll()
        {
            var result = new List<ConcernDomain>();
            _dataProvider.ExecuteCmd(
                "concern_select_all",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    ConcernDomain model = new ConcernDomain();
                    int index = 0;
                    model.Id = reader.GetSafeInt32(index++);
                    model.FileReference = reader.GetSafeString(index++);
                    model.ConcernTitle = reader.GetSafeString(index++);
                    model.ConcernDescription = reader.GetSafeString(index++);
                    model.ConcernLevel = reader.GetSafeInt32(index++);
                    model.Status = reader.GetSafeString(index++);
                    model.Address = reader.GetSafeString(index++);
                    model.City = reader.GetSafeString(index++);
                    model.State = reader.GetSafeString(index++);
                    model.Zip = reader.GetSafeString(index++);
                    model.Longitude = reader.GetSafeString(index++);
                    model.Latitude = reader.GetSafeString(index++);
                    model.CreatedDate = reader.GetSafeDateTime(index++);
                    model.DepartmentName = reader.GetSafeString(index++);
                    result.Add(model);
                }
            );
            return result;
        }
        public ConcernDomain SelectById(int id)
        {
            ConcernDomain model = new ConcernDomain();
            _dataProvider.ExecuteCmd(
                "concern_select_by_id",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    model.Id = reader.GetSafeInt32(index++);
                    model.FileReference = reader.GetSafeString(index++);
                    model.ConcernTitle = reader.GetSafeString(index++);
                    model.ConcernDescription = reader.GetSafeString(index++);
                    model.ConcernLevel = reader.GetSafeInt32(index++);
                    model.Status = reader.GetSafeString(index++);
                    model.Address = reader.GetSafeString(index++);
                    model.City = reader.GetSafeString(index++);
                    model.State = reader.GetSafeString(index++);
                    model.Zip = reader.GetSafeString(index++);
                    model.Longitude = reader.GetSafeString(index++);
                    model.Latitude = reader.GetSafeString(index++);
                    model.CreatedDate = reader.GetSafeDateTime(index++);
                    model.DepartmentName = reader.GetSafeString(index++);
                }
            );
            return model;
        }
        public void Update(ConcernDomain model)
        {
            _dataProvider.ExecuteNonQuery(
                "concern_update",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", model.Id);
                    paramCol.AddWithValue("@CityDepartment", model.CityDepartment);
                    paramCol.AddWithValue("@ConcernTitle", model.ConcernTitle);
                    paramCol.AddWithValue("@ConcernDescription", model.ConcernDescription);
                    paramCol.AddWithValue("@ConcernLevel", model.ConcernLevel);
                    paramCol.AddWithValue("@Status", model.Status);
                    paramCol.AddWithValue("@Address", model.Address);
                    paramCol.AddWithValue("@City", model.City);
                    paramCol.AddWithValue("@State", model.State);
                    paramCol.AddWithValue("@Zip", model.Zip);
                    paramCol.AddWithValue("@Longitude", model.Longitude);
                    paramCol.AddWithValue("@Latitude", model.Latitude);
                }
            );
        }

        public void Upvote(UpvoteDomain model)
        {
            _dataProvider.ExecuteNonQuery(
                "concern_upvote",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", model.Id);
                }
            );
        }
        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery(
                "concern_delete",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                }
            );
        }

    }
}
