import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | to-exponential', function(hooks) {
  setupRenderingTest(hooks);

  test('basic', async function(assert) {
    this.set('inputValue', 123456.1);
    await render(hbs`{{to-exponential inputValue}}`);
    assert.equal(this.element.textContent.trim(), '1.234561e+5');
  });

  test('with fractions', async function(assert) {
    this.set('inputValue', 123456.1);
    await render(hbs`{{to-exponential inputValue 4}}`);
    assert.equal(this.element.textContent.trim(), '1.2346e+5');

    await render(hbs`{{to-exponential inputValue 9}}`);
    assert.equal(this.element.textContent.trim(), '1.234561000e+5');
  });

  test('invalid fractions', async function(assert) {
    this.set('inputValue', 123456.1);
    await render(hbs`{{to-exponential inputValue 'Tomster'}}`);
    assert.equal(this.element.textContent.trim(), '1e+5');

    this.set('inputValue', null);
    await render(hbs`{{to-exponential inputValue undefined}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
});
