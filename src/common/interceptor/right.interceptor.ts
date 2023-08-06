import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common'
import { type Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class RightInterceptor implements NestInterceptor {
  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...')

    const now = Date.now()
    return next
      .handle()
      .pipe(
        tap(() => {
          console.log(`After... ${Date.now() - now}ms`)
        })
      )
  }
}
