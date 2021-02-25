var path = require('path');
var log4js = require('log4js');

/**
 * 
 * 实际测试运行发现，以下配置的运行结果，是按日期，最多daysToKeep个文文件循环记录。相当于是最多daysToKeep个文件，然后日志文件名中包含了日期。
 * 
 * backups 并没有生效
 * 
 * 第二次测试发现，如果每天记录一个，每天达不到最大存储时，是不会删除的。这样会有问题，日志会太多，一年或者半年后，磁盘就满了，这样是不行的
 * 
 **/


log4js.configure({
    appenders: {
        console: {
            "type": "console",
            "category": "console"
        },
        everything: {
            type: 'dateFile',
            pattern: "yyyy-MM-dd",
            keepFileExt: true,  //保存文件的扩展名file.log变成file.2017-05-30.log代替file.log.2017-05-30）
            maxLogSize: 1024 * 1024 * 1, //1024 * 1024 * 1 = 1M
            backups: 2,     //可选，默认值= 5）-日志滚动期间要保留的旧日志文件数。
            alwaysIncludePattern: true,     //默认为false）-在当前日志文件以及备份文件的名称中包含模式。
            daysToKeep: 3, //如果该值大于零，则日志滚动期间将删除超过该天数的文件。
            filename: 'log/run.log',
        },
    },
    "categories": {
        "default": {
            "appenders": [
                "everything",
                "console"
            ],
            //设置日志记录级别，记录当前级别及以后 ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
            //调试时可以设置为all，线上可设置为INFO
            "level": "ALL"
        }
    },
    //若您的 app 使用了 pm2，则这里必须设置为true，否则日志将不会工作（另外您还得下载 pm2-intercom作为 pm2模块: pm2 install pm2-intercom）
    "pm2": true,
    //(默认 ‘NODE_APP_INSTANCE’)：如果您使用pm2并更改了默认名称，则这里必须要设置。
    // pm2InstanceVar: 'INSTANCE_ID',
    //使用的 log4js 忽略集群环境（clustered environments）或者你在 pm2 日志中遇到了麻烦。每一个工作进程都将进行自己的日志记录。请小心使用这里如果你要把日志记录输出到文件。
    // disableClustering: true,
    "replaceConsole": true
});


var log = require('log4js').getLogger(path.basename(__filename));


for (let index = 0; index < 1000; index++) {
    log.info('Hello World!' + index);
    log.info('app start...');
    // log.trace('log trace test');
    // log.debug('log debug test');
    // log.info('log info test');
    // log.warn('log warn test');
    // log.error('log error test');
    // log.fatal('log fatal test');
}