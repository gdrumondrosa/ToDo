using System.Collections.Generic;
using Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class TasksController : ControllerBase {
    private readonly Context _context;

    public TasksController(Context context) {
      _context = context;
    }

    [HttpGet]
    public async System.Threading.Tasks.Task<ActionResult<IEnumerable<Server.Models.Task>>> GetAllAsync() {
      return await _context.Tasks.ToListAsync();
    }

    [HttpGet("{taskId}")]
    public async System.Threading.Tasks.Task<ActionResult<Server.Models.Task>> GetTaskByIdAsync(int taskId) {
      Server.Models.Task task = await _context.Tasks.FindAsync(taskId);

      if(task == null)
        return NotFound();
      return task;
    }

    [HttpPost]
    public async System.Threading.Tasks.Task<ActionResult<Server.Models.Task>> SaveTaskAsync(Server.Models.Task task) {
      await _context.Tasks.AddAsync(task);
      await _context.SaveChangesAsync();

      return Ok();
    }

    [HttpPut]
    public async System.Threading.Tasks.Task<ActionResult> UpdateTaskAsync(Server.Models.Task task) {
      _context.Tasks.Update(task);
      await _context.SaveChangesAsync();

      return Ok();
    }

    [HttpDelete("{taskId}")]
    public async System.Threading.Tasks.Task<ActionResult> DeleteTaskAsync(int taskId) {
      Server.Models.Task task = await _context.Tasks.FindAsync(taskId);
      _context.Remove(task);
      await _context.SaveChangesAsync();
      return Ok();
    }
  }
}