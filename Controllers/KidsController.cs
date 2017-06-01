using CampBank.Controllers.Resources;
using CampBank.Core;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;

namespace CampBank.Controllers
{
    [Route("api/[controller]")]
    public class KidsController : Controller
    {
        private readonly IKidRepository _kidRepository;
        private readonly ICabinRepository _cabinRepository;
        private readonly IUnitOfWork _unitOfWork;

        public KidsController(IKidRepository kidRepository, ICabinRepository cabinRepository, IUnitOfWork unitOfWork)
        {
            _kidRepository = kidRepository;
            _cabinRepository = cabinRepository;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult> GetKids()
        {
            return Ok((await _kidRepository.GetKidsAsync(includeRelated: true)).Select(c => KidResource.FromData(c, includeRelated: true)));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetKid(int id)
        {
            var kidInDb = await _kidRepository.GetKidAsync(id, includeRelated: true);

            if (kidInDb == null)
                return NotFound();

            return Ok(KidResource.FromData(kidInDb, includeRelated: true));
        }

        [HttpPost]
        public async Task<ActionResult> CreateKid([FromBody]SaveKidResource newKid)
        {
            if (!(await _cabinRepository.CabinExistsAsync(newKid.CabinId)))
                return BadRequest();

            var kidInDb = newKid.ToData();
            _kidRepository.Add(kidInDb);

            await _unitOfWork.CompleteAsync();

            kidInDb = await _kidRepository.GetKidAsync(kidInDb.Id, includeRelated: true);

            return Ok(KidResource.FromData(kidInDb, includeRelated: true));
        }

        [HttpPut("{id}/balance/{balance}")]
        public async Task<ActionResult> SetBalance(int id, float balance)
        {
            var kidInDb = await _kidRepository.GetKidAsync(id);

            if (kidInDb == null)
                return NotFound();

            kidInDb.Balance = balance;

            await _unitOfWork.CompleteAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateKid(int id, [FromBody]SaveKidResource kid)
        {
            if (!(await _cabinRepository.CabinExistsAsync(kid.CabinId)))
                return BadRequest();

            var kidInDb = await _kidRepository.GetKidAsync(id);

            if (kidInDb == null)
                return NotFound();

            await kid.UpdateDataAsync(kidInDb, _cabinRepository);

            await _unitOfWork.CompleteAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteKid(int id)
        {
            var kidInDb = await _kidRepository.GetKidAsync(id);

            if (kidInDb == null)
                return NotFound();

            _kidRepository.Remove(kidInDb);

            await _unitOfWork.CompleteAsync();
            return Ok();
        }

        [HttpHead("{id}")]
        public async Task<ActionResult> KidExists(int id)
        {
            if (!(await _kidRepository.KidExistsAsync(id)))
                return NotFound();

            return Ok();
        }
    }
}
