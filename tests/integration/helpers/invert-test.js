import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | invert', function(hooks) {
  setupRenderingTest(hooks);

  test('boolean', async function(assert) {
    this.set('inputValue', true);
    await render(hbs`{{invert inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false', "true becomes false");

    this.set('inputValue', false);
    await render(hbs`{{invert inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true', "false becomes true");
  });

  test('number', async function(assert) {
    //Default mode

    this.set('inputValue', 0);
    await render(hbs`{{invert inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true', "0 becomes true");

    this.set('inputValue', 1);
    await render(hbs`{{invert inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false', "1 becomes false");

    this.set('inputValue', 100);
    await render(hbs`{{invert inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false', "100 becomes false");

    this.set('inputValue', -100);
    await render(hbs`{{invert inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false', "-100 becomes false");

    //Enhanced mode

    this.set('inputValue', 0);
    await render(hbs`{{invert inputValue enhancedMode=true}}`);
    assert.equal(this.element.textContent.trim(), '1', "0 becomes 1 in enhanced mode");

    this.set('inputValue', 1);
    await render(hbs`{{invert inputValue enhancedMode=true}}`);
    assert.equal(this.element.textContent.trim(), '0', "1 becomes 0 in enhanced mode");

    this.set('inputValue', 100);
    await render(hbs`{{invert inputValue enhancedMode=true}}`);
    assert.equal(this.element.textContent.trim(), '0', "100 becomes 0 in enhanced mode");

    this.set('inputValue', -100);
    await render(hbs`{{invert inputValue enhancedMode=true}}`);
    assert.equal(this.element.textContent.trim(), '0', "-100 becomes 0 in enhanced mode");
  });

  test('number as string', async function(assert) {
    //Default mode

    this.set('inputValue', "0");
    await render(hbs`{{invert inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false', "'0' becomes false");

    this.set('inputValue', "1");
    await render(hbs`{{invert inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false', "'1' becomes false");

    this.set('inputValue', "100");
    await render(hbs`{{invert inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false', "'100' becomes false");

    this.set('inputValue', "-100");
    await render(hbs`{{invert inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false', "'-100' becomes false");

    //Enhanced mode

    this.set('inputValue', '0');
    await render(hbs`{{invert inputValue enhancedMode=true}}`);
    assert.equal(this.element.textContent.trim(), '1', "'0' becomes '1' in enhanced mode");

    this.set('inputValue', '1');
    await render(hbs`{{invert inputValue enhancedMode=true}}`);
    assert.equal(this.element.textContent.trim(), '0', "'1' becomes '0' in enhanced mode");

    this.set('inputValue', '100');
    await render(hbs`{{invert inputValue enhancedMode=true}}`);
    assert.equal(this.element.textContent.trim(), 'false', "'100' becomes false in enhanced mode");

    this.set('inputValue', '-100');
    await render(hbs`{{invert inputValue enhancedMode=true}}`);
    assert.equal(this.element.textContent.trim(), 'false', "'-100' becomes false in enhanced mode");
  });
});
