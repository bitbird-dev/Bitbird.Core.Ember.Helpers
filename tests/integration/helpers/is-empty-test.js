import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | is-empty', function(hooks) {
  setupRenderingTest(hooks);

  test('null & undefined', async function(assert) {
    this.set('inputValue', null);
    await render(hbs`{{is-empty inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.set('inputValue', undefined);
    await render(hbs`{{is-empty inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('string', async function(assert) {
    this.set('inputValue', '1234');
    await render(hbs`{{is-empty inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.set('inputValue', '');
    await render(hbs`{{is-empty inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('array', async function(assert) {
    let array = [1,2,3,4,5];

    this.set('inputValue', array);
    await render(hbs`{{is-empty inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    array = [];
    this.set('inputValue', array);
    await render(hbs`{{is-empty inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    array.myProperty = "Tomster";
    this.set('inputValue', array);
    await render(hbs`{{is-empty inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('object', async function(assert) {
    let object = { id: 0, name: 'Tomster' };

    this.set('inputValue', object);
    await render(hbs`{{is-empty inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    object = {};
    this.set('inputValue', object);
    await render(hbs`{{is-empty inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });
});
