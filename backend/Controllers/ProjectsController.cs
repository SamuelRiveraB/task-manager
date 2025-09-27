using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(ProjectService service) : ControllerBase
{
    private readonly ProjectService _service = service;

    [HttpGet]
    public ActionResult<IEnumerable<Project>> GetAll() => Ok(_service.GetAll());

    [HttpGet("{id}")]
    public ActionResult<Project> Get(int id)
    {
        var project = _service.Get(id);
        return project is null ? NotFound() : Ok(project);
    }

    [HttpPost]
    public ActionResult<Project> Create([FromBody] string name)
    {
        var project = _service.Add(name);
        return CreatedAtAction(nameof(Get), new { id = project.Id }, project);
    }

    [HttpPost("{id}/tasks")]
    public ActionResult<TaskItem> AddTask(int id, [FromBody] string title)
    {
        var task = _service.AddTask(id, title);
        return task is null ? NotFound() : Ok(task);
    }

    [HttpPut("{id}/tasks")]
    public ActionResult ToggleTask(int id, int taskId)
    {
        var success = _service.ToggleTask(id, taskId);
        return success ? Ok() : NotFound();
    }
}