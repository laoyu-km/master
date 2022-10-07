# Linux Nginx configuration

```bash
# 全局配置
# 定义Nginx运行的用户和用户组
# 设置运行用户，当运行NGINX时，进程所使用的用户，则进程拥有该用户对文件或目录的操作权限。
user www www;

#nginx进程数，建议设置为等于CPU总核心数。
#设置工作进程数量，一般情况下工作进程数等于CPU核心数。
#auto：设置此值，Nginx进程将自动检测 -> worker_processes auto
#当我们启动nginx,后使用ps -ef | grep nginx 可以看到除了master的nginx 还有相对应设置数量的worker process
# 配置允许生成的worker processes(工作进程)数
# 理论上来说 worker processes 值越大，可以支持的并发数量也越多，性能就越好
# 但实际上它的数量，还要受到服务器 CPU 处理器数量以及软件配置制约
# 从Nginx1.9.10开始可以使用auto值，系统自动检测 CPU 处理器数量，设置想要的工作进程数量
# 当然你设置的工作进程数量超过 CPU 处理器数量也行，但是这样就出现 CPU 的进程切换，影响性能
# 可以用lscpu命令来找出CPU的核数
worker_processes 8;

#设置工作进程绑定CPU核心，一个工作进程使用一个CPU核心，可以减少进程频繁切换导致CPU处理所导致的资源损耗。"0001"四位数表示CPU有四个核心，"1"在第几位表示使用第几个核心。
#设定nginx的worker进程工作在哪几个CPU核心上，上面的worker进程数量最好和这里的数量对应
#CPU几核心就用几位数，1表示使用，0表示不使用，从Nginx1.9.10可以使用auto值，系统自动设置
#这样绑定只是说明每个CPU只运行一个Nginx进程，并不能保证其他进程下次运行时，不会跑到当前这些CPU核心上去
#虽然限制了worker进程的范围，但是没有限制其他进程，如果想限制这些CPU核心不能被其他进程使用
#就只能做CPU隔离，在操作系统启动的时候就隔离出去。但这样对于内核级别的进程，比如中断还是可能会跑过去，所以
#真正做到严格隔离也可以，就是比较麻烦。
worker_cpu_affinity 0001 0010 0100 1000;

#2 CPU（2 Core） + 2 worker_processes（每个worker_processes 使用1个CPU）
#worker_processes 2; 
#worker_cpu_affinity 01 10;

#2 CPU（2 Core） + 8 worker_processes（每个worker_processes 使用1个CPU）
#worker_processes  8; 
#worker_cpu_affinity 01 10 01 10 01 10 01 10; (CPU与工作进程数量不对应时，多个工作进程抢占，轮流使用同一个CPU)

#4 CPU（4 Core） + 4 worker_processes（每个worker_processes 使用1个CPU）
#worker_processes 4;
#worker_cpu_affinity 0001 0010 0100 1000;

#8 CPU（8 Core） +2 worker_processes（每个worker_processes 使用1个CPU）
#worker_processes  2; 
#worker_cpu_affinity 10101010 01010101;

#8 CPU（8 Core） + 8 worker_processes（每个worker_processes 使用1个CPU）
#worker_processes 8;
#worker_cpu_affinity 00000001 00000010 00000100 00001000 00010000 00100000 01000000 10000000;
 
#全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]
#设置错误日志文件路径，可设置错误日志记录的级别。
#错误日志级别有：
#   debug    调试，将记录详细的大量调试信息，适合开发人员开启
#   info     信息，记录更多的通知信息，不重要的
#   notice   通知，记录通知信息，不重要的
#   warn     警告，记录警告信息
#   error    错误，记录错误信息
#   crit     严重，只记录非常严重的错误信息
# 语法 error_log  file/stderr [debug | info | notice | warn | error | crit | alert | emerg] ;
# ‘[]’:表示可选 ，‘|’ 表示或者
# file表示文件 ； stderr 表示输出文件名称 ，后面[]中表示数据的日志级别，当设置某一个级别后，比这一级别高的都会被记录下来，比如设置warn后| error | crit | alert | emerg都会被记录下来。默认是error_log logs/error.log error; 指定文件当前用户需要有写权限

error_log /usr/local/nginx/logs/error.log info;

#进程pid文件
#设置进程文件路径，运行NGINX会生成一个PID进程文件到指定路径，用于保证进程持久化运行。
# 语法： pid file -> file是指定存放路径和文件名称，默认是logs/nginx.pid。可以放相对和绝对路径
pid /usr/local/nginx/logs/nginx.pid;

#指定进程可以打开的最大描述符：数目
#工作模式与连接数上限
#这个指令是指当一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（ulimit -n）与nginx进程数相除，但是nginx分配请求并不是那么均匀，所以最好与ulimit -n 的值保持一致。
#现在在linux 2.6内核下开启文件打开数为65535，worker_rlimit_nofile就相应应该填写65535。
#这是因为nginx调度时分配请求到进程并不是那么的均衡，所以假如填写10240，总并发量达到3-4万时就有进程可能超过10240了，这时会返回502错误。
worker_rlimit_nofile 65535;

#【可配置调优项】
#worker进程的优先级，与使用 nice 命令完成类似：负数意味着更高的优先级。允许范围通常在 -20 到 20 之间。
worker_priority -10;

#定义SSL硬件加速器，如果支持HTTPS的话，每一个都创建SSL会话，加密、解密、会话建立和断开等这些对CPU的占用率非常高，
#一个服务器可以承载的HTTPS会话大概是HTTP会话的1/5左右。服务器可以安装硬件的SSL会话加速器，那么你这里就可以指定，
#这样SSL会话就不会占用CPU资源。这个就跟高端服务器网卡带特殊芯片一样都是为了减轻CPU负担。
ssl_engine device;

# 设置包含的其他配置文件，一些加载NGINX动态模块相关配置文件，由"load_moule"指令控制动态模块的加载。
# 语法 include file 
# file表示要引入的配置文件，支持相对路径，引入的文件对当前用户需要写权限
include /usr/share/nginx/modules/*.conf;

#锁文件，这个和events中的accept_mutex有关，如果这个参数是off，那么就不会出现锁文件。
lock_file /var/lock/nginx.lock


# 事件配置
events
{
    #参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型
    #是Linux 2.6以上版本内核中的高性能网络I/O模型，linux建议epoll，如果跑在FreeBSD上面，就用kqueue模型。
    #补充说明：
    #与apache相类，nginx针对不同的操作系统，有不同的事件模型
    #A）标准事件模型
    #Select、poll属于标准事件模型，如果当前系统不存在更有效的方法，nginx会选择select或poll
    #B）高效事件模型
    #Kqueue：使用于FreeBSD 4.1+, OpenBSD 2.9+, NetBSD 2.0 和 MacOS X.使用双处理器的MacOS X系统使用kqueue可能会造成内核崩溃。
    #Epoll：使用于Linux内核2.6版本及以后的系统。
    #/dev/poll：使用于Solaris 7 11/99+，HP/UX 11.22+ (eventport)，IRIX 6.5.15+ 和 Tru64 UNIX 5.1A+。
    #Eventport：使用于Solaris 10。 为了防止出现内核崩溃的问题， 有必要安装安全补丁。
    use epoll;

    # 设置网络连接序列化 只能在events块设置
    # 是否开启“惊群”，当某一时刻请求到来是否唤醒多个睡眠的进程
    # “惊群” 大意是指在 Nginx 多进程环境下，当某一时刻只有一个网络连接到来时，因为新连接会通知所有工作进程，
    #那么会导致所有所有睡眠进程都会被同时叫醒，但是只有一个进程可以获得连接。如果每次唤醒的进程数目太多，会影响一些性能。
    # 语法：accept_mutext on | off 
    # 默认是on状态， 也有说默认是off的
    accept_mutext off

    #如果启用了 accept_mutex，则指定另外工作进程请求新链接失败后，间隔多少毫秒可以发起第二次请求。默认500ms，不过如果accept_mutex是 
    #off，那就没有必要设置这个参数了。 
    accept_mutex_delay 500; # 时间单位是毫秒，默认为 accept_mutex_delay 500ms;

    # 设置是否允许同时接收多个网络连接 只能在events块设置
    # 每一个worker process都有能力接受多个新到达的网络连接。但是需要设置如下指令
    # 语法：multi_accept on | off 
    # 默认是off状态，即一个work process一次只能接受一个到达的网络连接
    multi_accept on

    #单个进程最大连接数（最大连接数=连接数*进程数）
    #根据硬件调整，和前面工作进程配合起来用，尽量大，但是别把cpu跑到100%就行。每个进程允许的最多连接数，理论上每台nginx服务器的最大连接数为。
    worker_connections 65535;

    #keepalive超时时间。
    keepalive_timeout 60;

    #客户端请求头部的缓冲区大小。这个可以根据你的系统分页大小来设置，一般一个请求头的大小不会超过1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。
    #分页大小可以用命令getconf PAGESIZE 取得。
    #[root@web001 ~]# getconf PAGESIZE
    #4096
    #但也有client_header_buffer_size超过4k的情况，但是client_header_buffer_size该值必须设置为“系统分页大小”的整倍数。
    client_header_buffer_size 4k;

    #这个将为打开文件指定缓存，默认是没有启用的，max指定缓存数量，建议和打开文件数一致，inactive是指经过多长时间文件没被请求后删除缓存。
    open_file_cache max=65535 inactive=60s;

    #这个是指多长时间检查一次缓存的有效信息。
    #语法:open_file_cache_valid time 默认值:open_file_cache_valid 60 使用字段:http, server, location 这个指令指定了何时需要检查open_file_cache中缓存项目的有效信息.
    open_file_cache_valid 80s;

    #open_file_cache指令中的inactive参数时间内文件的最少使用次数，如果超过这个数字，文件描述符一直是在缓存中打开的，如上例，如果有一个文件在inactive时间内一次没被使用，它将被移除。
    #语法:open_file_cache_min_uses number 默认值:open_file_cache_min_uses 1 使用字段:http, server, location  这个指令指定了在open_file_cache指令无效的参数中一定的时间范围内可以使用的最小文件数,如果使用更大的值,文件描述符在cache中总是打开状态.
    open_file_cache_min_uses 1;
    
    #语法:open_file_cache_errors on | off 默认值:open_file_cache_errors off 使用字段:http, server, location 这个指令指定是否在搜索一个文件是记录cache错误.
    open_file_cache_errors on;
}
 
 
 
#设定http服务器，利用它的反向代理功能提供负载均衡支持
http
{
    #文件扩展名与文件类型映射表
    #设置还包含其他配置文件，“mime.types”文件，记录MIME类型与文件后缀的映射关系，MIME类型是互联网媒体类型的缩写。所以该文件是用于WEB服务可以识别的、允许用户上传的这些后缀相关的媒体文件。
    # 定义MIME-Type ,默认如下 可以在http块，server和location块配置
    include mime.types;

    #默认文件类型
    #设置默认MIME类型，当用户上传一个文件，非“mime.types”文件中记录的后缀文件时的处理方式，则将该文件识别默认指定MIME类型的文件，"text/plain"表示将会保存为".txt"格式的文件。
    default_type text/plain;
    #default_type application/octet-stream;

    #设置类型哈希表的大小，单位为字节。用于将MIME类型的数据通过哈希后缓存到内存中，以提高对MIME类型映射表的读取效率。
    types_hash_max_size 2048;

    #默认编码
    # 设置字符集编码，防止NGINX对于中文返回的显示乱码。
    #charset utf-8;

    # 自定义服务日志
    # 这个是记录Nginx服务器提供服务过程应答前端请求的日志，我们用服务日志和之前的error_log加以区分。Nginx服务器支持对服务日志的格式、大小、输出等进行配置，需要使用两个指令，分别是access_log和log_format
    # a:    access_log指令语法：access_log path [format []buffer=size]          可以在http块，server块和location块中配置 
    # path:配置服务日志的文件存放的路径和名称 
    # format:可选项，自定义服务日志的格式字符串，也可以通过“格式串的名称，使用log_format指令定义好的格式，格式串的名称在log_format中定义 
    # size:配置临时存放日志的内存缓存区大小； 
    # 如果要取消服务日志的功能使用  accesss_log off;
    # access_log和log_format是联合使用的
    #定义日志格式，“main”表示该日志格式名，用于下方“access_log”访问日志中调用
    #        $remote_addr                远程访问地址
    #        $remote_user                远程访问用户
    #        $time_local                访问时间
    #        $request                请求的URL与HTTP协议
    #        $status                        请求状态，成功为200
    #        $body_bytes_sent        发送给客户端文件主机内容大小
    #        $http_referer                从哪个页面连接访问过来的
    #        $http_user_agent        客户端浏览器的相关信息
    #        $http_x_forwarded_for        远程访问地址，与remote_addr相同
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" ' '$status $body_bytes_sent "$http_referer" ' '"$http_user_agent" "$http_x_forwarded_for"'; 

    #服务器名字的hash表大小
    #保存服务器名字的hash表是由指令server_names_hash_max_size 和server_names_hash_bucket_size所控制的。参数hash bucket size总是等于hash表的大小，并且是一路处理器缓存大小的倍数。在减少了在内存中的存取次数后，使在处理器中加速查找hash表键值成为可能。如果hash bucket size等于一路处理器缓存的大小，那么在查找键的时候，最坏的情况下在内存中查找的次数为2。第一次是确定存储单元的地址，第二次是在存储单元中查找键 值。因此，如果Nginx给出需要增大hash max size 或 hash bucket size的提示，那么首要的是增大前一个参数的大小.
    server_names_hash_bucket_size 128;

    #客户端请求头部的缓冲区大小。这个可以根据你的系统分页大小来设置，一般一个请求的头部大小不会超过1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。分页大小可以用命令getconf PAGESIZE取得。
    client_header_buffer_size 32k;

    #客户请求头缓冲大小。nginx默认会用client_header_buffer_size这个buffer来读取header值，如果header过大，它会使用large_client_header_buffers来读取。
    large_client_header_buffers 4 64k;

    #设定通过nginx上传文件的大小
    client_max_body_size 8m;

    #配置文件允许sendfile方式传输文件 指令都可以在http块，server块和location块中配置
    #开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。
    #sendfile指令指定 nginx 是否调用sendfile 函数（zero copy 方式）来输出文件，对于普通应用，必须设为on。如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络IO处理速度，降低系统uptime。
    sendfile on;

    #如果size值大于0，Nginx进程的每一个worker process每次调用sendfile()传输的数据量最大不能超过这个值如果设置为0，则不限制。默认0；
    #语法：sendfile_max_chunk size;
    sendfile_max_chunk 8k

    #开启目录列表访问，合适下载服务器，默认关闭。
    autoindex on;

    #此选项允许或禁止使用socke的TCP_CORK的选项，此选项仅在使用sendfile的时候使用
    #启用或禁用TCP_NOPUSH套接字选项，"on" or "off"，"on"表示启用，启用此项的前提是必须开启"sendfile"，"off"表示禁用。有时候在传输一个响应数据时，可能会产生多个小块数据包传出，可能这个小块数据包头部大小为30字节，而真正数据信息只有1字节，在高并发环境下会导致网络拥塞、带宽不够用问题。开启此项则传出的数据包会积累一下在传出，可以防止网络拥塞，减少带宽的占用。
    tcp_nopush on;
     
    #启用或禁用TCP_NODELAY套接字选项，"on" or "off"，"on"表示启用，"off"表示禁用。此项与"tcp_nopush"的功能刚好相反，若开启此项则对于小块数据包不等待立即传输，有时候一个WEB应用期望发送小块数据时，则建议开启，当“tcp_nopush”和“tcp_nodelay”同时开启时，NGINX会平衡这两个功能的使用。
    tcp_nodelay on;

    #配置连接超时时间 指令都可以在http块，server块和location块中配置
    #长连接超时时间，单位是秒
    #设置保持客户端连接活跃状态的超时时间，单位为秒
    #语法：keepalive_timeout timeout [header_timeout]  
    #timeout:表示服务端对连接保持的时间。默认是75秒 
    #header_timeout:可选项，在应答报文头部的Keep_Alive域设置超时时间，
    keepalive_timeout 120;

    #单链接请求数上限 指令都可以在http块，server块和location块中配置
    #Nginx服务器和用户端建立会话连接后，用户通过此链接发送请求，指令keepalive_requests用于限制用户通过某一个连接向Nginx服务器发送请求的次数。默认值是100
    #语法：keepalive_requests number;
    keepalive_requests 50;

    #设置服务器将响应发送给客户端的超时时间，单位为秒
    send_timeout 60s;

    #设置还包含其他配置文件，我们可以将一些其他配置分离到另外一个文件中处理，避免主配置文件因为配置太多导致混乱不方便管理，比如下面的"server {}"，在NGINX中我们可以配置多个"server {}"则我们可以将每个"server {}"分离到另外一个配置文件中，即一个配置文件对应一个WEB站点。
     include /etc/nginx/conf.d/*.conf;



    #FastCGI相关参数是为了改善网站的性能：减少资源占用，提高访问速度。下面参数看字面意思都能理解。
    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
    fastcgi_buffer_size 64k;
    fastcgi_buffers 4 64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 128k;

    #gzip模块设置
    gzip on; #开启gzip压缩输出
    gzip_min_length 1k;    #最小压缩文件大小
    gzip_buffers 4 16k;    #压缩缓冲区
    gzip_http_version 1.0;    #压缩版本（默认1.1，前端如果是squid2.5请使用1.0）
    gzip_comp_level 2;    #压缩等级
    gzip_types text/plain application/x-javascript text/css application/xml;    #压缩类型，默认就已经包含textml，所以下面就不用再写了，写上去也不会有问题，但是会有一个warn。
    gzip_vary on;

    #开启限制IP连接数的时候需要使用
    #limit_zone crawler $binary_remote_addr 10m;



    #负载均衡配置
    upstream piao.jd.com {
     
        #upstream的负载均衡，weight是权重，可以根据机器配置定义权重。weigth参数表示权值，权值越高被分配到的几率越大。
        server 192.168.80.121:80 weight=3;
        server 192.168.80.122:80 weight=2;
        server 192.168.80.123:80 weight=3;

        #nginx的upstream目前支持4种方式的分配
        #1、轮询（默认）
        #每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。
        #2、weight
        #指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。
        #例如：
        #upstream bakend {
        #    server 192.168.0.14 weight=10;
        #    server 192.168.0.15 weight=10;
        #}
        #2、ip_hash
        #每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。
        #例如：
        #upstream bakend {
        #    ip_hash;
        #    server 192.168.0.14:88;
        #    server 192.168.0.15:80;
        #}
        #3、fair（第三方）
        #按后端服务器的响应时间来分配请求，响应时间短的优先分配。
        #upstream backend {
        #    server server1;
        #    server server2;
        #    fair;
        #}
        #4、url_hash（第三方）
        #按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，后端服务器为缓存时比较有效。
        #例：在upstream中加入hash语句，server语句中不能写入weight等其他的参数，hash_method是使用的hash算法
        #upstream backend {
        #    server squid1:3128;
        #    server squid2:3128;
        #    hash $request_uri;
        #    hash_method crc32;
        #}

        #tips:
        #upstream bakend{#定义负载均衡设备的Ip及设备状态}{
        #    ip_hash;
        #    server 127.0.0.1:9090 down;
        #    server 127.0.0.1:8080 weight=2;
        #    server 127.0.0.1:6060;
        #    server 127.0.0.1:7070 backup;
        #}
        #在需要使用负载均衡的server中增加 proxy_pass http://bakend/;

        #每个设备的状态设置为:
        #1.down表示单前的server暂时不参与负载
        #2.weight为weight越大，负载的权重就越大。
        #3.max_fails：允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream模块定义的错误
        #4.fail_timeout:max_fails次失败后，暂停的时间。
        #5.backup： 其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。

        #nginx支持同时设置多组的负载均衡，用来给不用的server来使用。
        #client_body_in_file_only设置为On 可以讲client post过来的数据记录到文件中用来做debug
        #client_body_temp_path设置记录文件的目录 可以设置最多3层目录
        #location对URL进行匹配.可以进行重定向或者进行新的代理 负载均衡
    }
     
     
     
    #虚拟主机的配置
    server
    {
        #监听端口
        #设置监听IPV4的地址与端口，地址为空表示监听所有，“default_server”即将此server设置为默认服务器， 
        #default_server: 如果没有设置这个参数，那么将会以在nginx.conf中找到的第一个server块作为默认server块
        listen 80 default_server;

        #设置监听IPV6的地址与端口。
        listen [::]:80 default_server;

        # 配置网络监听
        # 配置监听使用指令listen，方式有三种
        # 方式一：监听IP地址， 
        # 语法：listen address[:port] [default_server] [setfib=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [deferrred] [accept_filter=filter] [bind] [ssl]; 

        #方式二：监听端口， 
        #语法：listen port [default_server] [setfib=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferrred] [bind] [ipv6only= on | off] [ssl]; 

        #方式三：配置UNIX Domain Socket（在原有Socket框架上发展起来的IPC机制） 
        # 语法：listen unix:path  [default_server]  [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferrred] [bind]  [ssl];

        #address: IP地址，如果是IPv6的地址，需要使用“[]”括起来，比如[fe22::1]等 
        #port:端口号，如果只定义了IP地址 没有定义端口号，就使用80端口 
        #path: socket文件的路径，例/var/run/nginx.sock等 
        #default_server: 标识符，将此虚拟主机设置为address:port的默认主机 
        #sertfib=number: 使用这变量监听socket关联的路由表，目前只对FreddBSD起作用，不常用 
        #backlog=nubmer : 设置监听函数listen()最多允许多少网络连接同时处于挂起状态，在FreeBSD中默认是-1,其他平台默认是511 
        #rcvbuf=size: 设置监听socket接受缓冲区的大小 
        #sndbuf=size: 设置监听socket发送缓冲区的大小 
        #deferred: 标识符，将accept()设置为Deferred模式 
        #accept_filter=filter: 设置监听端口对请求的过滤，被过滤内容是不能被接受和处理。这个指令只在FreeBSD和NetBSD5.0+平台有效，filter可以设置为dataready或者httpready 
        #bind: 表示符，使用独立的bind()处理此address:port，一般情况下，对于端口相同而IP地址不相同的多个连接，Nginx服务将只能使用一个监听命令，并使用bind()处理端口相同的所有连接 
        #ssl：标识符，设置会话连接使用SSL模式进行，此标识符和Nginx服务器提供的HTTPS服务相关
        #常用例子：
        listen 123.22.3.10:8000; #监听具体的IP和具体端口上的连接 
        listen 123.22.3.10; #监听具体Ip的所有端口的连接 
        listen 8000; #监听具体端口上所有IP的连接，等同与 listen *:8000； 
        listen 123.22.3.10:8000 default_server backlog=1024; #设置123.22.3.10的连接请求默认由虚拟主机处理，并且允许最多1024网络连接出于挂起状态。

        #设置域名绑定，绑定一个域名。
        #域名可以有多个，用空格隔开
        #基于名称的虚拟主机配置
        #这里的主机指用server块对外提供的虚拟主机，设置了主机的名称并配置好了DNS，用户就可以使用这个名称向此虚拟主机发送请求了。配置注解名称的指令
        #语法： server_name name...; //name 可以多个，中间用空格并列
        server_name vison.com  ws.vison.com;  #这里有两个虚拟机名称，Nginx规定第一个为此虚拟机主要的名称
        server_name www.jd.com jd.com;

        #基于IP的虚拟主机配置
        #和基于名称的虚拟配置相同，也是使用server_name配置
        server_name 122.12.3.6;

        index index.html index.htm index.php;
        root /data/www/jd;

        #设置访问日志文件路径，用于记录每个访问请求，“main”调用上面日志格式
        access_log  /var/log/nginx/static_access.log  main;

        #对******进行负载均衡
        location ~ .*.(php|php5)?$
        {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            include fastcgi.conf;
        }
         
        #图片缓存时间设置
        location ~ .*.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires 10d;
        }
         
        #JS和CSS缓存时间设置
        location ~ .*.(js|css)?$
        {
            expires 1h;
        }
         
        #日志格式设定
        #$remote_addr与$http_x_forwarded_for用以记录客户端的ip地址；
        #$remote_user：用来记录客户端用户名称；
        #$time_local： 用来记录访问时间与时区；
        #$request： 用来记录请求的url与http协议；
        #$status： 用来记录请求状态；成功是200，
        #$body_bytes_sent ：记录发送给客户端文件主体内容大小；
        #$http_referer：用来记录从那个页面链接访问过来的；
        #$http_user_agent：记录客户浏览器的相关信息；
        #通常web服务器放在反向代理的后面，这样就不能获取到客户的IP地址了，通过$remote_add拿到的IP地址是反向代理服务器的iP地址。反向代理服务器在转发请求的http头信息中，可以增加x_forwarded_for信息，用以记录原有客户端的IP地址和原来客户端的请求的服务器地址。
        log_format access '$remote_addr - $remote_user [$time_local] "$request" '
        '$status $body_bytes_sent "$http_referer" '
        '"$http_user_agent" $http_x_forwarded_for';
         
        #定义本虚拟主机的访问日志
        access_log  /usr/local/nginx/logs/host.access.log  main;
        access_log  /usr/local/nginx/logs/host.access.404.log  log404;
         
        #location配置
        location / { 
            #设置访问位置（URI），即用户访问的URL的尾部部分。当匹配到请求的URI时，则呈现由"{ }"中定义的内容。location指令针对于匹配URI可以嵌入正则表达式，实现一些高级应用，详细用法请参考《HTTP配置高级指令》。 

            #location指令配置
            #这个location的值是匹配请求连接中的URI
            #语法格式：    location [= | ~ | ~* | ^~]  uri  { ... } 
            #a）uri表示待匹配的请求字符，可以是正则或者不是正则字符例如：vison.action 表示标准uri 
            #b) “[]”中括号中的是可选项，用来改变请求字符串和uri的匹配方式， #这里有四种： 
            #“=” 用于标准的uri(没有使用正则表达式等)前，要求请求字符串和uri严格匹配，如果匹配成功就停止搜索并立即处理请求 
            #“~” 用于表示uri包含正则表达式，并且区分大小写 
            #“~*”,用于表示uri包含正则表达式，并且不区分大小写 ，注意：如果包含uri正则表达式，必须使用“~” 或者 “~*” 标识 
            #“^~” ,用于标准uri(没有使用正则表达式)，要求Nginx服务器找到表示uri和请求字符串匹配度最高的location后，立即使用location处理请求，而不使用location块中的正则uri和请求字符串做匹配。
            #注意：浏览器在传送uri的时候会对部分字符url编码，例如空格编码为“%20”，问好编码为“%3f”等，“~”它可以对这些符号进行编码处理。例如如果URI为“/html/%20/data”,则当Nginx可以收到配置“~ /html/ /data” 同样也是匹配成功的

            #配置请求的根目录 这个通常是在location块中的配置

            #设置WEB应用根目录。
            #当web服务器接受到网络请求之后，首先需要在服务器端指定目录中寻找请求资源，在Nginx服务器中，指令root就是用来配置这个根目录的
            #语法：root path; 
            #其中path为Nginx服务器接收到请求以后查找资源的根目录路径，path变量中可以包含Nginx服务器预设的大多数变量，只有$document_root和$realpath_root不可以使用。
            root        /usr/share/nginx/html; 

            #更改location的uri --转发
            #语法：alias path; 
            #path:这个就为修改后的根路径，同样这个变量可以包含除了$document_root和$realpath_root的变量。
            location ~ ^/data/(.+.(htm|html))${
                alias /locationtest1/other/$1
            }
            #当location块接收到“/data/index.html”的请求时，匹配到alias指令的配置,Nginx服务器将到“locationtest1/other”目录下找到index.html并响应请求，可以看到，通过alias指令的配置，根路径已经从/data/ 更改为locationtest1/other了

            #设置默认首页文件，当用户访问域名或IP地址是自动索引呈现该文件中的内容，该文件在若为相对路径则会在WEB应用根目录下。
            #指令index用来设置网站默认首页、一般有两个作用： 
            #一是：用户在发出请求网站时，请求地址可以不写首页名称 
            #二是：可以对一个请求，根据请求内容而设置不同的首页
            index index.html;
            }

        #对 "/" 启用反向代理
        location / {

            proxy_pass http://127.0.0.1:88;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
             
            #后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             
            #以下是一些反向代理的配置，可选。
            proxy_set_header Host $host;

            #允许客户端请求的最大单文件字节数
            client_max_body_size 10m;

            #缓冲区代理缓冲用户端请求的最大字节数，
            #如果把它设置为比较大的数值，例如256k，那么，无论使用firefox还是IE浏览器，来提交任意小于256k的图片，都很正常。如果注释该指令，使用默认的client_body_buffer_size设置，也就是操作系统页面大小的两倍，8k或者16k，问题就出现了。
            #无论使用firefox4.0还是IE8.0，提交一个比较大，200k左右的图片，都返回500 Internal Server Error错误
            client_body_buffer_size 128k;

            #表示使nginx阻止HTTP应答代码为400或者更高的应答。
            proxy_intercept_errors on;

            #后端服务器连接的超时时间_发起握手等候响应超时时间
            #nginx跟后端服务器连接超时时间(代理连接超时)
            proxy_connect_timeout 90;

            #后端服务器数据回传时间(代理发送超时)
            #后端服务器数据回传时间_就是在规定时间之内后端服务器必须传完所有的数据
            proxy_send_timeout 90;

            #连接成功后，后端服务器响应时间(代理接收超时)
            #连接成功后_等候后端服务器响应时间_其实已经进入后端的排队之中等候处理（也可以说是后端服务器处理请求的时间）
            proxy_read_timeout 90;

            #设置代理服务器（nginx）保存用户头信息的缓冲区大小
            #设置从被代理服务器读取的第一部分应答的缓冲区大小，通常情况下这部分应答中包含一个小的应答头，默认情况下这个值的大小为指令proxy_buffers中指定的一个缓冲区的大小，不过可以将其设置为更小
            proxy_buffer_size 4k;

            #proxy_buffers缓冲区，网页平均在32k以下的设置
            #设置用于读取应答（来自被代理服务器）的缓冲区数目和大小，默认情况也为分页大小，根据操作系统的不同可能是4k或者8k
            proxy_buffers 4 32k;

            #高负荷下缓冲大小（proxy_buffers*2）
            proxy_busy_buffers_size 64k;

            #设置在写入proxy_temp_path时数据的大小，预防一个工作进程在传递文件时阻塞太长
            #设定缓存文件夹大小，大于这个值，将从upstream服务器传
            proxy_temp_file_write_size 64k;

            # proxy_temp_path和proxy_cache_path指定的路径必须在同一分区
            proxy_temp_path   /var/nginx/proxy_temp;
        }

        #设置网站的错误网页 可以在http块，server块和location块中配置
        #HTTP 2XX表示请求正常 
        #HTTP 3XX表示网站重定向 
        #HTTP 4XX表示客户端出现错误 
        #HTTP 5XX 表示服务端出现错误。
        #当匹配到响应代码，则将请求重定向到指定的URI。
        #语法： error_page code … [=[response] ] uri; 
        #code:表示要处理的HTTP错误代码， 
        #response:可选项，将code指定的错误代码转换为新的错误代码response #uri，错误页面的路径或者网址地址，如果设置为路径，则是以Nginx服务器安装路径下的html目录为根路径的相对地址，如果设置为网址，nginx服务器会直接访问该网址获取错误页面，并返回给用户端 例如 
        error_page 404 /404.html #通过 Nginx安装路径/html/404.html 响应404错误 
        error_page 404 http:/somewebsite.com #出现404错误，直接响应这个连接 
        error_page 410=310 /empty.gif #当产生410HTTP消息时，使用Nginx安装路径/html/empty.gif 返回用户端310消息 
        # 如果需要更改error_page 默认的安装路径，怎么修改呢，那么就需要添加location就可以了。 例如：
        location /404.html{
            root  /myserver/errorpages/
        } 
        #首先捕获到“/404.html页面”请求，然后将请求定向到新的路径下面

        #匹配上面重定向的URI，则呈现相关响应代码的会呈现给用户的内容。若"{}"为空则返回默认页面。
        location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }


        #基于IP配置Nginx的访问权限 可以在http块，server块和location块中配置
        #Nginx配置通过两种途径支持基本访问权限控制，其中一种是由HTTP标准模块ngx_http_access_module支持的，其通过IP来判断客户端是否拥有对Nginx的访问权限
        #a） allow指令，用于设置允许访问Nginx的客户端IP,
        #语法： allow address | CIDR | all ; 
        #address：表示允许访问的客户端IP,不支持同时设置多个，如果需要多个IP,那么需要重复使用allow命令 
        #CIDR:允许访问的客户端的CIDR地址，如果202.80.18.22/25，前面的32位IP地址，后面“/25”代表该IP地址中前25位网络部分，其余位表示主机部分。 #all:代表允许所有客户端访问。
        allow all;
        #从Nginx 0.8.22 该命令也支持IPv6地址。例如：
        allow 2301:333:e000::8001;

        #b） 另一个指令是deny，作用刚好和allow相反，用来禁止访问Nginx的IP 
        #语法: deny address | CIDR | all ;  
        deny all;
         
         
        #设定查看Nginx状态的地址
        location /NginxStatus {
            stub_status on;
            access_log on;
            auth_basic "NginxStatus";
            auth_basic_user_file confpasswd;
            #htpasswd文件的内容可以用apache提供的htpasswd工具来产生。
        }
         
        #本地动静分离反向代理配置
        #所有jsp的页面均交由tomcat或resin处理
        location ~ .(jsp|jspx|do)?$ {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://127.0.0.1:8080;
        }
         
        #所有静态文件由nginx直接读取不经过tomcat或resin
        location ~ .*.(htm|html|gif|jpg|jpeg|png|bmp|swf|ioc|rar|zip|txt|flv|mid|doc|ppt|
        pdf|xls|mp3|wma)$
        {
            expires 15d; 
        }
         
        location ~ .*.(js|css)?$
        {
            expires 1h;
        }
    }
}
```

