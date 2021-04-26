using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PeopleReactAndBackend.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;
        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void Add (Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public List<Person> GetAllPeople()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }
        public void Delete (int id)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
        }
        public void Update(Person person)
        {
            using var ctx = new PeopleDbContext(_connectionString);
            ctx.People.Attach(person);
            ctx.Entry(person).State = EntityState.Modified;
            ctx.SaveChanges();
        }
       
    }
}
