/**
 * Copyright 2022 Google LLC
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Retrieves the conversion events for a given set of properties.
 * @param {!Array<!Array>} properties A two dimensional array of
 * account and property names and ids.
 * @return {!Array<!Array>} A two dimensional array where each
 * array contains metadata about the conversion events for the given
 * set of properties.
 */
function listSelectedGA4ConversionEvents(properties) {
  const allConversionEvents = [];
  properties.forEach(property => {
    const propertyName = 'properties/' + property[3];
    const conversionEvents = listGA4Entities(
      'conversionEvents', propertyName).conversionEvents;
    if (conversionEvents != undefined) {
      for (let i = 0; i < conversionEvents.length; i++) {
        allConversionEvents.push([
          property[0],
          property[1],
          property[2],
          property[3],
          conversionEvents[i].eventName,
          conversionEvents[i].name,
          conversionEvents[i].createTime,
          conversionEvents[i].deletable,
          conversionEvents[i].custom
        ]);
      }
    }
  });
  return allConversionEvents;
}

/**
 * 
 */
function writeGA4ConversionEventsToSheet() {
  const selectedProperties = getSelectedGa4Properties();
  const conversionEvents = listSelectedGA4ConversionEvents(selectedProperties);
  clearSheetContent(sheetsMeta.ga4.conversionEvents);
  writeToSheet(conversionEvents, sheetsMeta.ga4.conversionEvents.sheetName);
}