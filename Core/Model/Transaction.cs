using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Core.Model
{
    public class Transaction
    {
        public int Id { get; set; }
        public TransactionType Type { get; set; }
        public float Amount { get; set; }
        public int KidId { get; set; }
        public Kid Kid { get; set; }
        [Required]
        public string UserName { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
