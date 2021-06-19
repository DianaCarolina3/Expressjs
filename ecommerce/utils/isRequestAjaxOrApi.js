const isRequestAjaxOrApi = (req) => {
  //si no acepta html o xhr
  return !req.accepts('html') || req.xhr
}

module.exports = isRequestAjaxOrApi
