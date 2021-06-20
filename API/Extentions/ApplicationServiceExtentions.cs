using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistance;
using Application.Activities;
using Application.Core;

namespace API.Extentions
{
    public static class ApplicationServiceExtentions
    {
 //static class do config has to be passed in from caller
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){

               
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opts => {
                opts.AddPolicy("CorsDevPolicy", policy => {
                    policy.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader()
                    .WithOrigins("http://localhost:3000");
                });
                
            });
            
          services.AddMediatR(typeof(List.ActivityHandler).Assembly);
          services.AddAutoMapper(typeof(MappingProfiles).Assembly);

          return services;
            
        }
    }
}