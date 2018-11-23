import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | or', function(hooks) {
  setupRenderingTest(hooks);

  test('number', async function(assert) {
    this.setProperties({
      value1: 0,
      value2: false,
      value3: null,
      value4: undefined,
      value5: 123.45
    });
    await render(hbs`{{or value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'true', "Last value is a number > 0");

    this.set('value5', 0);
    await render(hbs`{{or value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'false', "No value is a number <> 0");
  });

  test('boolean', async function(assert) {
    this.setProperties({
      value1: 0,
      value2: false,
      value3: null,
      value4: undefined,
      value5: true
    });
    await render(hbs`{{or value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'true', "Last value is boolean true");

    this.set('value5', false);
    await render(hbs`{{or value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'false', "No value is boolean true");
  });

  test('string', async function(assert) {
    this.setProperties({
      value1: 0,
      value2: false,
      value3: null,
      value4: undefined,
      value5: "Tomster"
    });
    await render(hbs`{{or value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'true', "Last value is string with length > 0");

    this.set('value5', "");
    await render(hbs`{{or value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'false', "Last value is string with length == 0");

    this.set('value5', null);
    await render(hbs`{{or value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'false', "Last value is null");

    this.set('value5', undefined);
    await render(hbs`{{or value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'false', "Last value is undefined");
  });

  test('object', async function(assert) {
    this.setProperties({
      value1: 0,
      value2: false,
      value3: null,
      value4: undefined,
      value5: {}
    });
    await render(hbs`{{or value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'true', "Last value is an object");
  });

  test('array', async function(assert) {
    this.setProperties({
      value1: 0,
      value2: false,
      value3: null,
      value4: undefined,
      value5: []
    });
    await render(hbs`{{or value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'true', "Last value is an array with length == 0");
  });

  test('function', async function(assert) {
    this.setProperties({
      value1: 0,
      value2: false,
      value3: null,
      value4: undefined,
      value5: function() {}
    });
    await render(hbs`{{or value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'true', "Last value is a function with length == 0");
  });


  /*
  * value1: 1234,
      value2: true,
      value3: { name: 'Tomster' },
      value4: "Tomster",
      value5: [],
      value6: function() { return null; }
  * */
});
