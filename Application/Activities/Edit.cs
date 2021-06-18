using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;
using Domain;
using AutoMapper;

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
            private readonly IMapper _mapper;

            public EditHandler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {

            var activity = await _context.Activities.FindAsync(request.Activity.Id);
            //1. check if each property was sent by controller
            //activity.Title = request.Activity.Title ?? activity.Title;

            _mapper.Map(request.Activity, activity);


            //1. overwrite entire object , which requires the primary key
            //  _context.Activities.Update(request.Activity);
             await  _context.SaveChangesAsync();
             return Unit.Value;

             
        }
    }

}}
