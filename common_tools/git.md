## git 初使用设置
- 全局用户名设置, 可以对某个仓库指定不同的用户和user。 
```
 git config --global user.name "alucardkml"
```

- 全局用户邮箱设置, 可以对某个仓库指定不同的用户和Email。 
```
git config --global user.email "alucardkml@163.com"              
```

- 设置git管理仓库,仓库初始化
```
git init               
```

## git config 增删改查
1. 查看系统config
```
git config --system --list
```
2. 查看当前用户(global)配置
```
git config --global --list
```
3. 查看当前仓库配置信息
```
git config --local --list
```
4. git config 增删改查
```
//增
git config --global --add user.sex "female"
//改
git config --global user.sex "male"
//查
git config --global --list
git config --global user.sex
//删
git config --global --unset user.sex
```

## git的基本使用
- 把修改内容提交到git暂存区，不放到暂存区的任何修改，都不会加如到commit中
```
git add "filename" // 如果不跟filename，则会提交最近修改的文件          
```
- 把所有内容提交到暂存区
```
git add --all
```

- 把暂存区的所有内容提交到当前分支
```
git commit  -m (输入本次提交的说明)              
git commit -am "版本号或版本说明" // 一步提交完成提交
```

- 查看git仓库当前状态
```
git status
```

- 查看工作区文件和暂存区文件的区别
```
git diff "filename"
```

- 查看工作区和版本库里最新版本文件的区别
```
git diff HEAD -- "filename"
```

- 查看git日志
```
git log
```

- 回退到上一个版本
```
git reset --hard HEAD^
```

- 回退到上上一个版本
```
git reset --hard HEAD^^
```

- 回退当前往上100个版本
```
git reset --hard HEAD~100
```

- 每一次命令记录
```
git reflog
```

- 回退或前进到到指定版本号的版本
```
git reset --hard "commit id"
```

- checkout -- "filename" 丢弃工作区的修改,没有"--",就变成切换分支命令，丢弃工作区修改有两种情况:

  1. 一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
   ```
   git checkout -- "filename"
   ```
  2. 一种是readme.txt修改后添加到了暂存区；
   ```
   git reset "filename" //撤销暂存区修改
   git checkout -- "filename" // 丢弃工作区的修改
   ```
  3. 一种是readme.txt已经添加到暂存区后，又作了修改或删除，现在，撤销修改就回到添加到暂存区后的状态。
   ```
    git checkout -- "filename" //丢弃添加到暂存区后的修改
    git reset "filename" //撤销暂存区修改
    git checkout --"filename" // 丢弃暂存区前的修改
   ```

> git checkout 其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”
> git checkout -- "filename" 命令中的 -- 表示命令行在 -- 之后没有更多的选项。这样的好处是，如果碰巧有一个分支与文件名重名，仍然可以恢复该文件，而不是切换到同名的分支。

- 从版本库中删除文件
```
git rm "filename" // 只是工作区的修改
git add "filename"// 将删除提交至暂存区
git commit -m "remove filename" //提交文件删除
```
- 恢复删除的文件
  1. 只是工作区删除
   ```
    git checkout -- "filename"
   ```
  2. 删除提交至暂存区
   ```
    git reset "filename"
    git checkout -- "filename"
   ```
  3. 已经commit了的删除
   ```
    git reflog // 获取commit id
    git reset --hard "commit id"
   ```
## git stash
- 把当前工作区隐藏起来，以后恢复现场后继续工作
```
git stash
```
- 查看所有被隐藏的文件列表
```
git stash list
```
- 恢复被隐藏的文件，但是内容不删除
```
git stash apply
```
- 删除文件（放弃被隐藏文件）
```
git stash drop
```
- 恢复文件的同时也删除文件
```
git stash pop
```

## git 分支操作
> 再git中，每次提，git都会把他们串成一条时间先，这条时间线就是一个分支，再git 里，切换分支可以理解为切换时间线。
> 再版本控制中，使用多条线同时推进多个任务，每条线成为一个分支。

