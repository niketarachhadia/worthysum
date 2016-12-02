export default{ DATABASE_URL : process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://test:test@ds119768.mlab.com:19768/worthysum-mlab' :
                            'mongodb://localhost/worthysum-dev'),
 PORT : process.env.PORT || 3001
}