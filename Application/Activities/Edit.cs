using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;
using Domain;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest{
            public Activity Activity { get; set; }
        }
    
    public class EditHandler : IRequestHandler<Command>
    {
            private readonly DataContext _context;

            public EditHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
             _context.Activities.Update(request.Activity);
            await  _context.SaveChangesAsync();
             return Unit.Value;
        }
    }

}
