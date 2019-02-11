using Kyle.Models.Domain;
using Kyle.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyle.Services
{
    public class FileService
    {
        public string connString = "Data Source=letsgo.cjfpzb41cdh8.us-east-2.rds.amazonaws.com;Initial Catalog=AddiHacks;User ID=KSpreeman;Password=Summer2015";
        public List<UploadedFile> SelectAll()
        {
            List<UploadedFile> fileList = new List<UploadedFile>();
            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("UploadedFile_SelectAll", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        UploadedFile file = this.Mappper(reader);
                        fileList.Add(file);
                    }
                }
                conn.Close();
            }
            return fileList;
        }

        public UploadedFile GetByConcernId(int id)
        {
            UploadedFile model = new UploadedFile();
            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("UploadedFile_SelectByConcernId", conn))
                {
                    cmd.Parameters.AddWithValue("@ConcernId", id);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        model = this.Mappper(reader);
                    }
                }
                conn.Close();
            }
            return model;
        }

        public async Task<int> Insert(FileUploadAddRequest model)
        {
            int id = 0;
            using (SqlConnection conn = new SqlConnection(connString))
            {
                await conn.OpenAsync();
                using (SqlCommand cmd = new SqlCommand("UploadedFile_Insert", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ConcernId", model.ConcernId);
                    cmd.Parameters.AddWithValue("@FileName", model.FileName);
                    cmd.Parameters.AddWithValue("@Size", model.Size);
                    cmd.Parameters.AddWithValue("@Type", model.Type);
                    cmd.Parameters.AddWithValue("@SystemFileName", model.ServerFileName);
                    cmd.Parameters.AddWithValue("@ModifiedBy", model.ModifiedBy);

                    SqlParameter parm = new SqlParameter("@Id", SqlDbType.Int);
                    parm.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(parm);

                    await cmd.ExecuteNonQueryAsync().ContinueWith(_ => conn.Close());
                    id = (int)cmd.Parameters["@Id"].Value;
                }
            }
            return id;
        }

        public UploadedFile Delete(int id)
        {
            UploadedFile uploadedFile = new UploadedFile();
            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("UploadedFile_Delete", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                        uploadedFile = Mappper(reader);
                }
                conn.Close();
            }
            return uploadedFile;
        }

        private UploadedFile Mappper(SqlDataReader reader)
        {
            int index = 0;
            UploadedFile file = new UploadedFile();
            file.Id = reader.GetInt32(index++);
            file.ConcernId = reader.GetInt32(index++);
            file.FileName = reader.GetString(index++);
            file.Size = reader.GetInt32(index++);
            file.Type = reader.GetString(index++);
            file.SystemFileName = reader.GetString(index++);
            file.CreatedDate = reader.GetDateTime(index++);
            file.ModifiedDate = reader.GetDateTime(index++);
            file.Modifiedby = reader.GetString(index++);

            return file;
        }
    }
}
