/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/* eslint-env jest */

const jsdom = require('jsdom');
const Gatherer = require('../../../gather/gatherers/gatherer');

describe('Gatherer', () => {
  it('returns its name', () => {
    const g = new Gatherer();
    expect(g.name).toEqual('Gatherer');
  });

  it('should expose page functions', () => {
    expect(Gatherer).toHaveProperty('pageFunctions');
    expect(Gatherer.pageFunctions).toHaveProperty('getNodeSelectorString');
    expect(Gatherer.pageFunctions).toHaveProperty('getElementsInDocumentString');
  });

  it('should expose page functions', () => {
    const {document} = new jsdom.JSDOM().window;
    const fn = eval(`(() => {
      ${Gatherer.pageFunctions.getNodeSelectorString}
      return getNodeSelector
    })()`);
    const el = document.createElement('div');
    el.id = 'test';
    expect(fn(el)).toEqual('div#test');
  });
});
