import EmberObject from '@ember/object';
import RecurrenceMixin from 'bitbird-core-ember-helpers/mixins/recurrence';
import { module, test } from 'qunit';

module('Unit | Mixin | recurrence', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let RecurrenceObject = EmberObject.extend(RecurrenceMixin);
    let subject = RecurrenceObject.create();
    assert.ok(subject);
  });
});
