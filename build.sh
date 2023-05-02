#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

rm -rf dist

# 生成静态文件
npm run docs:build

if [ $? -ne 0 ]; then
    echo ">>> build failed!!";
    exit
fi

# 进入生成的文件夹
cd dist

# 拷贝目录和文件
cp -r ../.github ./

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 把上面的 <USERNAME> 换成你自己的 Github 用户名，<REPO> 换成仓库名，比如我这里就是：
#git push -f git@gitee.com:chstudy/learning.git main:pages
git push -f git@github.com:chstudy/learning.git master:pages

if [ $? -ne 0 ]; then
#  git push -f git@gitee.com:chstudy/learning.git master:pages
  git push -f git@github.com:chstudy/learning.git master:pages
fi

cd -
git add -A
git commit -m "code update"
git push git@github.com:chstudy/learning.git master:master