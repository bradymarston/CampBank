using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Core.Model
{
    public class Cabin
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public ICollection<Kid> Kids { get; set; }

        public Cabin()
        {
            Kids = new Collection<Kid>();
        }
    }
}
