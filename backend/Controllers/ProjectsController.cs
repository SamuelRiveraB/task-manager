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
    [HttpPost]
    public ActionResult<Project> Create([FromBody] CreateProjectDto dto)
    {
        var project = _service.Add(dto.Name);
        return CreatedAtAction(nameof(Get), new { id = project.Id }, project);
    }

    [HttpPost("{id}/tasks")]
    public ActionResult<TaskItem> AddTask(int id, [FromBody] CreateTaskDto dto)
    {
        var task = _service.AddTask(id, dto.Title);
        return task is null ? NotFound() : Ok(task);
    }

    [HttpPut("{id}/tasks/{taskId}/toggle")]   // ✅ route fix
    public ActionResult ToggleTask(int id, int taskId)
    {
        var success = _service.ToggleTask(id, taskId);
        return success ? Ok() : NotFound();
    }
}