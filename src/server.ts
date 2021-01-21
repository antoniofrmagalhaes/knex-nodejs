import app from './core/app'
import appConfig from './core/config'

app.listen(appConfig.port, () =>
  console.log('Api running on port %s.', appConfig.port)
)
