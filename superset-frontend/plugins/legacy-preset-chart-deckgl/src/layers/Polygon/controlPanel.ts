/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {
  ControlPanelConfig,
  getStandardizedControls,
} from '@superset-ui/chart-controls';
import { t } from '@superset-ui/core';
import timeGrainSqlaAnimationOverrides from '../../utilities/controls';
import { COLOR_SCHEME_TYPES, formatSelectOptions } from '../../utilities/utils';
import { dndLineColumn } from '../../utilities/sharedDndControls';
import * as SharedDeckGL from '../../utilities/Shared_DeckGL';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            ...dndLineColumn,
            config: {
              ...dndLineColumn.config,
              label: t('Polygon Column'),
            },
          },
        ],
        [
          {
            ...SharedDeckGL.lineType,
            config: {
              ...SharedDeckGL.lineType.config,
              label: t('Polygon Encoding'),
            },
          },
        ],
        ['adhoc_filters'],
        ['metric'],
        [
          {
            ...SharedDeckGL.pointRadiusFixed,
            config: {
              ...SharedDeckGL.pointRadiusFixed.config,
              label: t('Elevation'),
            },
          },
        ],
        ['row_limit'],
        [SharedDeckGL.reverseLongLat],
        [SharedDeckGL.filterNulls],
        [SharedDeckGL.tooltipContents],
        [SharedDeckGL.tooltipTemplate],
      ],
    },
    {
      label: t('Map'),
      expanded: true,
      controlSetRows: [
        [SharedDeckGL.mapboxStyle],
        [SharedDeckGL.viewport],
        [SharedDeckGL.autozoom],
      ],
    },
    {
      label: t('Polygon Settings'),
      expanded: true,
      controlSetRows: [
        [
          {
            ...SharedDeckGL.deckGLCategoricalColorSchemeTypeSelect,
            config: {
              ...SharedDeckGL.deckGLCategoricalColorSchemeTypeSelect.config,
              choices: [
                [COLOR_SCHEME_TYPES.fixed_color, t('Fixed color')],
                [COLOR_SCHEME_TYPES.linear_palette, t('Linear palette')],
                [COLOR_SCHEME_TYPES.color_breakpoints, t('Color breakpoints')],
              ],
              default: COLOR_SCHEME_TYPES.linear_palette,
            },
          },
          SharedDeckGL.fillColorPicker,
          SharedDeckGL.strokeColorPicker,
          SharedDeckGL.deckGLLinearColorSchemeSelect,
          SharedDeckGL.breakpointsDefaultColor,
          SharedDeckGL.deckGLColorBreakpointsSelect,
        ],
        [SharedDeckGL.filled, SharedDeckGL.stroked],
        [SharedDeckGL.extruded],
        [SharedDeckGL.multiplier],
        [SharedDeckGL.lineWidth],
        [
          {
            name: 'line_width_unit',
            config: {
              type: 'SelectControl',
              label: t('Line width unit'),
              default: 'pixels',
              choices: [
                ['meters', t('meters')],
                ['pixels', t('pixels')],
              ],
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'opacity',
            config: {
              type: 'SliderControl',
              label: t('Opacity'),
              default: 80,
              step: 1,
              min: 0,
              max: 100,
              renderTrigger: true,
              description: t('Opacity, expects values between 0 and 100'),
            },
          },
        ],
        [
          {
            name: 'num_buckets',
            config: {
              type: 'SelectControl',
              multi: false,
              freeForm: true,
              label: t('Number of buckets to group data'),
              default: 5,
              choices: formatSelectOptions([2, 3, 5, 10]),
              description: t('How many buckets should the data be grouped in.'),
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'break_points',
            config: {
              type: 'SelectControl',
              multi: true,
              freeForm: true,
              label: t('Bucket break points'),
              choices: formatSelectOptions([]),
              description: t(
                'List of n+1 values for bucketing metric into n buckets.',
              ),
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'table_filter',
            config: {
              type: 'CheckboxControl',
              label: t('Emit Filter Events'),
              renderTrigger: true,
              default: false,
              description: t('Whether to apply filter when items are clicked'),
            },
          },
        ],
        [
          {
            name: 'toggle_polygons',
            config: {
              type: 'CheckboxControl',
              label: t('Multiple filtering'),
              renderTrigger: true,
              default: true,
              description: t(
                'Allow sending multiple polygons as a filter event',
              ),
            },
          },
        ],
        [SharedDeckGL.legendPosition],
        [SharedDeckGL.legendFormat],
      ],
    },
    {
      label: t('Advanced'),
      controlSetRows: [
        [SharedDeckGL.jsColumns],
        [SharedDeckGL.jsDataMutator],
        [SharedDeckGL.jsTooltip],
        [SharedDeckGL.jsOnclickHref],
      ],
    },
  ],
  controlOverrides: {
    metric: {
      validators: [],
    },
    time_grain_sqla: timeGrainSqlaAnimationOverrides,
  },
  formDataOverrides: formData => ({
    ...formData,
    metric: getStandardizedControls().shiftMetric(),
  }),
};

export default config;
