import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | contains', function(hooks) {
  setupRenderingTest(hooks);

  let stringSource = 'A framework for ambitious web developers.';
  let stringArraySource = ['A framework', 'for', 'ambitious', 'web developers.'];
  let objectArraySource = [{ id: 0, value: 'A' }, { id: 1, value: 'framework' }, { id: 2, value: 'for' }, { id: 3, value: 'ambituous' }, { id: 4, value: 'web developers.' }];

  test('String containment with match', async function(assert) {
    this.set('source', stringSource);

    //Anywhere
    this.set('inputValue', 'for ambitious');
    await render(hbs`{{contains source inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    //StartsWith
    this.set('inputValue', 'A framework');
    await render(hbs`{{contains source inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    //EndsWith
    this.set('inputValue', 'web developers.');
    await render(hbs`{{contains source inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('String containment with no match', async function(assert) {
    this.set('source', stringSource);

    this.set('inputValue', 'Tomster');
    await render(hbs`{{contains source inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('String containment with falsy values', async function(assert) {
    let falsyValues = [
      { value: null, result: "false" },
      { value: undefined, result: "false" },
      { value: 0, result: "false" },
      { value: false, result: "false" },
      { value: "", result: "true" }
    ];

    this.set('source', stringSource);

    for(let idx = 0; idx < falsyValues.length; idx++) {
      this.set('inputValue', falsyValues[idx].value);
      await render(hbs`{{contains source inputValue}}`);
      assert.equal(this.element.textContent.trim(), falsyValues[idx].result);
    }
  });



  test('String array containment with match', async function(assert) {
    this.set('source', stringArraySource);

    //FirstElement
    this.set('inputValue', 'A framework');
    await render(hbs`{{contains source inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    //Contains
    this.set('inputValue', 'ambitious');
    await render(hbs`{{contains source inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    //LastElement
    this.set('inputValue', 'web developers.');
    await render(hbs`{{contains source inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('String array containment with no match', async function(assert) {
    this.set('source', stringArraySource);

    this.set('inputValue', 'Tomster');
    await render(hbs`{{contains source inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('String array containment with falsy values', async function(assert) {
    let falsyValues = [
      { value: null, result: "false" },
      { value: undefined, result: "false" },
      { value: 0, result: "false" },
      { value: false, result: "false" },
      { value: "", result: "false" }
    ];

    this.set('source', stringArraySource);

    for(let idx = 0; idx < falsyValues.length; idx++) {
      this.set('inputValue', falsyValues[idx].value);
      await render(hbs`{{contains source inputValue}}`);
      assert.equal(this.element.textContent.trim(), falsyValues[idx].result);
    }
  });



  test('Object array containment with match', async function(assert) {
    this.set('source', objectArraySource);

    this.set('inputValue', objectArraySource[1]);
    await render(hbs`{{contains source inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('Object array containment with no match', async function(assert) {
    this.set('source', objectArraySource);

    this.set('inputValue', { id: 0, value: 'A' });
    await render(hbs`{{contains source inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('Object array containment with falsy values', async function(assert) {
    let falsyValues = [
      { value: null, result: "false" },
      { value: undefined, result: "false" },
      { value: 0, result: "false" },
      { value: false, result: "false" },
      { value: "", result: "false" }
    ];

    this.set('source', objectArraySource);

    for(let idx = 0; idx < falsyValues.length; idx++) {
      this.set('inputValue', falsyValues[idx].value);
      await render(hbs`{{contains source inputValue}}`);
      assert.equal(this.element.textContent.trim(), falsyValues[idx].result);
    }
  });
});
