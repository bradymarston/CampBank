using CampBank.Controllers.Resources;
using CampBank.Core;
using CampBank.Persistence;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Controllers
{
    [Route("api/[controller]")]
    public class TransactionsController : Controller
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IUnitOfWork _unitOfWork;

        public TransactionsController(ITransactionRepository transactionRepository, IUnitOfWork unitOfWork)
        {
            _transactionRepository = transactionRepository;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult> GetTransactions(int kidId = 0)
        {
            return Ok((await _transactionRepository.GetTransactionsAsync(kidId, includeRelated: true)).Select(t => TransactionResource.FromData(t, includeRelated: true)));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTransaction(int id)
        {
            var transactionInDb = await _transactionRepository.GetTransactionAsync(id, includeRelated: true);

            if (transactionInDb == null)
                return NotFound();

            return Ok(TransactionResource.FromData(transactionInDb, includeRelated: true));
        }

        [HttpPost]
        public async Task<ActionResult> CreateTransaction([FromBody]SaveTransactionResource newTransaction)
        {
            var transactionInDb = newTransaction.ToData();
            transactionInDb.UserName = User.Identity.Name;
            transactionInDb.TimeStamp = DateTime.UtcNow;

            await _transactionRepository.AddAsync(transactionInDb);

            await _unitOfWork.CompleteAsync();
            return Ok(TransactionResource.FromData(transactionInDb, includeRelated: true));
        }

        [HttpHead("{id}")]
        public async Task<ActionResult> TransactionExists(int id)
        {
            if (!(await _transactionRepository.TransactionExistsAsync(id)))
                return NotFound();

            return Ok();
        }
    }
}
