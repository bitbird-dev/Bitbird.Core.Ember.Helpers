import Service from '@ember/service';

export default Service.extend({
  makeId(length, dictionary) {
    let text = "",
      possible = dictionary || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    length = length > 4 ? length : 8;

    for (let i = 0; i < length; i++)
    {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },

  /**
   * Generates a random number between min and max
   * @param {number} min - The inlusive minimum value
   * @param {number} max - The exclusive maximum value
   * @returns {number}
   */
  makeNumericId(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
});
