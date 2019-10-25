'use strict';
const address = require('address');

module.exports = () => {
    const config = exports = {};

    config.keys = '_123456789';

    config.middleware = [];

    config.name = '性能监控系统';

    config.description = '性能监控系统';

    config.host = '';

    // 务必修改config.debug = true;
    config.session_secret = 'node_performance_secret';

    config.cluster = {
        listen: {
            port: 7001,
            hostname: '127.0.0.1',
            ip: address.ip(),
        },
    };

    // 用户登录态持续时间 1 天
    config.user_login_timeout = 86400;

    // web浏览器端定时任务是否执行
    config.is_web_task_run = true;

    // wx浏览器端定时任务是否执行
    config.is_wx_task_run = true;

    // db1与db3数据库同步每分钟执行一次
    config.report_task_time = '0 */1 * * * *';

    // 执行pvuvip定时任务的时间间隔 每分钟定时执行一次
    config.pvuvip_task_minute_time = '0 */1 * * * *';

    // 执行pvuvip定时任务的时间间隔 每天定时执行一次
    config.pvuvip_task_day_time = '0 0 0 */1 * *';

    // 执行ip地理位置转换的定时任务 每分钟定时执行一次
    config.ip_task_time = '0 */1 * * * *';

    // db3同步db1上报数据线程数
    config.report_thread = 10;

    // 更新用户上报IP对应的城市信息线程数
    config.ip_thread = 10;

    // 上报原始数据使用redis存储还是使用mongodb存储
    config.report_data_type = 'redis'; // redus  mongodb

    // 使用redis储存原始数据时，相关配置 （若report_data_type=mongodb时忽略此配置）
    config.redis_consumption = {
        // 定时任务执行时间
        task_time: '*/20 * * * * *',
        // 每次定时任务消费线程数(web端)
        thread_web: 1000,
        // 每次定时任务消费线程数(wx端)
        thread_wx: 0,
        // 消息队列池限制数, 0：不限制 number: 限制条数 高并发时服务优雅降级方案
        total_limit_web: 100000,
        total_limit_wx: 100000,
    };

    // 解析用户ip地址为城市是使用redis还是使用mongodb
    config.ip_redis_or_mongodb = 'redis'; // redus  mongodb

    // 文件缓存ip对应地理位置（文件名）
    config.ip_city_cache_file = {
        web: 'web_ip_city_cache_file.txt',
        wx: 'wx_ip_city_cache_file.txt',
    };

    // top数据分析提取前N条配置
    config.top_alalysis_size = {
        web: 10,
        wx: 10,
    };

    // shell重启
    config.shell_restart = {
        // mongodb重启shell,如果mongodb进程kill了，请求不了数据库时重启（可选填）
        mongodb: [ '/data/performance/mongodb-restart.sh' ],
        // node.js服务重启shell,mongodb重启时，数据库连接池有可能会断，这时需要重启服务
        servers: [ '/data/performance/servers-restart.sh' ],
    };

    // 百度地图api key
    config.BAIDUAK = '91XLBaUcqugbPElkZ94Wgr2ihiCG8hNn';

    // 分页条数
    config.pageSize = 50;

    // ejs模板
    config.view = {
        defaultExtension: '.html',
        mapping: {
            '.html': 'ejs',
        },
    };
    config.ejs = {
        layout: 'layout.html',
    };

    // 定义日志路径
    exports.logger = {
        dir: '/data/performance/buildlogs',
    };

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
            url: 'mongodb://127.0.0.1:27019/performance',
            options: {
                poolSize: 20,
            },
        },
    };
    if (config.report_data_type === 'mongodb') {
        dbclients.db1 = {
            url: 'mongodb://127.0.0.1:27017/performance',
            options: {
                poolSize: 20,
            },
        };
    }

    // mongoose配置
    config.mongoose = {
        clients: dbclients,
    };

    config.bodyParser = {
        jsonLimit: '1mb',
        formLimit: '1mb',
    };

    config.security = {
        domainWhiteList: [ 'http://127.0.0.1:18090' ],
        csrf: {
            enable: false,
            ignore: '/api/v1/report/**',
        },
    };

    config.cors = {
        origin: '*',
        allowMethods: 'GET,PUT,POST,DELETE',
    };

    config.onerror = {
        all(err, ctx) {
            // 统一错误处理
            ctx.body = JSON.stringify({
                code: 1001,
                desc: err.toString().replace('Error: ', ''),
            });
            ctx.status = 200;
            // 统一错误日志记录
            ctx.logger.info(`统一错误日志：发现了错误${err}`);
        },
    };

    return config;
};
