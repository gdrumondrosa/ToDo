using Microsoft.EntityFrameworkCore;

namespace Server.Models {
  public class Context : DbContext {
    public Context(DbContextOptions<Context> options) : base(options) {
      
    }

    public DbSet<Task> Tasks { get; set; }
  }
}