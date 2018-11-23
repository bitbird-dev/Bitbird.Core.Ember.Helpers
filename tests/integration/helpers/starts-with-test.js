import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | starts-with', function(hooks) {
  setupRenderingTest(hooks);

  let stringSource = 'A framework for ambitious web developers.';

  test('basic test', async function(assert) {
    //match
    this.setProperties({
      target: stringSource,
      value: 'A frame'
    });
    await render(hbs`{{starts-with target value}}`);
    assert.equal(this.element.textContent, "true");

    //no match
    this.setProperties({
      target: stringSource,
      value: ' frame'
    });
    await render(hbs`{{starts-with target value}}`);
    assert.equal(this.element.textContent, "false");
  });

  test('target is not a string', async function(assert) {
    this.setProperties({
      target: false,
      value: 'fal'
    });
    await render(hbs`{{starts-with target value}}`);
    assert.equal(this.element.textContent, "true");

    this.setProperties({
      target: 123,
      value: '123'
    });
    await render(hbs`{{starts-with target value}}`);
    assert.equal(this.element.textContent, "true");
  });

  test('target is not available', async function(assert) {
    this.setProperties({
      target: null,
      value: 'A frame'
    });
    await render(hbs`{{starts-with target value}}`);
    assert.equal(this.element.textContent, "false");

    this.setProperties({
      target: undefined,
      value: 'A frame'
    });
    await render(hbs`{{starts-with target value}}`);
    assert.equal(this.element.textContent, "false");
  });
});
