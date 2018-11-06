// linux的基本命令

`touch 文件名` // 新建文件
`rm 文件名` // 删除文件
`mkdir 文件夹` // 新建文件夹
`rm -r 文件夹` // 删除文件夹和目录下的文件
`cat 文件` // 查看一个文件


// vi 编辑器
`command mode | insert mode | last line mode
command mode 按 i 进入 insert mode， 按 : 进入 last line mode
insert mode 按 ESC 进入 command mode

last line mode ： 
  :w filename 将文章以指定的文件名filename保存
  :wq 存盘并退出
  :q! 不存盘强制退出`

// 文件权限
`ls -l ===> drwxr-xr-x
  第一个字符 文件(-) 目录(d) 链接(l)
  第一组 文件所有者的权限
  第二组 与文件所有者同一组的用户权限
  第三组 不与文件所有者同组的其他用户的权限
` 
// 4 代表读权限，2 代表写权限，1 代表执行权限
// 7 = 4 + 2 + 1 可读可写可执行 以此类推
`chmod -R 755 abc`
`对于文件 r --> 读 | w --> 写 | x --> 执行
 对于文件夹 r --> 读文件清单内容 | w --> 修改目录内容 即增删改文件或目录 | x --> 能否切换该目录为工作环境 例子: cd 命令`
// 根分区和 /etc 不要更改权限

// linux 用户及用户组
// 添加用户 
`useradd [options] username
  -g 用户组 `
// 更改密码 
`passwd [用户名]`
// 创建用户组
`group [-r] 用户组名称`