using System;
using System.Collections.Generic;

namespace Ordering.API.Model
{
    public class Order
    {
        public string OrderId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateIssued { get; set; }
        public List<OrderItem> OrderItems {get;set;}

    }
}