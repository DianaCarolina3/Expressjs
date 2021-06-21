/* eslint-disable no-undef */
const assert = require('assert')
const isRequestAjaxOrApi = require('../utils/isRequestAjaxOrApi')

describe('utils - isRequestAjaxOrApi', () => {
  describe('when request accepts html and is not an xhr', () => {
    it('sholud return false', () => {
      const req = {
        //acepta html
        accepts: () => true,
        xhr: false,
      }
      const result = isRequestAjaxOrApi(req)
      assert.strictEqual(result, false)
    })
  })
})
