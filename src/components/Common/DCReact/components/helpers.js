class ChartPropertyHelper {
  constructor(component, chart) {
    this.component = component;
    this.chart = chart;
  }

  get props() {
    return this.component.props;
  }

  setProperties(...keys) {
    for (let key of keys) {
      this.setProperty(key);
    }
    return this;
  }

  setContextProperties(...keys) {
    for (let key of keys) {
      this.setContextProperty(key);
    }
    return this;
  }

  setProperty(key) {
    if (this.props.hasOwnProperty(key)) {
      this.chart[key](this.props[key]);
    }
    return this;
  }

  setContextProperty(key) {
    if (this.props.hasOwnProperty(key)) {
      let func = this.props[key];
      if (func) {
        const val = func(this.props.crossfilterContext);
        if (Array.isArray(val)) {
          this.chart[key](...val);
        } else {
          this.chart[key](val);
        }
      }
    }
    return this;
  }
}

export {
  ChartPropertyHelper
};
