export default{ DATABASE_URL : process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://test:test@ds047666.mlab.com:47666/xml2json-mlab' :
                            'mongodb://localhost/worthysum-dev'),
 PORT : process.env.PORT || 3001
}