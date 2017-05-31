using System;
using System.Threading.Tasks;

namespace CampBank.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}