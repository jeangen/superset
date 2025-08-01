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
import { t, validateNonEmpty } from '@superset-ui/core';
import timeGrainSqlaAnimationOverrides from '../../utilities/controls';
import { COLOR_SCHEME_TYPES } from '../../utilities/utils';
import * as SharedDeckGL from '../../utilities/Shared_DeckGL';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [SharedDeckGL.spatial],
        ['size'],
        ['row_limit'],
        [SharedDeckGL.filterNulls],
        ['adhoc_filters'],
        [SharedDeckGL.tooltipContents],
        [SharedDeckGL.tooltipTemplate],
      ],
    },
    {
      label: t('Map'),
      controlSetRows: [
        [SharedDeckGL.mapboxStyle],
        [SharedDeckGL.autozoom, SharedDeckGL.viewport],
      ],
    },
    {
      label: t('Grid'),
      expanded: true,
      controlSetRows: [
        [SharedDeckGL.gridSize],
        [
          {
            name: 'color_scheme_type',
            config: {
              ...SharedDeckGL.deckGLCategoricalColorSchemeTypeSelect.config,
              choices: [
                ['default', 'Default'],
                [COLOR_SCHEME_TYPES.fixed_color, t('Fixed color')],
                [
                  COLOR_SCHEME_TYPES.categorical_palette,
                  t('Categorical palette'),
                ],
              ],
              default: 'default',
            },
          },
        ],
        [SharedDeckGL.deckGLFixedColor],
        [SharedDeckGL.deckGLCategoricalColorSchemeSelect],
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
    size: {
      label: t('Weight'),
      description: t("Metric used as a weight for the grid's coloring"),
      validators: [validateNonEmpty],
    },
    time_grain_sqla: timeGrainSqlaAnimationOverrides,
  },
  formDataOverrides: formData => ({
    ...formData,
    size: getStandardizedControls().shiftMetric(),
  }),
};

export default config;
