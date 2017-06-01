using CampBank.Controllers.Resources;
using CampBank.Core;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CampBank.Controllers
{
    [Route("api/[controller]")]
    public class CabinsController : Controller
    {
        private readonly ICabinRepository _cabinRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CabinsController(ICabinRepository cabinRepository, IUnitOfWork unitOfWork)
        {
            _cabinRepository = cabinRepository;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult> GetCabins(bool includeRelated = false)
        {
            return Ok((await _cabinRepository.GetCabinsAsync(includeRelated)).Select(c => CabinResource.FromData(c, includeRelated)));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCabin(int id)
        {
            var cabinInDb = await _cabinRepository.GetCabinAsync(id);

            if (cabinInDb == null)
                return NotFound();

            return Ok(CabinResource.FromData(cabinInDb));
        }

        [HttpPost]
        public async Task<ActionResult> CreateCabin([FromBody]SaveCabinResource newCabin)
        {
            var cabinInDb = newCabin.ToData();
            _cabinRepository.Add(cabinInDb);
            await _unitOfWork.CompleteAsync();
            return Ok(CabinResource.FromData(cabinInDb));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCabin(int id, [FromBody]SaveCabinResource cabin)
        {
            var cabinInDb = await _cabinRepository.GetCabinAsync(id);

            if (cabinInDb == null)
                return NotFound();

            cabin.UpdateData(cabinInDb);

            await _unitOfWork.CompleteAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCabin(int id)
        {
            var cabinInDb = await _cabinRepository.GetCabinAsync(id);

            if (cabinInDb == null)
                return NotFound();

            _cabinRepository.Remove(cabinInDb);

            await _unitOfWork.CompleteAsync();
            return Ok();
        }

        [HttpHead("{id}")]
        public async Task<ActionResult> CabinExists(int id)
        {
            if (!(await _cabinRepository.CabinExistsAsync(id)))
                return NotFound();

            return Ok();
        }
    }
}
