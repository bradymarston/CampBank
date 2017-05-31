using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Core.Model
{
    public class Kid
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public float Balance { get; set; }
        public int CabinId { get; set; }
        public Cabin Cabin { get; set; }
    }
}
