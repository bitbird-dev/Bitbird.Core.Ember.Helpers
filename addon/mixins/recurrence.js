import { computed, observer } from '@ember/object';
import { A } from '@ember/array';
import { warn } from '@ember/debug';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  init() {
    this._super();
    this.get('isMonday');
    this.get('isTuesday');
    this.get('isWednesday');
    this.get('isThursday');
    this.get('isFriday');
    this.get('isSaturday');
    this.get('isSunday');
  },

  dateBegin: new Date(),
  isAllDay: false,
  recurrenceEnabled: false,
  recurrenceInterval: 1,
  recurrenceType: 0, //4=Daily, 5=weekly, 6=monthly, 7=yearly
  recurrenceDays: 0, //0=None, 1=Monday, 2=Tuesday, 4=Wednesday, 8Thursday, ..., 64=Sunday
  recurrenceEndType: 0, //0=None, 1=Date, 2=Occurrences
  recurrenceUntil: null,

  isDaily: computed('recurrenceType', function () {
    return this.get('recurrenceType') === 4;
  }),
  isWeekly: computed('recurrenceType', function () {
    return this.get('recurrenceType') === 5;
  }),
  isMonthly: computed('recurrenceType', function () {
    return this.get('recurrenceType') === 6;
  }),
  isYearly: computed('recurrenceType', function () {
    return this.get('recurrenceType') === 7;
  }),

  isNoDay: computed('recurrenceDays', function () {
    return this.get('recurrenceDays') === 0;
  }),
  isMonday: computed('recurrenceDays', {
    get() {
      return (this.get('recurrenceDays') & 1) === 1;
    },
    set(sender, value) {
      return value;
    }
  }),
  isTuesday: computed('recurrenceDays', {
    get() {
      return (this.get('recurrenceDays') & 2) === 2;
    },
    set(sender, value) {
      return value;
    }
  }),
  isWednesday: computed('recurrenceDays', {
    get() {
      return (this.get('recurrenceDays') & 4) === 4;
    },
    set(sender, value) {
      return value;
    }
  }),
  isThursday: computed('recurrenceDays', {
    get() {
      return (this.get('recurrenceDays') & 8) === 8;
    },
    set(sender, value) {
      return value;
    }
  }),
  isFriday: computed('recurrenceDays', {
    get() {
      return (this.get('recurrenceDays') & 16) === 16;
    },
    set(sender, value) {
      return value;
    }
  }),
  isSaturday: computed('recurrenceDays', {
    get() {
      return (this.get('recurrenceDays') & 32) === 32;
    },
    set(sender, value) {
      return value;
    }
  }),
  isSunday: computed('recurrenceDays', {
    get() {
      return (this.get('recurrenceDays') & 64) === 64;
    },
    set(sender, value) {
      return value;
    }
  }),

  _updateRecurrenceDays: observer('isWeekly', 'isMonday', 'isTuesday', 'isWednesday', 'isThursday', 'isFriday', 'isSaturday', 'isSunday', function () {
    {
      let val = 0;

      let mon = this.get('isMonday'),
        tue = this.get('isTuesday'),
        wed = this.get('isWednesday'),
        thu = this.get('isThursday'),
        fri = this.get('isFriday'),
        sat = this.get('isSaturday'),
        sun = this.get('isSunday');

      if (mon) val = val | 1;
      if (tue) val = val | 2;
      if (wed) val = val | 4;
      if (thu) val = val | 8;
      if (fri) val = val | 16;
      if (sat) val = val | 32;
      if (sun) val = val | 64;

      if (this.get('isWeekly') && val === 0)
      {
        switch (this.get('dateBegin').getDay()) {
          case 0:
            this.set('isSunday', true);
            break;
          case 1:
            this.set('isMonday', true);
            break;
          case 2:
            this.set('isTuesday', true);
            break;
          case 3:
            this.set('isWednesday', true);
            break
          case 4:
            this.set('isThursday', true);
            break;
          case 5:
            this.set('isFriday', true);
            break;
          case 6:
            this.set('isSaturday', true);
            break;
        }
        return;
      }

      this.set('recurrenceDays', val);
    }
  }),

  endsWithDate: computed('recurrenceEndType', {
    get() {
      return this.get('recurrenceEndType') === 1;
    },
    set(sender, value) {
      let val = value === true ? 1 : 0;
      return this.set('recurrenceEndType', val) === 1;
    }
  }),

  endsNever: computed('recurrenceEndType', {
    get() {
      return this.get('recurrenceEndType') === 0;
    },
    set(sender, value) {
      let val = value === true ? 0 : 1;
      return this.set('recurrenceEndType', val) === 0;
    }
  }),

  _updateRecurrenceEndType: observer('endsWithDate', 'endsNever', function () {

  }),

  recurrenceDescription: computed('dateBegin', 'recurrenceUntil', 'recurrenceEnabled', 'recurrenceInterval', 'recurrenceType', 'recurrenceDays', 'recurrenceEndType', function () {
    let
      enabled = this.get('recurrenceEnabled'),
      type = this.get('recurrenceType');

    let r = {
      noRecurrence: 'Keine',
      typeDaily: "Täglich",
      typeWeekly: "Wöchentlich",
      typeMonthly: "Monatlich",
      typeYearly: "Jährlich",
    };

    if (!enabled) return r.noRecurrence;
    switch (type.toString()) {
      case '4':
        return r.typeDaily;
      case '5':
        return r.typeWeekly;
      case '6':
        return r.typeMonthly;
      case '7':
        return r.typeYearly;
    }

    return r.noRecurrence + '*';
  }),

  //calendarType: DS.attr('number'), //0=TaskCreation, 1=PlanCreation
  getNext(rangeBegin, rangeEnd, rangeSize) {
    let
      occurences = A(),
      begin = this.get('dateBegin'),
      end = this.get('recurrenceUntil'),
      enabled = this.get('recurrenceEnabled'),
      type = this.get('recurrenceType'),

      endsWithDate = this.get('endsWithDate');

    //Default values
    rangeBegin = rangeBegin || new Date();
    rangeEnd = rangeEnd || new Date();

    //Normalize values to the date at 00:00:00
    begin = this._getDatePart(begin);
    if (endsWithDate) {
      if (end) {
        end = this._getDatePart(end);
      } else {
        end = this._addDays(this._copyDate(begin), 1);
      }
    }
    else {
      end = null;
    }

    if (endsWithDate && end < begin) {
      end = this._addDays(this._copyDate(begin), 1);
    }

    rangeBegin = this._getDatePart(rangeBegin);
    rangeEnd = this._getDatePart(rangeEnd);

    // Let recurrenceType '0' disable the recurrency
    if (type === 0) {
      enabled = false;
    } else {
      type = type || 4;
      enabled = true;
    }

    this.setProperties({
      recurrenceType: type,
      recurrenceEnabled: enabled
    });

    //If occurrence is not enabled, this is just a one-time event
    if (!enabled) {
      if (begin >= rangeBegin && begin <= rangeEnd) {
        occurences.pushObject(begin);
      }
    }

    //Return if no result is to be expected
    if (!enabled || rangeBegin >= rangeEnd || rangeEnd < begin || (endsWithDate && rangeBegin > end)) return occurences;

    //Fix ranges
    rangeBegin = rangeBegin < begin ? begin : rangeBegin;
    rangeEnd = endsWithDate && rangeEnd > end ? end : rangeEnd;
    if (rangeSize > 0) {
      rangeEnd = null;
    } else {
      rangeSize = null;
    }

    //Compute based on recurrence type
    switch (type.toString()) {
      case '4':
        occurences = this._getNextDaily(rangeBegin, rangeEnd, rangeSize);
        break;
      case '5':
        occurences = this._getNextWeekly(rangeBegin, rangeEnd, rangeSize);
        break;
      case '6':
        occurences = this._getNextMonthly(rangeBegin, rangeEnd, rangeSize);
        break;
      case '7':
        occurences = this._getNextYearly(rangeBegin, rangeEnd, rangeSize);
        break;
    }

    return occurences;
  },

  _getNextDaily(rangeBegin, rangeEnd, rangeSize) {
    let
      occurences = A(),
      begin = this.get('dateBegin'),
      interval = parseInt(this.get('recurrenceInterval'));

    let current = begin,
      breakCounter = 1000000;

    if (interval > 0 === false) {
      interval = 1;
    }

    while (this._getDatePart(current) <= rangeEnd || occurences.length < (rangeSize || -1)) {
      if (breakCounter-- <= 0) {
        warn("Infinite loop detected in recurrence-pattern._getNextDaily");
        break;
      }
      if (current >= begin) occurences.pushObject(current);
      current = this._copyDate(current);
      this._addDays(current, interval);
    }

    return occurences;
  },

  _getNextWeekly(rangeBegin, rangeEnd, rangeSize) {
    let
      occurences = A(),
      begin = this.get('dateBegin'),
      interval = this.get('recurrenceInterval'),
      isMonday = this.get('isMonday'),
      isTuesday = this.get('isTuesday'),
      isWednesday = this.get('isWednesday'),
      isThursday = this.get('isThursday'),
      isFriday = this.get('isFriday'),
      isSaturday = this.get('isSaturday'),
      isSunday = this.get('isSunday');

    if (interval > 0 === false) {
      interval = 1;
    }

    let current = begin,
      breakCounter = 1000000,
      currentIsBegin = true; //begin must always be returned

    while (this._getDatePart(current) <= rangeEnd || occurences.length < (rangeSize || -1)) {
      if (breakCounter-- <= 0) {
        warn("Infinite loop detected in recurrence-pattern._getNextDaily");
        break;
      }
      let dayOfWeek = current.getDay();
      let weekdayMatches = false;

      switch (dayOfWeek) {
        case 0:
          weekdayMatches = isSunday;
          break;
        case 1:
          weekdayMatches = isMonday;
          break;
        case 2:
          weekdayMatches = isTuesday;
          break;
        case 3:
          weekdayMatches = isWednesday;
          break;
        case 4:
          weekdayMatches = isThursday;
          break;
        case 5:
          weekdayMatches = isFriday;
          break;
        case 6:
          weekdayMatches = isSaturday;
          break;
      }

      if (this._getDatePart(current) >= this._getDatePart(begin) && (currentIsBegin || weekdayMatches)) {
        occurences.pushObject(current);
      }
      current = this._copyDate(current);
      if (dayOfWeek == 0) {
        this._addDays(current, 7 * (interval - 1) + 1);
      } else {
        this._addDays(current, 1);
      }
      currentIsBegin = false;
    }

    return occurences;
  },

  _getNextMonthly() {
    return A();
  },

  _getNextYearly() {
    return A();
  },

  _addDays(date, days) {
    return date.setDate(date.getDate() + days);
  },

  _copyDate(date) {
    if(!date) return date;
    return new Date(date.valueOf());
  },

  _getDatePart(date) {
    if(!date) return date;
    let copy = this._copyDate(date);
    copy.setHours(0);
    copy.setMinutes(0);
    copy.setSeconds(0);
    copy.setMilliseconds(0);
    return copy;
  }
});
