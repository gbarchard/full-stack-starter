import { PropsWithChildren } from 'react'
import {
  ErrorBoundary as _ErrorBoundary,
  FallbackProps,
} from 'react-error-boundary'

export function ErrorBoundary(props: PropsWithChildren) {
  return (
    <_ErrorBoundary FallbackComponent={Fallback}>
      {props.children}
    </_ErrorBoundary>
  )
}

function Fallback(props: FallbackProps) {
  return (
    <section className="m-auto text-center">
      <h2 className="text-lg">An Error Occured</h2>
      <button
        className="text-blue-600 hover:underline"
        onClick={props.resetErrorBoundary}
      >
        Try Again
      </button>
    </section>
  )
}
