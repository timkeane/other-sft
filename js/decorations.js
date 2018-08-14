var decorations = {
  geo: function() {
    return this.finderApp.filters.getGeo();
  },
  geoType: function(geo) {
    var geoType = {
      council: 'City Council Dist ',
      zip: 'ZIP Code ',
      boro: ''
    }[geo];
    return $('<h2>' + geoType + '</h2>');
  },
  geoName: function(geo) {
    return this.get(this.finderApp.filters.projColumns[geo]);
  },
  getName: function() {
    var geo = this.geo();
    var type = this.geoType(geo);
    var count = this.get('count');
    return $('<div></div>')
      .append(type.append(this.geoName(geo)))
      .append(count + ' project')
      .append(count > 1 ? 's' : '')
      .append(this.getDrawdown());
  },
  getDrawdown: function() {
    var drawdown = new Number(this.get('drawdown'));
    drawdown = drawdown.toLocaleString('en-US', {
      currency: 'USD',
      style: 'currency'
    });
    return $('<div><b>Drawdown:</b> </div>')
      .append(drawdown);
  },
  html: function() {
    return this.getName();
  }
};