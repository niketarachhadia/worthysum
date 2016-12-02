export default{ DATABASE_URL : process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://test:test@ds119768.mlab.com:19768/worthysum-mlab',
 PORT : process.env.PORT || 3001
}
