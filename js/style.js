function radius(count) {
  if (count <= 10) return 6;
  if (count > 10 && count <= 100) return 7;
  if (count > 100 && count <= 500) return 9;
  if (count > 500 && count <= 1000) return 13;
  if (count > 1000) return 21;
};

function style(feature, resolution) {
  var count = feature.get('count');
  var rad = radius(count);
  return [
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: rad,
        fill: new ol.style.Fill({color: 'rgba(39,75,114,.6)'}),
        stroke: new ol.style.Stroke({
          width: 1,
          color: 'white'
        })
      }),
      text: new ol.style.Text({
        text: count + '',
        fill: new ol.style.Fill({color: 'white'})
      })
    }),
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: rad + 2,
        stroke: new ol.style.Stroke({
          width: 1,
          color: '#274b72'
        })
      })
    })
  ];
};
