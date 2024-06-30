using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace time.Controllers;

[ApiController]
[Route("[controller]")]
public class ClockController : ControllerBase
{
    private static List<ClockProps> _presets = new List<ClockProps>() { new() };

    private readonly ILogger<ClockController> _logger;

    public ClockController(ILogger<ClockController> logger)
    {
        _logger = logger;
    }

    [HttpGet, Route("presets")]
    public IEnumerable<ClockProps> GetPresets()
    {
        return _presets.ToArray();
    }

    [HttpPost("presets")]
    public IActionResult AddPreset([FromBody] ClockProps preset)
    {
        if (ModelState.IsValid)
        {
            _presets.Add(preset);
            return Ok(preset);
        }
        return BadRequest(ModelState);
    }
}
