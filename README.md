nodejs日志记录对比
log4js
winston

node log4js/index.js（不完美）  
 * 实际测试运行发现，以下配置的运行结果，是按日期，最多daysToKeep个文文件循环记录。相当于是最多daysToKeep个文件，然后日志文件名中包含了日期。
 * 
 * backups 并没有生效
 * 
 * 第二次测试发现，如果每天记录一个，每天达不到最大存储时，是不会删除的。这样会有问题，日志会太多，一年或者半年后，磁盘就满了，这样是不行的


node log4js/index2.js  
按大小循环记录日志

node winston/index.js（不完美）
日志确实会保留maxFiles天，但每天产生的日志数量无法控制，也就无法控制日志的总大小，也容易把磁盘撑爆


node winston/index2.js
 * 实际测试运行结果，日志最多保留maxFiles个，每个日志大小maxSize，如果一天内日志过多，超过了maxSize，则可能会删除其他日志的数据。
 * 整个目录下最多maxFiles个，





# 总结
很抱歉，目前还未找到，同时按日期和大小循环记录日志的组件

目前我使用的方式是按大小循环记录的，就是log4js/index2.js




