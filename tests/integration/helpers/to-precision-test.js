import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | to-precision', function(hooks) {
  setupRenderingTest(hooks);

  test('basic', async function(assert) {
    this.set('inputValue', 123456.1);
    await render(hbs`{{to-precision inputValue}}`);
    assert.equal(this.element.textContent.trim(), '123456.1');
  });

  test('with fractions', async function(assert) {
    this.set('inputValue', 123456.1);
    await render(hbs`{{to-precision inputValue 4}}`);
    assert.equal(this.element.textContent.trim(), '1.235e+5');

    await render(hbs`{{to-precision inputValue 9}}`);
    assert.equal(this.element.textContent.trim(), '123456.100');
  });

  test('invalid fractions', async function(assert) {
    this.set('inputValue', 123456.1);
    await render(hbs`{{to-precision inputValue 'Tomster'}}`);
    assert.equal(this.element.textContent.trim(), '123456.1');

    this.set('inputValue', null);
    await render(hbs`{{to-precision inputValue undefined}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
});
