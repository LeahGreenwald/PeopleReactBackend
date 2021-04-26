using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PeopleReactAndBackend.Data;

namespace PeopleReactAndBackend.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Route("Add")]
        public void Add (Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(person);
        }
        [HttpGet]
        [Route("GetAll")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAllPeople();
        }
        [HttpPost]
        [Route("Delete")]
        public void Delete(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(person.Id);
        }
        [HttpPost]
        [Route("Update")]
        public void Update(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Update(person);
        }
        [HttpPost]
        [Route("DeleteAll")]
        public void DeleteAll(List<Person> people)
        {
            var repo = new PeopleRepository(_connectionString);
            foreach (Person person in people)
            {
                repo.Delete(person.Id);
            }
        }

    }
}
