<template>
<div class="" style="position: fixed;width: 100%">
    <nav class="navbar navbar-expand-lg navbar-light " id="my-element">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div >
            <img src="../assets/download_preview_rev_1.png" alt="" style="width: 60px;height: 60px;">
        </div>
        <div class="ms-5" style="display: flex;align-items: center;text-decoration: none ;cursor: pointer;">
            <i class="fa-solid fa-user" style="padding-right: 10px;"></i>
            <div style="font-weight: 700;">Admin</div>
        </div>  
        </div>  
        <div class="d-flex align-items-center">
        <div class="text-reset me-5 " href="#" style="cursor: pointer;" >
            <i class="fa-regular fa-comments" ></i>
            <span class="badge rounded-pill badge-notification bg-danger">1</span>    
        </div>
        <div class="dropdown me-5" style="cursor: pointer; " >
            <i class="fas fa-bell"></i>
            <span class="badge rounded-pill badge-notification bg-danger">1</span>    
        </div>       
        </div>
    </div>
    </nav>
</div>

</template>