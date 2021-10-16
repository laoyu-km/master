#### 文件git add 后，误使用了git reset --hard^, 如何找回文件

```git
# 找出git add 过的所有文件
git fsck --lost-found 

# 拷贝到另一个安全的文件夹

# 查找包含 jayden (能想到的比较独特的词语) 的文件并拷贝到指定文件夹
grep -l "jayden" ./* | xargs -i mv {} ./html/

把找到后的文件，从新命名

```

## 
