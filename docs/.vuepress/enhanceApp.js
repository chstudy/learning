export default ({router}) => {
    // 路由切换事件处理
    router.beforeEach((to, from, next) => {
        // console.log("切换路由", to.fullPath, from.fullPath);
        //触发百度的pv统计
        if (typeof _hmt != "undefined") {
            if (to.path) {
                _hmt.push(["_trackPageview", to.fullPath]);
                // console.log("上报百度统计", to.fullPath);
            }
        }
        next();
    });

    // router.onReady(() => {
    //     const {hash} = document.location;
    //     setTimeout(() => {
    //         if (hash.length > 1) {
    //             const id = decodeURIComponent(hash);
    //             const el = document.querySelector(`.reco-side-${decodeURIComponent(id).substring(1)}`);
    //             el.click();
    //         }
    //     }, 1000);
    // });
};