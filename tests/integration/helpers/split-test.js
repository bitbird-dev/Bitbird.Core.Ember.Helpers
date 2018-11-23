import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | split', function(hooks) {
  setupRenderingTest(hooks);

  let stringSource =
    'Alpha. Beta gama. Delta. .Epsilon Zeta Eta . . Theta Iota...Kappa.';

  // Replace this with your real tests.
  test('basic split', async function(assert) {
    this.set('inputValue', stringSource);
    await render(hbs`{{split inputValue '.'}}`);
    assert.equal(this.element.textContent,
      'Alpha, Beta gama, Delta, ,Epsilon Zeta Eta , , Theta Iota,,,Kappa,');
  });

  test('trim', async function(assert) {
    this.set('inputValue', stringSource);
    await render(hbs`{{split inputValue '.' trim=true}}`);
    assert.equal(this.element.textContent,
      'Alpha,Beta gama,Delta,,Epsilon Zeta Eta,,Theta Iota,,,Kappa,');
  });

  test('remove empty', async function(assert) {
    this.set('inputValue', stringSource);
    await render(hbs`{{split inputValue '.' empty=false}}`);
    assert.equal(this.element.textContent,
      'Alpha, Beta gama, Delta, ,Epsilon Zeta Eta , , Theta Iota,Kappa');
  });

  test('remove empty and trim', async function(assert) {
    this.set('inputValue', stringSource);
    await render(hbs`{{split inputValue '.' empty=false trim=true}}`);
    assert.equal(this.element.textContent,
      'Alpha,Beta gama,Delta,Epsilon Zeta Eta,Theta Iota,Kappa');
  });
});
