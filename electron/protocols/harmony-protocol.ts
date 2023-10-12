import { ProtocolRequest, ProtocolResponse } from 'electron'

export const harmonyProtocolHandler = (
  req: ProtocolRequest,
  callback: (response: ProtocolResponse) => void
) => {
  const requestedPath = decodeURI(req.url).replace('harmony://', '')
  return callback({
    path: requestedPath,
  })
}
