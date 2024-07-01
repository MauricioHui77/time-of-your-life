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
            var existingPreset = _presets.FirstOrDefault(x => x.ClockTitle.Equals(preset.ClockTitle, StringComparison.OrdinalIgnoreCase));
            if (existingPreset != null)
            {
                return Conflict($"A preset with the title '{preset.ClockTitle}' already exists.");
            }

            preset.PresetId = Guid.NewGuid();
            _presets.Add(preset);
            return Ok(preset);
        }
        return BadRequest(ModelState);
    }

    [HttpGet("presets/searchByTitleId")]
    public ActionResult<IEnumerable<ClockProps>> GetPresetsByTitleId([FromQuery] string titleId)
    {
        if (string.IsNullOrEmpty(titleId))
        {
            return BadRequest("The Title is required.");
        }

        var presetsFound = _presets.Where(x => x.ClockTitle.Contains(titleId, StringComparison.OrdinalIgnoreCase)).ToArray();

        if (!presetsFound.Any())
        {
            return NotFound("No presets were found with the title provided.");
        }

        return Ok(presetsFound);
    }
}
