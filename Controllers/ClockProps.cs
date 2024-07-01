namespace time.Controllers;

public class ClockProps {
  public Guid PresetId {get; set;}
  public string FontFamily {get; set;} = "courier";
  public int[] AvailableFontSizes {get; }  = new[] { 12, 24, 48, 64 };
  public int TitleFontSize {get; set;} = 64;
  public int ClockFontSize {get ; set;} = 48;
  public bool BlinkColons {get; set;} = true;
  public string TitleFontColor {get; set;} = "black";
  public string ClockFontColor {get; set;} = "black";
  public string ClockTitle {get; set;} = "Time of your life";
}