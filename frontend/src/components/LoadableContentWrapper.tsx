import { Spinner } from 'flowbite-react'
import { PropsWithChildren } from 'react'

export function LoadableContentWrapper(
  props: PropsWithChildren<{ loading: boolean; errorMessage?: string }>,
) {
  const { errorMessage, loading, children } = props

  if (errorMessage) {
    return <h2 className="m-auto text-lg">{errorMessage}</h2>
  }

  if (loading) {
    return (
      <div className="m-auto">
        <Spinner />
      </div>
    )
  }

  return children
}
