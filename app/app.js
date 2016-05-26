import express from 'express'
import { AppConfig } from '../conf/appconfig'
import { Router } from './Router'

const app = AppConfig()

app.locals.Router = Router

app.listen(app.get('port'), () => console.log('Green something Up and Running on port ' + app.get('port')))
