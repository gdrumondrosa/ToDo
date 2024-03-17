using Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class TasksController : ControllerBase {
    private readonly Context _context;

    public TasksController(Context context) {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Task>>> GetAllAsync() {
      return await _context.Tasks.ToListAsync();
    }

    [HttpGet("{taskId}")]
    public async Task<ActionResult<Task>> GetTaskByIdAsync(int taskId) {
      Task task = await _context.Tasks.FindAsync(taskId);

      if(task = null)
        return NotFound();
      return task;
    }

    [HttpPost]
    public async Task<ActionResult<Task>> SaveTaskAsync(Task task) {
      await _context.Tasks.AddAsync(task);
      await _context.SaveChangesAsync();

      return Ok();
    }

    [HttpPut]
    public async Task<ActionResult> UpdateTaskAsync(Task task) {
      _context.Tasks.Update(task);
      await _context.SaveChangesAsync();

      return Ok();
    }

    [HttpDelete("{taskId}")]
    public async Task<ActionResult> DeleteTaskAsync(int taskId) {
      Task task = await _context.Tasks.FindAsync(taskId);
      _context.Remove(pessoa);
      await _context.SaveChangesAsync();
      return Ok();
    }
  }
}