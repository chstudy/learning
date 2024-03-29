const fs = require('fs')
const path = require('path');
const nav = require("./nav.js");
const sidebar = require("./sidebar.js");
const footer = require("./footer.js");
const extraSideBar = require("./extraSideBar.js");

module.exports = {
    title: '沧海Learning',
    description: '欢迎来到沧海的Learning空间！',
    dest: './dist',
    base: '/learning/',
    devServer: {
        https: true,
        key: fs.readFileSync(path.resolve(__dirname, './localhost+1-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, './localhost+1.pem'))
    },
    port: '7778',
    head: [
        // 站点图标
        ['link', {rel: 'icon', href: '/img/chbcjs.png'}],
        ['link', {rel: 'stylesheet', href: '/css/style.css'}],
        ['script', {charset: 'utf-8', src: '/js/main.js'}],
        // 百度统计
        [
            'script', {},
            `var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?3f8fba7c877eb1d47402d98a0c737625";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();`
        ],
        // SEO
        ['meta', { name: 'keywords', content: '沧海, 编程学习路线, 编程知识百科, Java, 编程导航, 前端, 后端, 全栈, 开发, 编程分享, 项目, IT, 求职, 面经' }],
    ],
    // 生成永久链接
    permalink: "/:slug",
    // 监听文件变化，热更新
    extraWatchFiles: [".vuepress/*.ts", ".vuepress/sidebars/*.ts"],
    markdown: {
        // 开启代码块的行号
        lineNumbers: false,
        // 支持 4 级以上的标题渲染
        extractHeaders: ["h2", "h3", "h4", "h5", "h6"],
        extendMarkdown: md => {
            md.use(function (md) {
                const fence = md.renderer.rules.fence
                md.renderer.rules.fence = (...args) => {
                    let rawCode = fence(...args);
                    // rawCode = rawCode.replace(/<span class="token comment">\/\/ try-link https:\/\/(.*)<\/span>\n/ig, '<a href="$1" class="try-button" target="_blank">Try</a>');
                    return `${rawCode}`
                }
            })
        }
    },
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    theme: 'reco',

    // 主题配置
    themeConfig: {
        nav,
        sidebar,
        subSidebar: 'auto',
        sidebarDepth: 2,
        lastUpdated: '上次更新',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },

        // GitHub 仓库位置
        repo: "chstudy/learning",
        docsBranch: "master",

        // 编辑链接
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！',

        // 底部版权信息
        footer,
        // 额外右侧边栏
        extraSideBar,
        // valineConfig: {
        //     appId: 'OmzEr7EfKyCiBv3El5QCwJYe-gzGzoHsz',
        //     appKey: 'WaJowe0aLDnpuBVsyZi5uEM6',
        // }
        // vssueConfig: {
        //     platform: 'github',
        //     owner: 'chstudy',
        //     repo: 'learning',
        //     clientId: 'c6a9eb82fc501581c333',
        //     clientSecret: '76680021413f9aa85cbab4bab575d3be09dbc7e5',
        // }
    },
    plugins: [
        ["@vuepress/back-to-top"],
        // Google 分析
        [
            "@vuepress/google-analytics",
            {
                ga: "GTM-WVS9HM6W", // 补充自己的谷歌分析 ID，比如 UA-00000000-0
            },
        ],
        // 图片点击放大
        ["@vuepress/medium-zoom"],
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    return new Date(timestamp).toLocaleDateString();
                }
            }
        ],
        // 代码复制
        [
            require('./vuepress-plugin-code-copy'),
            {
                'copybuttonText': '复制',
                'copiedButtonText': '已复制！'
            }
        ],
        [
            'copyright',
            {
                authorName: '沧海', // 选中的文字将无法被复制
                minLength: 30, // 如果长度超过  30 个字符
            },
        ],
        // 图片懒加载：https://github.com/tolking/vuepress-plugin-img-lazy
        ["img-lazy"],
        // 生成文章标签：https://github.com/zq99299/vuepress-plugin/tree/master/vuepress-plugin-tags
        ["vuepress-plugin-tags"],
        // 搜索引擎优化：https://github.com/lorisleiva/vuepress-plugin-seo
        [
            "seo",
            {
                siteTitle: (_, $site) => $site.title,
                title: ($page) => $page.title,
                description: ($page) =>
                    $page.frontmatter.description || $page.description,
                author: (_, $site) => $site.themeConfig.author || author,
                tags: ($page) => $page.frontmatter.tags || tags,
                type: ($page) => "article",
                url: (_, $site, path) =>
                    ($site.themeConfig.domain || domain || "") + path,
                image: ($page, $site) =>
                    $page.frontmatter.image &&
                    (($site.themeConfig.domain &&
                            !$page.frontmatter.image.startsWith("http")) ||
                        "") + $page.frontmatter.image,
                publishedAt: ($page) =>
                    $page.frontmatter.date && new Date($page.frontmatter.date),
                modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
            },
        ],
        // 自动生成站点地图：https://github.com/ekoeryanto/vuepress-plugin-sitemap
        // [
        //     "sitemap",
        //     {
        //         hostname: chstudy.gitee.io,
        //     },
        // ],
        // 自动推送百度搜索引擎：https://github.com/IOriens/vuepress-plugin-baidu-autopush
        ["vuepress-plugin-baidu-autopush"],
        // RSS订阅：https://github.com/webmasterish/vuepress-plugin-feed
        // [
        //     "feed",
        //     {
        //         canonical_base: chstudy.gitee.io,
        //         count: 10000,
        //         // 需要自动推送的文档目录
        //         posts_directories: [],
        //     },
        // ],
        [
            '@vuepress-reco/vuepress-plugin-bgm-player',
            {
                audios: [
                    {
                        name: '雪下的时候',
                        artist: '乔家旭',
                        url: 'http://music.163.com/song/media/outer/url?id=1417143120.mp3',
                        cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200'
                    },
                    {
                        name: 'Attention',
                        artist: 'Charlie Puth',
                        url: 'https://www.ytmp3.cn/down/51180.mp3',
                        cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200'
                    }
                ],
                // 是否默认缩小
                autoShrink: true,
                // 缩小时缩为哪种模式
                shrinkMode: 'float',
                // 悬浮窗样式
                floatStyle: {bottom: '10px', 'z-index': '999999'}
            }
        ],
        [
            'dynamic-title',
            {
                showIcon: 'https://images.cnblogs.com/cnblogs_com/zcl-blog/1697160/t_221118070018_chbcjs.png',
                showText: '欢迎回来~',
                hideIcon: 'https://images.cnblogs.com/cnblogs_com/zcl-blog/1697160/t_221118070018_chbcjs.png',
                hideText: '休息一下~',
                recoverTime: 2000,
            }
        ],
        [
            //     '@vssue/vuepress-plugin-vssue', {
            //     platform: 'github',
            //     owner: 'chstudy',
            //     repo: 'learning',
            //     clientId: 'c6a9eb82fc501581c333',
            //     clientSecret: '76680021413f9aa85cbab4bab575d3be09dbc7e5',
            // }
        ],
        [
            'sitemap', {
            hostname: 'https://chstudy.gitee.io/learning'
        }
        ]
    ]
}
