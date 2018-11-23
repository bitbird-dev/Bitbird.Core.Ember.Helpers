import Mixin from '@ember/object/mixin';
import EmberObject from '@ember/object';

export default Mixin.create({
  init() {
    this._super(...arguments);
    this.set('busyKeys', EmberObject.create({}));
  },

  isBusy: false,
  busyKeys: null,

  busy(busyKey, description) {
    let busyPropertyPath = 'busyKeys.' + busyKey,
      busyItem = this.get(busyPropertyPath);

    if(!busyItem) {
      busyItem = EmberObject.create({
        key: busyKey,
        description: description || null,
        number: 1,
        isBusy: true
      });
      this.set(busyPropertyPath, busyItem);
    } else {
      busyItem.setProperties({
        key: busyKey,
        description: busyItem.get('description'),
        number: busyItem.get('number') + 1
      });
    }
  },
  idle(busyKey) {
    let busyPropertyPath = 'busyKeys.' + busyKey,
      busyItem = this.get(busyPropertyPath);

    if(busyItem) {
      if(busyItem.get('number') <= 1) {
        this.set(busyPropertyPath, undefined);
        return;
      }

      busyItem.setProperties({
        key: busyKey,
        description: busyItem.get('description'),
        number: busyItem.get('number') - 1
      });
    }
  },

  actions: {
    busy(busyKey, description) {
      this.busy(busyKey, description);
    },
    idle(busyKey) {
      this.idle(busyKey);
    }
  }
});
