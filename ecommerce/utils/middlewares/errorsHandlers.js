/* eslint-disable no-unused-vars */
const Sentry = require('@sentry/node')
const boom = require('boom')
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi')
const { config } = require('../../config')

Sentry.init({
  dsn: `${config.sentryDns}`,
  tracesSampleRate: 1.0,
})

const withErrorStack = (err, stack) => {
  //error en desarrollo
  if (config.dev) {
    return { ...err, stack }
  }
}

const logErrors = (err, req, res, next) => {
  //logea el error con trayectoria
  if (!config.dev) {
    delete err.stack
  }

  //captura y guarda errore en sentry
  Sentry.captureException(err)

  res.render('error', { error: err })
  console.log(err.stack)
  next(err)
}

const wrapErrors = (err, req, res, next) => {
  if (!err.isBoom) {
    //error 500 in backend
    next(boom.badImplementation(err))
  }

  next(err)
}

const clientErrorsHandler = (err, req, res, next) => {
  //devuelve el error como json en un request AJAX
  const {
    output: { statusCode, payload },
  } = err

  //captura y guarda errore en sentry
  Sentry.captureException(err)

  // catch errors para AJAX request o si un error en streaming
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack))
  } else {
    next(err)
  }
}

const errorsHandler = (err, req, res, next) => {
  //captura y guarda errore en sentry
  Sentry.captureException(err)

  const {
    output: { statusCode, payload },
  } = err

  res.status(statusCode)
  res.render('error', withErrorStack(payload, err.stack))
}

module.exports = {
  logErrors,
  clientErrorsHandler,
  errorsHandler,
  wrapErrors,
}
