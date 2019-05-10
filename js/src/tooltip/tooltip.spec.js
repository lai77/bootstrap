import Tooltip from './tooltip'
import { makeArray } from '../util/index'

/** Test helpers */
import { getFixture, clearFixture } from '../../tests/helpers/fixture'

describe('Tooltip', () => {
  let fixtureEl

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()

    const tooltipList = makeArray(document.querySelectorAll('.tooltip'))

    tooltipList.forEach(tooltipEl => {
      document.body.removeChild(tooltipEl)
    })
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(Tooltip.VERSION).toEqual(jasmine.any(String))
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(Tooltip.Default).toEqual(jasmine.any(Object))
    })
  })

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Tooltip.NAME).toEqual(jasmine.any(String))
    })
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Tooltip.DATA_KEY).toEqual('bs.tooltip')
    })
  })

  describe('Event', () => {
    it('should return plugin events', () => {
      expect(Tooltip.Event).toEqual(jasmine.any(Object))
    })
  })

  describe('EVENT_KEY', () => {
    it('should return plugin event key', () => {
      expect(Tooltip.EVENT_KEY).toEqual('.bs.tooltip')
    })
  })

  describe('DefaultType', () => {
    it('should return plugin default type', () => {
      expect(Tooltip.DefaultType).toEqual(jasmine.any(Object))
    })
  })

  describe('enable', () => {
    it('should enable a tooltip', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltip.enable()

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(document.querySelector('.tooltip')).toBeDefined()
        done()
      })

      tooltip.show()
    })
  })

  describe('disable', () => {
    it('should disable tooltip', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltip.disable()

      tooltipEl.addEventListener('show.bs.tooltip', () => {
        throw new Error('should not show a disabled tooltip')
      })

      tooltip.show()

      setTimeout(() => {
        expect().nothing()
        done()
      }, 10)
    })
  })

  describe('toggleEnabled', () => {
    it('should toggle enabled', () => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      expect(tooltip._isEnabled).toEqual(true)

      tooltip.toggleEnabled()

      expect(tooltip._isEnabled).toEqual(false)
    })
  })

  describe('toggle', () => {
    it('should do nothing if disabled', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltip.disable()

      tooltipEl.addEventListener('show.bs.tooltip', () => {
        throw new Error('should not show a disabled tooltip')
      })

      tooltip.toggle()

      setTimeout(() => {
        expect().nothing()
        done()
      }, 10)
    })

    it('should show a tooltip', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(document.querySelector('.tooltip')).toBeDefined()
        done()
      })

      tooltip.toggle()
    })

    it('should call toggle and show the tooltip when trigger is "click"', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        trigger: 'click'
      })

      spyOn(tooltip, 'toggle').and.callThrough()

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(tooltip.toggle).toHaveBeenCalled()
        done()
      })

      tooltipEl.click()
    })

    it('should hide a tooltip', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        tooltip.toggle()
      })

      tooltipEl.addEventListener('hidden.bs.tooltip', () => {
        expect(document.querySelector('.tooltip')).toBeNull()
        done()
      })

      tooltip.toggle()
    })

    it('should call toggle and hide the tooltip when trigger is "click"', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        trigger: 'click'
      })

      spyOn(tooltip, 'toggle').and.callThrough()

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        tooltipEl.click()
      })

      tooltipEl.addEventListener('hidden.bs.tooltip', () => {
        expect(tooltip.toggle).toHaveBeenCalled()
        done()
      })

      tooltipEl.click()
    })
  })
})