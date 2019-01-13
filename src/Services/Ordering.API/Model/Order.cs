using System;
using System.Collections.Generic;

namespace Ordering.API.Model
{
    public class Order
    {
        public string Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateIssued { get; set; }
        public int CustomerId { get; set; }
        public List<OrderItem> OrderItems {get;set;}
        public double  TotalAmount { get; set; }

    }
}