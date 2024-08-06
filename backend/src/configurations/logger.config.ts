import { createLogger, transports, format } from 'winston'

const logger = createLogger({
  level: 'info', // Nível global de log
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  defaultMeta: { service: 'raptrak-service' },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Apenas logs de erro
    new transports.File({ filename: 'logs/combined.log', level: 'info' }), // Logs de info e acima
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
      level: 'debug' // Apenas logs de debug e acima no console
    })
  ]
});

export default logger
