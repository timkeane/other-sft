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
    return $('<b>' + geoType + '</b>');
  },
  geoName: function(geo) {
    return this.get(this.finderApp.filters.projColumns[geo]);
  },
  getName: function() {
    var geo = this.geo();
    var type = this.geoType(geo);
    return $('<div></div>')
      .append(type.append(this.geoName(geo)))
      .append('<br>' + this.get('count') + ' projects');
  },
  html: function() {
    return this.getName();
  }
};