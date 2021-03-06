
using System.Threading;
using System.Net.Mail;
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
            public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken token)
            {
                
                return await Mediator.Send(new List.Query(), token);
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

            [HttpPut("{id}")]
            //activity passed from body may not have the id, so will have to get from param root
            public async Task<IActionResult> EditActivity(Guid id, Activity activity){

                activity.Id = id;
                return Ok( await Mediator.Send(new Edit.Command{Activity = activity}));
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteActivity(Guid id) {
                return Ok(await Mediator.Send( new Delete.Command{Id = id}));
            }
        
        }
    }