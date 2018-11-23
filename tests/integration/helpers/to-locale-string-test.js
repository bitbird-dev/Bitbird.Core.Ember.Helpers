import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | to-locale-string', function(hooks) {
  setupRenderingTest(hooks);

  test('basic test', async function(assert) {
    this.set('inputValue', '1234');
    await render(hbs`{{to-locale-string inputValue}}`);
    assert.equal(this.element.textContent.trim(), '1234');
  });

  test('date', async function(assert) {
    let date = new Date();
    this.set('inputValue', date);
    await render(hbs`{{to-locale-string inputValue}}`);
    assert.equal(this.element.textContent.trim(), date.toLocaleString());
  });

  test('object', async function(assert) {
    this.set('inputValue', { name: 'Tomster' });
    await render(hbs`{{to-locale-string inputValue}}`);
    assert.equal(this.element.textContent.trim(), '[object Object]');

    this.set('inputValue', { name: 'Tomster', toLocaleString() { return this.name; } });
    await render(hbs`{{to-locale-string inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Tomster');
  });

  test('invalid value', async function(assert) {
    this.set('inputValue', null);
    await render(hbs`{{to-locale-string inputValue}}`);
    assert.equal(this.element.textContent.trim(), "");
  });
});
