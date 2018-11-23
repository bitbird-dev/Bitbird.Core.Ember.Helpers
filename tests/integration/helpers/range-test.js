import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | range', function(hooks) {
  setupRenderingTest(hooks);

  test('bottom up', async function(assert) {
    await render(hbs`{{range 1 10}}`);
    assert.equal(this.element.textContent, '1,2,3,4,5,6,7,8,9');
  });

  test('bottom up inclusive', async function(assert) {
    await render(hbs`{{range 1 10 true}}`);
    assert.equal(this.element.textContent, '1,2,3,4,5,6,7,8,9,10');

    await render(hbs`{{range 1 10 inclusive=true}}`);
    assert.equal(this.element.textContent, '1,2,3,4,5,6,7,8,9,10');
  });

  test('top down', async function(assert) {
    await render(hbs`{{range 10 1}}`);
    assert.equal(this.element.textContent, '10,9,8,7,6,5,4,3,2');
  });

  test('top down inclusive', async function(assert) {
    await render(hbs`{{range 10 1 true}}`);
    assert.equal(this.element.textContent, '10,9,8,7,6,5,4,3,2,1');

    await render(hbs`{{range 10 1 inclusive=true}}`);
    assert.equal(this.element.textContent, '10,9,8,7,6,5,4,3,2,1');
  });
});
