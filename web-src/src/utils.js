/*
* <license header>
*/

/* global fetch */

/**
 *
 * Invokes a web action
 *
 * @param  {string} actionUrl
 * @param {object} headers
 * @param  {object} params
 *
 * @returns {Promise<string|object>} the response
 *
 */

async function actionWebInvoke (actionUrl, headers = {}, params = {}, options = { method: 'POST' }) {
  const actionHeaders = {
    'Content-Type': 'application/json',
    ...headers
  }

  const fetchConfig = {
    headers: actionHeaders
  }

  if (window.location.hostname === 'localhost') {
    actionHeaders['x-ow-extra-logging'] = 'on'
  }

  fetchConfig.method = options.method.toUpperCase()

  if (fetchConfig.method === 'GET') {
    actionUrl = new URL(actionUrl)
    Object.keys(params).forEach(key => actionUrl.searchParams.append(key, params[key]))
  } else if (fetchConfig.method === 'POST') {
    fetchConfig.body = JSON.stringify(params)
  }

  const response = await fetch(actionUrl, fetchConfig)

  let content = await response.text()

  if (!response.ok) {
    throw new Error(`failed request to '${actionUrl}' with status: ${response.status} and message: ${content}`)
  }
  try {
    content = JSON.parse(content)
  } catch (e) {
    // response is not json
  }
  return content
}

export async function callAction(props, action, body = {}) {
  const actions = require('./config.json')
  const res = await fetch(actions[action], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-gw-ims-org-id': props.ims.org,
      'authorization': `Bearer ${props.ims.token}`
    },
    body: JSON.stringify({
      ...body
    })
  })

  return await res.json()
}

export default actionWebInvoke
