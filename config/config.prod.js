'use strict';

module.exports = () => {
    const config = exports = {};

    // 百度地图api key
    config.BAIDUAK = '91XLBaUcqugbPElkZ94Wgr2ihiCG8hNn';

    // redis配置
    config.redis = {
        client: {
            port: 6379, // Redis port
            host: '127.0.0.1', // Redis host
            password: '',
            db: 0,
        },
    };

    // mongodb 服务
    const dbclients = {
        db3: {
            // url: 'mongodb://127.0.0.1:27018,127.0.0.1:27019,127.0.0.1:27020/performance?replicaSet=performance',
            url: 'mongodb://127.0.0.1:27019/performance',
            options: {
                poolSize: 100,
                keepAlive: 10000,
                connectTimeoutMS: 10000,
                autoReconnect: true,
                reconnectTries: 100,
                reconnectInterval: 1000,
            },
        },
    };
    if (config.report_data_type === 'mongodb') {
        dbclients.db1 = {
            // url: 'mongodb://127.0.0.1:27017,127.0.0.1:27018/performance?replicaSet=performance',
            url: 'mongodb://127.0.0.1:27017/performance',
            options: {
                poolSize: 100,
                keepAlive: 10000,
                connectTimeoutMS: 10000,
                autoReconnect: true,
                reconnectTries: 100,
                reconnectInterval: 1000,
            },
        };
    }

    // mongoose配置
    config.mongoose = {
        clients: dbclients,
    };

    config.security = {
        domainWhiteList: [ 'http://per.77dress.cn' ],
        csrf: {
            enable: false,
            ignore: '/api/v1/report/**',
        },
    };

    return config;
};
