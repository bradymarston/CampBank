using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CampBank.Core.Model;

namespace CampBank.Controllers.Resources
{
    public class SaveCabinResource
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Cabin ToData()
        {
            return new Cabin
            {
                Name = Name
            };
        }

        public void UpdateData(Cabin data)
        {
            data.Name = Name;
        }
    }
}
