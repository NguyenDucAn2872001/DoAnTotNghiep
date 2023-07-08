<template>
    <div style="background-color: slategrey ;height: 100vh;">
        <div class="text-center pt-4 fw-bold fs-2">
            Dash Board
        </div>
        <div style="width: 100%;display: flex;justify-content: center;">
            <div style="width: 80%;margin-top: 100px; ">
                <router-link to="/ManageClient" style="z-index: 2;">
                    <button style="width: 100%;">
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="front text" style="font-size: 16px;"> Quản lý tài khoản
                        </span>
                    </button>               
                </router-link> 
                <router-link to="/ManageClient/ManageDocument" style="z-index: 2;">
                    <button style="width: 100%;margin-top: 20px;">
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="front text" style="font-size: 16px;"> Quản lý tài liệu
                        </span>
                    </button>               
                </router-link>         
                <router-link to="/ManageClient/ContributionStatistics" style="z-index: 2;">
                    <button style="width: 100%;margin-top: 20px;">
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="front text" style="font-size: 16px;"> Thống Kê Tài Khoản
                        </span>
                    </button>               
                </router-link> 
                <router-link to="/ManageClient/AccountStatistics" style="z-index: 2;">
                    <button style="width: 100%;margin-top: 20px;">
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="front text" style="font-size: 16px;"> Thống Kê Tài Liệu
                        </span>
                    </button>               
                </router-link>
            </div>
        </div>
    </div>
</template>