- 创建分支
```
git branch "branchname"
```
- 查看分支
```
git branch -v
```
- 切换分支
```
git checkout branchname
```
- 合并分支(merge/rebase)
  1. 切换到接受合并的分支
    ```
    git checkout "接受合并的分支"
    ```
  2. 执行merge命令
    ```
    git merge "待合并的分支"
    ```
- 删除分支
```
git branch -d "branchname"
```

## git 远程仓库
### gitee 远程仓库
1. 创建SSH Key: 运行命令 ssh-keygen -t rsa -C "your email",会有三次提示输入，直接回车即可
```
ssh-keygen -t rsa -C "laoyugou@gmail.com"
```
再用户目录下生成.ssh目录，里面有一个id_rsa.pub 文件，保存的就是公钥

2. 验证密钥是否添加成功
```
ssh -T git@git.oschina.net
```
git 使用SSH链接第一次验证服务器的key时，需要进行确认，此时输入yes回车即可

3. 码云上创建仓库

4. git关联远程库（GitHub）
```
git remote add origin https://github.com/alucardkml/learngit.git

// git remote add origin git@github.com:alucardkml/learngit.git
```
5. 查看远程仓库
```
git remote -v
```
6. 首次推送master分支的所有内容

-u参数 Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来.
```
git push -u origin master
```
7. git push 的使用 git push [远程主机名] [分支名]:[远程分支名] 
```
// git push [远程主机名] [分支名]:[远程分支名] 
git push origin master
```
8. git pull 的使用: git pull = git fetch + git merge
> git pull 命令基本上就是 git fetch 和 git merge 命令的组合体，Git 从指定的远程仓库中抓取内容，然后马上尝试将其合并进你所在的分支中。
[git pull 的使用](http://note.youdao.com/s/OtUMfaKv) 
```
git pull [远程主机名] [远程分支名]:[本地分支名]
```

    从远程仓库中获得数据，可以执行：
    ```
    $ git fetch [remote-name]
    ```
    这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。 
    
    但是注意的是 git fetch 并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。 
    
    如果你使用 clone 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。 所以，git fetch origin 会抓取克隆（或上一次抓取）后新推送的所有工作。
    
    由于fetch命令后还要再做一步merge命令的操作，所以使用 git pull 命令来自动的抓取然后合并远程分支到当前分支。 （相当于一次执行fetch加merge命令）这可能会是一个更简单或更舒服的工作流程。
    git fetch 完整流程
```
git fetch [remote-name]
git merge
```

9. 从远程库克隆

使用git@github.com:XXXX/XXXX命令需要注意：

1.如果没有设置SSH Key，需要设置后才能使用；

2.如果设置了SSH KEY还报错，大概率是本机git仓库没有和SSH Key对应上

 使用:ssh-add d/gitTest/ssh/id_rsa(本机上id_rsa文件的地址)

 :ssh-add 抱"Could not open a connection to your authentication agent"的错误

执行:ssh-agent bash;实测有用，具体出错原因未知
```
git clone https://github.com/alucardkml/gitskills.git

git clone git@github.com:alucardkml/gitskills.git
```

10. 设置远程地址别名
- 查看远程地址别名
```
git remote -v
```
- 增加远程地址
```
git remote add [别名] [远程地址]
```
- 删除远程地址
```
git remote remove [别名]
```

11. 解决每次提交远程仓库都需要输入用户名和密码的问题
```
// 执行下面语句，在~/.gitconfig目录下多出一个文件，用来记录你的密码和帐号
git config --global credential.helper store

// 再最后输入一次正确的用户名和密码，就可以成功的记录下来，这是最后一次麻烦啦！
git pull
```

12. 解决冲突
- 如果不是基于GitHub远程哭的最新版所做的修改，不能推送，必须先拉取 -> pull。
- 拉去下来后如果进入冲突状态，则修改-> add -> commit 即可
- 工作时建议每次push之前先pull一次如果发现有冲突，就需要和另一位操作者进行沟通，看如何处理冲突，push后告知操作同一文件的人进行一次pull

13. 远程仓库邀请成员

Gitee中： 设置-> 数据管理->私有仓库成员->选中仓库->邀请成员


## gitignore 的使用

### gitignore 设置

#### Git忽略文件的原则
-  忽略操作系统自动生成的文件，比如缩略图等；
-  忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；
-  忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

#### .gitignore文件的使用方法

- 首先，在你的工作区新建一个名称为.gitignore的文件。

- 然后，把要忽略的文件名填进去，Git就会自动忽略这些文件。

- 不需要从头写.gitignore文件，GitHub已经为我们准备了各种配置文件，只需要组合一下就可以使用了。


有时对于git项目下的某些文件，我们不需要纳入版本控制，比如日志文件或者IDE的配置文件，此时可以在项目的根目录下建立一个隐藏文件 .gitignore（linux下以.开头的文件都是隐藏文件），然后在.gitignore中写入需要忽略的文件。

```bash
[root@kevin ~]# cat .gitignore
*.xml
*.log
*.apk
```

- .gitignore注释用'#', *表示匹配0个或多个任意字符，所以上面的模式就是要忽略所有的xml文件,log文件和apk文件。

= .gitignore配置文件用于配置不需要加入版本管理的文件，配置好该文件可以为版本管理带来很大的便利。

#### .gitignore忽略规则的优先级

    在 .gitingore 文件中，每一行指定一个忽略规则，Git检查忽略规则的时候有多个来源，它的优先级如下（由高到低）：

1. 从命令行中读取可用的忽略规则

2. 当前目录定义的规则

3. 父级目录定义的规则，依次递推

4. $GIT_DIR/info/exclude 文件中定义的规则

5. core.excludesfile中定义的全局规则

```bash
# gitignore 的全局设置
git config --global core.excludesfile ~/.gitignore
```

#### .gitignore忽略规则的匹配语法
    在 .gitignore 文件中，每一行的忽略规则的语法如下：

1. 空格不匹配任意文件，可作为分隔符，可用反斜杠转义

2. 以“＃”开头的行都会被 Git 忽略。即#开头的文件标识注释，可以使用反斜杠进行转义。

3. 可以使用标准的glob模式匹配。所谓的glob模式是指shell所使用的简化了的正则表达式。

4. 以斜杠"/"开头表示目录；"/"结束的模式只匹配文件夹以及在该文件夹路径下的内容，但是不匹配该文件；"/"开始的模式匹配项目跟目录；如果一个模式不包含斜杠，则它匹配相对于当前 .gitignore 文件路径的内容，如果该模式不在 .gitignore 文件中，则相对于项目根目录。

5. 以星号"*"通配多个字符，即匹配多个任意字符；使用两个星号"**" 表示匹配任意中间目录，比如`a/**/z`可以匹配 a/z, a/b/z 或 a/b/c/z等。

6. 以问号"?"通配单个字符，即匹配一个任意字符；

7. 以方括号"[]"包含单个字符的匹配列表，即匹配任何一个列在方括号中的字符。比如[abc]表示要么匹配一个a，要么匹配一个b，要么匹配一个c；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配。比如[0-9]表示匹配所有0到9的数字，[a-z]表示匹配任意的小写字母）。

8. 以叹号"!"表示不忽略(跟踪)匹配到的文件或目录，即要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。需要特别注意的是：如果文件的父目录已经被前面的规则排除掉了，那么对这个文件用"!"规则是不起作用的。也就是说"!"开头的模式表示否定，该文件将会再次被包含，如果排除了该文件的父级目录，则使用"!"也不会再次被包含。可以使用反斜杠进行转义。

需要谨记：git对于.ignore配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效；

#### .gitignore忽略规则简单说明
```bash
#               表示此为注释,将被Git忽略
*.a             表示忽略所有 .a 结尾的文件
!lib.a          表示但lib.a除外
/TODO           表示仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/          表示忽略 build/目录下的所有文件，过滤整个build文件夹；
doc/*.txt       表示会忽略doc/notes.txt但不包括 doc/server/arch.txt
 
bin/:           表示忽略当前路径下的bin文件夹，该文件夹下的所有内容都会被忽略，不忽略 bin 文件
/bin:           表示忽略根目录下的bin文件
/*.c:           表示忽略cat.c，不忽略 build/cat.c
debug/*.obj:    表示忽略debug/io.obj，不忽略 debug/common/io.obj和tools/debug/io.obj
**/foo:         表示忽略/foo,a/foo,a/b/foo等
a/**/b:         表示忽略a/b, a/x/b,a/x/y/b等
!/bin/run.sh    表示不忽略bin目录下的run.sh文件
*.log:          表示忽略所有 .log 文件
config.php:     表示忽略当前路径的 config.php 文件
 
/mtk/           表示过滤整个文件夹
*.zip           表示过滤所有.zip文件
/mtk/do.c       表示过滤某个具体文件
 
被过滤掉的文件就不会出现在git仓库中（gitlab或github）了，当然本地库中还有，只是push的时候不会上传。
 
需要注意的是，gitignore还可以指定要将哪些文件添加到版本管理中，如下：
!*.zip
!/mtk/one.txt
 
唯一的区别就是规则开头多了一个感叹号，Git会将满足这类规则的文件添加到版本管理中。为什么要有两种规则呢？
想象一个场景：假如我们只需要管理/mtk/目录中的one.txt文件，这个目录中的其他文件都不需要管理，那么.gitignore规则应写为：：
/mtk/*
!/mtk/one.txt
 
假设我们只有过滤规则，而没有添加规则，那么我们就需要把/mtk/目录下除了one.txt以外的所有文件都写出来！
注意上面的/mtk/*不能写为/mtk/，否则父目录被前面的规则排除掉了，one.txt文件虽然加了!过滤规则，也不会生效！
 
----------------------------------------------------------------------------------
还有一些规则如下：
fd1/*
说明：忽略目录 fd1 下的全部内容；注意，不管是根目录下的 /fd1/ 目录，还是某个子目录 /child/fd1/ 目录，都会被忽略；
 
/fd1/*
说明：忽略根目录下的 /fd1/ 目录的全部内容；
 
/*
!.gitignore
!/fw/ 
/fw/*
!/fw/bin/
!/fw/sf/
说明：忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录；注意要先对bin/的父目录使用!规则，使其不被排除。
```
> 提示：如果你不慎在创建.gitignore文件之前就push了项目，那么即使你在.gitignore文件中写入新的过滤规则，这些规则也不会起作用，Git仍然会对所有文件进行版本管理。简单来说出现这种问题的原因就是Git已经开始管理这些文件了，所以你无法再通过过滤规则过滤它们。所以大家一定要养成在项目开始就创建.gitignore文件的习惯，否则一单push，处理起来会非常麻烦。


## git warning and error
-  warning:LF will be replaced by CRLF in readme.txt
[解决办法](http://note.youdao.com/s/2cVcycKn)
```
git config --global core.autocrlf true/false/input // 具体看操作系统，Windows就设置false
```

-  git merge的时候遇到了冲突，怎么解决？
[解决办法](http://note.youdao.com/s/QaRbrZis) 
    - 推荐打开冲突文件后手动解决

-  Windows 环境下配置 git bash 的 HOME 默认路径
    1. 再windows 环境变量中新增HOME变量，值为想要修改的路径
    ```
    HOME D:\Program Files\GitFiles
    ```

    2. 修改profile相关参数，git version 1.x适用
    ```
    // 打开Git/etc/profile,找到
    HOME="$(cd "$HOME" ; pwd)"
    export PATH="$HOME/bin:$PATH"
    
    // 增加两行，修改后代码如下
    HOME="你想要修改的HOME路径"
    HOME="$(cd "$HOME" ; pwd)"
    cd
    export PATH="$HOME/bin:$PATH"
    //重启Git bash
    ```
- Windows 环境下修改git bash 启动初始位置
    1. gitbash 快捷方式 -> 右键属性 -> 修改起始位置
    2. 修改Git/etc/profile文件，新版本还不知道怎么修改

- git push 远程仓库时报Updates were rejected because the tip of your current branch is behind
> 原因：因为远程repository和我本地的repository冲突导致的，而我在创建版本库后，在github的版本库页面点击了创建README.md文件的按钮创建了说明文档，但是却没有pull到本地。这样就产生了版本冲突的问题。

**解决办法**
    1. 使用强制push的方法：
    ```
    $ git push -u origin master -f
    ```
    这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。
    
    2. push前先将远程repository修改pull下来
    ```
    $ git pull origin master
    
    $ git push -u origin master
    ```
    
    3.若不想merge远程和本地修改，可以先创建新的分支：
    ```
    $ git branch [name]
    ```
    然后push
    ```
    $ git push -u origin [name]
    ```

- git pull 时报 fatal: refusing to merge unrelated histories
> 出现这个问题的最主要原因还是在于本地仓库和远程仓库实际上是独立的两个仓库。假如我之前是直接clone的方式在本地建立起远程github仓库的克隆本地仓库就不会有这问题了。
查阅了一下资料，发现可以在pull命令后紧接着使用--allow-unrelated-history选项来解决问题（该选项可以合并两个独立启动仓库的历史）。
```
$ git pull origin master --allow-unrelated-histories
```


## git使用中的问题

### gitee(git) 修改密码后如何处理
- windows 下修改
控制面板 -> 用户账户 -> 点击左侧管理你的凭证 -> windows凭证 -> 找到自己的账号凭证，点击修改即可

- Linux 下修改
```bash
git credential-manager uninstall # 清空密码
git config --global credential.helper store # 保存密码，需要下次执行命令时再输入一次密码
```

### 关于报错“! [rejected]master -＞ master (non-fast-forward)”的解决方法
- 出现这个问题是因为github中的README.md文件不在本地代码目录中，可以通过如下命令进行代码合并
```bash
git pull --rebase origin master
```
然后再
```bash
git push origin master
```
便可上传成功

### 文件git add 后，误使用了git reset --hard^, 如何找回文件

```bash
# 找出git add 过的所有文件
git fsck --lost-found 

# 拷贝到另一个安全的文件夹

# 查找包含 jayden (能想到的比较独特的词语) 的文件并拷贝到指定文件夹
grep -l "jayden" ./* | xargs -i mv {} ./html/

把找到后的文件，从新命名

```

### gitee(git) 修改密码后如何处理
- windows 下修改
控制面板 -> 用户账户 -> 点击左侧管理你的凭证 -> windows凭证 -> 找到自己的账号凭证，点击修改即可

### git 合并本地分支
```bash
git merge "branch name"
```

### gitee(git) 修改密码后如何处理
- windows 下修改
控制面板 -> 用户账户 -> 点击左侧管理你的凭证 -> windows凭证 -> 找到自己的账号凭证，点击修改即可

- Linux 下修改
```bash
git credential-manager uninstall # 清空密码
git config --global credential.helper store # 保存密码，需要下次执行命令时再输入一次密码
```

### 关于报错“! [rejected]master -＞ master (non-fast-forward)”的解决方法
- 出现这个问题是因为github中的README.md文件不在本地代码目录中，可以通过如下命令进行代码合并
```bash
git pull --rebase origin master
```
然后再
```bash
git push origin master
1
便可上传成功



