using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Core.Model
{
    [Table("Kids")]
    public class Kid
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int CabinId { get; set; }
        public Cabin Cabin { get; set; }
        public ICollection<Transaction> Transactions { get; set; }

        public float Balance
        {
            get
            {
                return Transactions.Sum(t => t.Amount);
            }
        }

        public Kid()
        {
            Transactions = new Collection<Transaction>();
        }
    }
}
