
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistance;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
     
            [HttpGet]
            public async Task<ActionResult<List<Activity>>> GetActivities()
            {
                
                return await Mediator.Send(new List.Query());
            }

            [HttpGet("{id}")]

            public async Task<ActionResult<Activity>> GetActivity(Guid id)
            {
               return await Mediator.Send(new Details.Query{Id = id});
            }

            [HttpPost]
            public async Task<IActionResult> CreateActivity(Activity activity){
                return Ok ( await Mediator.Send(new Create.Command{Activity = activity} ));
            }
        
        }
    }