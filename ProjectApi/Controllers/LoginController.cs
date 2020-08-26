using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepoDemo;

namespace ProjectApi.Controllers
{
    [Route("api/Login/{username}/{password}")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public ApiResponse Login(string UserName, string Password)
        {
            RepoDemo.MeetingDemoEntities DB = new RepoDemo.MeetingDemoEntities();
            var Obj = DB.Usp_Login(UserName, Password).ToList<Usp_Login_Result>().FirstOrDefault();
            if (Obj.Status == 0)
                return new ApiResponse { Status = "Invalid", Message = "Invalid User." };
            if (Obj.Status == -1)
                return new ApiResponse { Status = "Inactive", Message = "User Inactive." };
            else
                return new ApiResponse { Status = "Success", Message = UserName };
        }
    }
}
