import { createElement, useState, useEffect } from 'react';
import { select, geoPath, geoMercator, min, max, scaleLinear } from 'd3';
import PropTypes from 'prop-types';

const D3Map = (props) => {
  const { data } = props;

  const geojson: any = data;
  const width = 800;
  const height = width * 1.5;
  const projection = geoMercator().fitExtent(
    [
      [0, 0],
      [width, height],
    ],
    geojson
  );
  const path: any = geoPath().projection(projection);

  return createElement(
    'div',
    {
      className: 'd3-react-d3-wrapper',
    },
    createElement(
      'svg',
      {
        className: 'd3-react-d3-svg-element',
        width,
        height,
      },
      createElement(
        'g',
        {
          className: `d3-react-d3-layer`,
        },
        geojson.features.map((d: any, i: number) =>
          createElement('path', {
            key: d.properties.Name + i,
            d: path(d),
            fill: '#eee',
            stroke: '#ccc',
            strokeWidth: 0.5,
            strokeOpacity: 0.5,
          })
        )
      )
    )
  );
};

D3Map.propTypes = {
  data: PropTypes.object.isRequired,
};

D3Map.defaultProps = {
  data: null,
};

export default D3Map;
