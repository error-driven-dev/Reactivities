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
                return await _context.Activities.ToListAsync();
            }
        }
    }


}