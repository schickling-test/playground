import '@effect-ts/core/Tracing/Enable'
import { Effect as T, pipe, Stream as S } from '@effect-ts/core'
import { runMain } from '@effect-ts/node/Runtime'

const program = T.gen(function* ($) {
  yield* $(pipe(
    S.fromEffect(T.die('oh no - defect in stream')),
    S.mapErrorCause(err => {
      console.log(`error in stream: ${err}`)
      return err
    }),
    S.take(1),
    S.runCollect,
  ))

  yield* $(T.succeedWith(() => console.log('hello world')))
})

runMain(program)
