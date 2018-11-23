import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | to-fixed', function(hooks) {
  setupRenderingTest(hooks);

  test('basic', async function(assert) {
    this.set('inputValue', 123456.1);
    await render(hbs`{{to-fixed inputValue}}`);
    assert.equal(this.element.textContent.trim(), '123456');
  });

  test('with fractions', async function(assert) {
    this.set('inputValue', 123456.1);
    await render(hbs`{{to-fixed inputValue 4}}`);
    assert.equal(this.element.textContent.trim(), '123456.1000');

    await render(hbs`{{to-fixed inputValue 9}}`);
    assert.equal(this.element.textContent.trim(), '123456.100000000');
  });

  test('invalid fractions', async function(assert) {
    this.set('inputValue', 123456.1);
    await render(hbs`{{to-fixed inputValue 'Tomster'}}`);
    assert.equal(this.element.textContent.trim(), '123456');

    this.set('inputValue', null);
    await render(hbs`{{to-fixed inputValue undefined}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
});
