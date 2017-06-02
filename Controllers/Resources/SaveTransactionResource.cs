using CampBank.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Controllers.Resources
{
    public class SaveTransactionResource
    {
        public TransactionType Type { get; set; }
        public float Amount { get; set; }
    }
}
