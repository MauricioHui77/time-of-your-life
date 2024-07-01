import { useState, useEffect } from 'react'
import ClockProps from './ClockProps'

function SetClockProps(props) {
  const clockProps = new ClockProps()
  const [fontFamily, setFontFamily] = useState(clockProps.fontFamily)
  const [titleFontColor, setTitleFontColor] = useState(clockProps.titleFontColor)
  const [blinkColons, setBlinkColons] = useState(clockProps.blinkColons)
  const [presets, setPresets] = useState([])
  const [loading, setLoading] = useState(true)
  const [clockTitle, setClockTitle] = useState(clockProps.clockTitle)
  const [errors, setErrors] = useState({
    clockTitle: '',
    fontFamily: '',
    titleFontColor: '',
    clockFontColor: ''
  });
  const [titleFontSize, setTitleFontSize] = useState(clockProps.titleFontSize)
  const [clockFontSize, setClockFontSize] = useState(clockProps.clockFontSize)
  const [clockFontColor, setClockFontColor] = useState(clockProps.clockFontColor)
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    ; (async () => {
      const response = await fetch('clock/presets')
      const data = await response.json()
      setPresets(data)
      setLoading(false)
    })()
  }, [])

  const getProps = () => {
    const props = new ClockProps()
    props.fontFamily = document.getElementById('fontFamily').value
    props.titleFontSize = document.getElementById('titleFontSize').value
    props.clockFontSize = document.getElementById('clockFontSize').value
    props.titleFontColor = document.getElementById('titleFontColor').value
    props.clockFontColor = document.getElementById('clockFontColor').value
    props.blinkColons = document.getElementById('blinkColons').checked
    props.clockTitle = document.getElementById('clockTitle').value
    return props
  }

  const setClockProps = () => {
    const validateErrors = {
      clockTitle: validateTextInput('clockTitle', clockTitle),
      fontFamily: validateTextInput('fontFamily', fontFamily),
      titleFontColor: validateTextInput('titleFontColor', titleFontColor),
      clockFontColor: validateTextInput('clockFontColor', clockFontColor)
    };

    setErrors(validateErrors);

    const isValid = Object.values(validateErrors).every((error) => error === '');

    if (isValid) {
      const setProps = getProps()
      props.setClockProps(setProps)
    }
  }

  const handleKeyDown = (e) => {
    // Validation for Return character
    if (e.key === 'Enter') {
      setClockProps();
    }
  };

  const handleTitleSizeSliderChange = (e) => {
    setTitleFontSize(parseInt(e.target.value));
    setClockProps();
  };

  const handleClockSizeSliderChange = (e) => {
    setClockFontSize(parseInt(e.target.value));
    setClockProps();
  };

  const validateTextInput = (id, value) => {
    if (value.trim() === '') {
      return 'This field cannot be empty.';
    }
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g;
    if (specialCharRegex.test(value)) {
      return 'This field cannot contain special characters.';
    }
    return '';
  };

  const fontSizeOptions = () => {
    return clockProps.availableFontSizes.map((size) => (
      <option key={size} value={size} />
    ));
  }

  const setFontFamilyUI = () => {
    setFontFamily(document.getElementById('fontFamily').value)
    clockProps.fontFamily = document.getElementById('fontFamily').value
  }

  const setTitleFontColurUI = (e) => {
    setTitleFontColor(document.getElementById('titleFontColor').value)
    clockProps.titleFontColor = document.getElementById('titleFontColor').value
  }

  const setClockFontColurUI = (e) => {
    setClockFontColor(document.getElementById('clockFontColor').value)
    clockProps.clockFontColor = document.getElementById('clockFontColor').value
  }

  const setBlinkColonsUI = () => {
    setBlinkColons(document.getElementById('blinkColons').checked)
    clockProps.blinkColons = document.getElementById('blinkColons').checked
    setClockProps()
  }

  const setClockTitleUI = () => {
    setClockTitle(document.getElementById('clockTitle').value)
    clockProps.fontFamily = document.getElementById('clockTitle').value
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const presetsDisplay = (() => {
    console.log(presets)
    return loading ? (
      <div>
        This is a good place to display and use the presets stored on the sever.
      </div>
    ) : (
      <ul>
        {presets.map((p, i) => (
          <li>
            Preset {i + 1}:{' '}
            {`Font: ${p.fontFamily}, Title Color: ${p.titleFontColor}, Title Color: ${p.clockFontColor}, Title Size: ${p.titleFontSize}, Clock Size: ${p.clockFontSize}`}
          </li>
        ))}
      </ul>
    )
  })()

  let errorStyle = {
    color: 'red'
  }

  return (
    <div id="ClockProps" style={{ overflow: 'auto' }}>
      <div
        style={{
          float: 'left',
          width: '40px',
          height: '100%',
          border: '1px solid white',
          fontSize: '20pt',
        }}
      >
        <a
          style={{ cursor: 'pointer' }}
          onClick={toggleExpand}
        >
          {isExpanded ? '-' : '+'}
        </a>
      </div>
      <div>
        <h1>Clock Properties</h1>
        <hr />
      </div>
      {isExpanded && (<div>

        <div>
          <div>
            <h2>Settings</h2>
          </div>
          <div>
            <div>Clock Title</div>
            <div>
              <input
                id="clockTitle"
                value={clockTitle}
                onChange={setClockTitleUI}
                onKeyDown={handleKeyDown}
              />
              <button onClick={setClockProps}>✓</button>
            </div>
            {errors.clockTitle && <div style={errorStyle}>{errors.clockTitle}</div>}
          </div>
          <div>
            <div>Font Family</div>
            <div>
              <input
                id="fontFamily"
                value={fontFamily}
                onChange={setFontFamilyUI}
                onKeyDown={handleKeyDown}
              />
              <button onClick={setClockProps}>✓</button>
            </div>
            {errors.fontFamily && <div style={errorStyle}>{errors.fontFamily}</div>}
          </div>
          <div>
            <div>Title Font Size</div>
            <div>
              <input
                type="range"
                id="titleFontSize"
                min={Math.min(...clockProps.availableFontSizes)}
                max={Math.max(...clockProps.availableFontSizes)}
                step={1}
                value={titleFontSize}
                onChange={handleTitleSizeSliderChange}
                list="slidermarks"
              />
              <datalist id="slidermarks">
                {fontSizeOptions()}
              </datalist>
              <div>{titleFontSize}</div>
            </div>
          </div>
          <div>
            <div>Clock Font Size</div>
            <input
              type="range"
              id="clockFontSize"
              min={Math.min(...clockProps.availableFontSizes)}
              max={Math.max(...clockProps.availableFontSizes)}
              step={1}
              value={clockFontSize}
              onChange={handleClockSizeSliderChange}
              list="slidermarks"
            />
            <datalist id="slidermarks">
              {fontSizeOptions()}
            </datalist>
            <div>{clockFontSize}</div>
          </div>
          <div>
            <div>Title Font Color</div>
            <div>
              <input
                id="titleFontColor"
                value={titleFontColor}
                onChange={(e) => setTitleFontColurUI(e)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={setClockProps}>✓</button>
            </div>
            {errors.titleFontColor && <div style={errorStyle}>{errors.titleFontColor}</div>}
          </div>
          <div>
            <div>Clock Font Color</div>
            <div>
              <input
                id="clockFontColor"
                value={clockFontColor}
                onChange={(e) => setClockFontColurUI(e)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={setClockProps}>✓</button>
            </div>
            {errors.clockFontColor && <div style={errorStyle}>{errors.clockFontColor}</div>}
          </div>
          <div>
            <div>Blink Colons</div>
            <div>
              <input
                id="blinkColons"
                checked={blinkColons}
                type="checkbox"
                onChange={setBlinkColonsUI}
              />
            </div>
          </div>
          <div>
            <div>
              <button
                onClick={() =>
                  alert('This should save the preset to the sever.')
                }
              >
                Save Preset
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h2>Presets</h2>
          <div>{presetsDisplay}</div>
        </div>
      </div>
      )}
    </div>
  )
}

export default SetClockProps
