using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace CustomerManagement.API.Model
{
    public class Customer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        public static explicit operator Customer(Task<EntityEntry<Customer>> v)
        {
            throw new NotImplementedException();
        }

        [Required]
        public string EmailAddress { get; set; }
        public string Fax { get; set; }
    }
}
