new nyc.ol.FinderApp({
  title: 'Sandy Funding Tracker',
  geoclientUrl: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
  facilityTabTitle: 'Project Count',
  facilityUrl: CARTO_URL + encodeURIComponent('select ST_AsText(g.the_geom_webmercator) wkt_geom, s.council_district, count(council_district) count from single_family_data s, council g where s.council_district = g.cd group by s.council_district, g.the_geom_webmercator'),
  facilityFormat: new nyc.ol.format.CartoSql(),
  facilityStyle: style,
  filterChoiceOptions: [{
    title: 'Managing Agency',
    choices: [
      {name: 'agency_name', values: ['Department of Environmental Protection'], label: 'Department of Environmental Protection'},
      {name: 'agency_name', values: ['Housing Preservation and Development'], label: 'Housing Preservation and Development'},
      {name: 'agency_name', values: ['Department of Design and Construction'], label: 'Department of Design and Construction'}
    ]
  }, {
    title: 'Occupancy Type',
    choices: [
      {name: 'occupancy_type', values: ['Owner-Occupied'], label: 'Owner-Occupied'},
      {name: 'occupancy_type', values: ['Owner-Occupied, with rented units also in the building'], label: 'Owner-Occupied, with rented units also in the building'},
      {name: 'occupancy_type', values: ['Renter-Occupied'], label: 'Renter-Occupied'},
      {name: 'occupancy_type', values: [''], label: 'Not defined'}
    ]
  }],
  facilitySearch: false,
  decorations: [decorations]
});

finderApp.pager.pageSize = 20;
finderApp.layer.setZIndex(100);

$(document).ready(function() {
  var collapsible = new nyc.Collapsible({
    target: $('<div id="group"></div>'),
    title: 'Group by',
    content: geoGroup.getContainer()
  });

  geoGroup.on('change', finderApp.filters.filter, finderApp.filters);
  $('#filters').prepend(collapsible.getContainer());
  finderApp.tabs.open('#filters');

  finderApp.map.addLayer(geoGroup.layers.council);
  finderApp.map.addLayer(geoGroup.layers.zip);
  finderApp.map.addLayer(geoGroup.layers.boro);
});