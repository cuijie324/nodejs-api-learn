const dns = require('dns');

// 使用操作系统工具解析域名
// dns.lookup('archive.org', (err, address, family) => {
//     console.log('address: %j family: IPV%s', address, family);
//     console.log(address);
// });

//查询域名服务器
// dns.resolve4('archive.org', (err, addresses) => {
//     if (err) throw err;

//     console.log(`addresses: ${JSON.stringify(addresses)}`);

//     addresses.forEach((a) => {
//         dns.reverse(a, (err, hostnames) => {
//             if (err) throw err;
//             console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`)
//         })
//     })
// })

// const resolver = new dns.Resolver();
// resolver.resolve4('archiver.org', (err, addresses) => {
//     console.log(err, addresses);
// });

// console.log(dns.getServers());

// dns.lookupService('127.0.0.1', 443, (err, hostname, service) => {
//     console.log(err, hostname, service);
// });

// dns.resolve4('127.0.0.1', { ttl: false }, console.log);
// dns.resolveAny('baidu.com', console.log);
dns.reverse('123.125.115.110', console.log);
