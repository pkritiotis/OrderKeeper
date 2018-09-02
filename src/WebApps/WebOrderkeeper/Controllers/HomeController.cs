using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebOrderkeeper.Controllers
{
    [Route("api/[controller]")]
    public class ConfigurationController : Controller
    {
        private readonly AppConfiguration _configuration;

        public ConfigurationController(AppConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Configuration()
        {
            return Json(_configuration);
        }
    }
}