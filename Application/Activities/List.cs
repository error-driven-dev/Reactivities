using System;
using System.Collections.Generic;
using MediatR;
using Domain;
using Persistance;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> {}

        public class ActivityHandler : IRequestHandler<Query, List<Activity>> {
            private readonly DataContext _context;

            public ActivityHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // //example set up for using cancelaation token to cancel long requests -- NEED TO PASS cancellation token from controller
                // try
                // {
                //      cancellationToken.ThrowIfCancellationRequested();
           
                    
                // }
                // catch (Exception ex) when (ex is TaskCanceledException)
                // {
                //     Console.WriteLine("Task was cancelled");
                // }
                
                         return await _context.Activities.ToListAsync();
            }
        }
    }


}