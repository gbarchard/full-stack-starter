import { type Request } from 'express'
import { type DecodedIdToken } from 'firebase-admin/auth'

interface Context {
  decodedToken?: DecodedIdToken
  userId?: string
}

const _bindings = new WeakMap<Request, Context>()

export const getContext = (req: Request) => _bindings.get(req) || null
export const setContext = (req: Request, ctx: Context) =>
  _bindings.set(req, ctx)
