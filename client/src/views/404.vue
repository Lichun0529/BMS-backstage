<template>
    <div class="container">
        <div class="row justify-content-center center-vertical-absolute">
            <div class="col-10 col-md-10 col-lg-10">
                <!-- Carousel -->
                <div id="Carousel1" class="carousel slide shadow-soft border border-light p-4 rounded" data-ride="carousel">
                    <div class="carousel-inner rounded">
                        <div class="carousel-item active">
                            <router-link to="/login">
                                <img src="../assets/404.png" class="d-block w-100" alt="slide1">
                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- End of Carousel -->
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .container{
        height: 100%;
        // padding-top: 5%;
        // padding-bottom: 5%;
    }
</style>