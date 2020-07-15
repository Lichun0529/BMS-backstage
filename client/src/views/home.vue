<template>
    <div class="main">
            <H1>Fund Management System</H1><br>
            <p>Design&Make by LiChun</p>
            <ul class="d-flex list-unstyled mb-5 mb-lg-0">
                 <li class="mr-2">
                    <a href="http://li_chun529.gitee.io/blog/aboutme/" target="_blank" class="btn btn-icon-only btn-pill btn-primary" aria-label="github social link" data-toggle="tooltip" data-placement="top" title="" data-original-title="Open source projects">
                        <span aria-hidden="true" class="fas fa-house-user"></span>
                    </a>
                </li>
                <li class="mr-2">
                    <a href="https://github.com/Lichun0529" target="_blank" class="btn btn-icon-only btn-pill btn-primary" aria-label="github social link" data-toggle="tooltip" data-placement="top" title="" data-original-title="Open source projects">
                        <span aria-hidden="true" class="fab fa-github"></span>
                    </a>
                </li>
            </ul>
            <div class="github-big-icon">
                <span class="fas fa-dollar-sign"></span>
            </div>
    </div>
</template>
<script >
     export default{
         name:'fund',
     }
</script>
<style lang="less" scoped>
    .main{
        display: flex;
        align-items: center;
        height: 100%;
        flex-direction: column;
        padding-top: 10rem;
        position:relative;
        overflow: hidden;
    }
    p{
        position: relative;
        padding-top: 22rem;
    }
    .btn-icon-only{
        width: 2rem;
        height: 2rem;
    }
    .github-big-icon{
        right: 0;
        top: -3rem;
        bottom: 0;
    }
</style>