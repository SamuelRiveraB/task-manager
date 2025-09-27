using backend.Models;

namespace backend.Services;

public class ProjectService
{
    private readonly List<Project> _projects = [];
    private int _nextProjectId = 1;
    private int _nextTaskId = 1;

    public IEnumerable<Project> GetAll() => _projects;
    public Project? Get(int id) => _projects.FirstOrDefault(p => p.Id == id);
    public Project Add(string name)
    {
        var project = new Project { Id = _nextProjectId++, Name = name};
        _projects.Add(project);
        return project;
    }
    public TaskItem? AddTask(int projectId, string title)
    {
        var project = Get(projectId);
        if (project is null) return null;

        var task = new TaskItem { Id = _nextTaskId++, Title = title, IsCompleted = false};
        project.Tasks.Add(task);
        return task;
    }
    
    public bool ToggleTask(int projectId, int taskId)
    {
        var project = Get(projectId);
        var task = project?.Tasks.FirstOrDefault(t => t.Id == taskId);
        if (task == null) return false;

        task.IsCompleted = !task.IsCompleted;
        return true;
    }
}