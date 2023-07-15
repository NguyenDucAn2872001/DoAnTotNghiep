<template>
  <div v-if="Loading==true" style="height: 100vh;display: flex;">
    <LoadingVue ></LoadingVue>
  </div>
  <div v-else style="height: 100vh; background-color: #F8F8FF;display: flex;flex-direction: column;">
    <div class="" style="width: 100%;">
        <nav class="navbar navbar-expand-lg navbar-light " id="my-element" style="width: 100%;">
          <div class="row " style="width: 100%;">

            <div class="d-flex col" id="navbarSupportedContent" style="align-items: center;">
              <div class="text-reset me-5 " @click="showNavbar=!showNavbar">
                <i :class="{'fa-solid fa-bars': !showNavbar, 'fa-solid fa-xmark': showNavbar}" style="font-size: 25px; padding-left: 20px;"></i>
                <!-- <img src="../../assets/download_preview_rev_1.png" alt="" style="width: 60px;height: 60px;"> -->
              </div>
              
              <div style="font-weight: 700;font-family: system-ui;font-size: 20px;">{{ name }}</div>
            </div> 

            <div class="col" style="display: flex;justify-content: center;margin-top: 20px;">
              <img src="https://ctt.hust.edu.vn/Images/logo.png" alt="" style="width: 350px;height: 60px;margin-bottom: 18px;">
            </div> 

            <div class="d-flex  col" style="justify-content: flex-end;align-items: center;">
              <div class="text-reset me-3 button" style="display: flex;align-items: center;text-decoration: none ;cursor: pointer;">
                <i class="fa-solid fa-user bell text-light me-1" style="font-size: 24px;"></i>        
              </div>  
              <div class="button me-3" href="#" style="cursor: pointer;" @click="dropdown=!dropdown">
                <i class="fa-brands fa-facebook-messenger text-light bell me-1" style="font-size: 24px;"></i>
                <!-- <span class="badge rounded-pill badge-notification bg-danger">1</span>     -->
              </div>
              <button class="button" @click="dropdownRp=!dropdownRp">
                <svg viewBox="0 0 448 512" class="bell"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
              </button>
            </div>

          </div>
        </nav>
      </div>
    <div v-if="viewDocument==false" style="display: flex;width: 100%;height: 100%;flex-grow: 1;">
    
    <div class="left" id="bg-left" :style="{ display: showNavbar ? 'block' : 'none' }">
    <!-- <div class="left" style="width: 20%; background-color: slategrey ;"> -->

      <div class="container">
        <div class="top-elements">
          <!-- <div style="display: flex;justify-content: center;margin-top: 20px;">
            <img src="../../assets/LogoVienDien_preview_rev_1.png" alt="" style="width: 150px;height: 60px;">
          </div> -->
          <!-- <router-link to="/Home/EditDocument"  style="text-decoration: none;margin-top: 60px;margin-left: 20px;display:flex; align-items: center;">
            <button style="width: 250px;">
              <span class="shadow" style="height: 20px;"></span>
              <span class="edge"></span>
              <span class="front text "> 
                <i class="fa-solid fa-file-word me-3 "  style="font-size: 22px; width: 30px;height: 30px;border-radius: 50%; background-color: #fff;color: #000;padding-top: 5px;"></i>
                Forgot pass
              </span>
          </button>
          </router-link> -->
          <router-link class="button1" to="/Home/EditDocument"  style="text-decoration: none;z-index: 1;margin-top: 60px;margin-left: 20px;display:flex; align-items: center;">
            <i class="fa-solid fa-file-word me-3 ms-3 bg-light " style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;" ></i>
            <div  style="font-weight: 700;font-size: 16px;color: #fff;">Word</div>
          </router-link>
          <router-link class="button1" :to="`/Home/NewEdit/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px;margin-left: 20px; display:flex; align-items: center;">    
              <i class="fa-solid fa-book me-3 ms-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
              <div style="font-weight: 700;font-size: 16px;color: #fff;">Document Online</div>   
          </router-link>
          <router-link class="button1" :to="`/Home/EditDocumentUser/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px;margin-left: 20px; display:flex; align-items: center;">
            <i class="fa-solid fa-pen me-3 ms-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
            <div  style="font-weight: 700;font-size: 16px;color: #fff;">Chỉnh Sửa Văn bản</div>
          </router-link>
          <router-link class="button1" :to="`/Home/DocumentApproval/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px; margin-left: 20px;display:flex; align-items: center;">
            <i class="fa-solid fa-code-merge me-3 ms-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
            <div  style="font-weight: 700;font-size: 16px;color: #fff;">Phê duyệt văn bản</div>
          </router-link>
          <router-link class="button1" :to="`/Home/Community/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px;margin-left: 20px;display:flex; align-items: center;">
            <i class="fa-solid fa-users-line me-3 ms-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
            <div style="font-weight: 700;font-size: 16px;color: #fff;">Cộng đồng</div>
          </router-link>
        </div>
        <div class="bottom-element">
          <div @click="CheckOut" > 
            <div class="line"></div>
            <div  style="display: flex;align-items: center;text-decoration: none ;color: #fff;" >

              <button class="Btn12 ms-4" @click="LogOut">
                <div class="sign12"><i class="fa-solid fa-circle-arrow-left text-light" style="font-size: 30px;"></i></div>              
                <div class="text12 ms-5">Đăng xuất</div>
              </button>
              <!-- <button type="button" class="btn btn-light"  style="display: flex;align-items: center;">
                <i class="fa-solid fa-circle-arrow-left me-3 ms-3" style="font-size: 30px;"></i>
                <div style="padding-right: 20px;font-weight: 700;">Đăng xuất</div>
              </button> -->
              
            </div>  
            <div class="line_2"></div>
          </div>
        </div>
    </div>
    </div>


    <!-- <div style="width: 30px;height: 100vh;background-color: #fff;"></div> -->
    <div class="right" style="width: 100%;">
      
      <div class="footer">
        <div class="d-flex">
          
          <router-link :to="`/Home/NewEditOneUser/${getid}`"  style="text-decoration: none">
            <div class="btn" style="display: flex;align-items: center;width: 174px;margin-top: 30px; margin-left: 30px;background-color: orange;">
              <i class="fa-solid fa-plus me-2 text-light"></i>
              <div class="fw-bold text-light">Thêm văn bản</div>
            </div>
          </router-link>
          <div class="d-flex">
            <div class="btn btn-danger" @click="checkClickSee=!checkClickSee" style="display: flex;align-items: center;width: 174px;margin-top: 30px; margin-left: 30px;">
              <i class="fa-regular fa-eye me-2"></i>
              <div class="fw-bold">xem văn bản</div>
            </div>
            <form v-if="checkClickSee" @submit.prevent="OnSearchDocument()">
              <input  v-model="passwordDocument" type="text" placeholder="Nhập mã văn bản" style="margin-top: 30px;margin-left: 16px;border-radius: 11px;padding-left: 6px;height: 38px">
              <input type="submit" style="display: none;">
            </form>
          </div>
        </div>
        <div class="mt-5">
          <section class="intro">
            <div class="bg-image h-100" >
              <div class="mask d-flex align-items-center h-100" >
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-12">
                      <div class="card" style="height: 500px;">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover mb-0" >
                              <thead >
                                <tr >
                                    <th class="text-center">Số thứ tự</th>
                                    <th class="text-center">Tên văn bản</th>
                                    <th class="text-center">Thể loại</th>
                                    <th class="text-center">Mã tài liệu</th>
                                    <th class="text-center">Action</th>
                                    <th class="text-center">Công Khai</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(i, index) in ListDocument">
                                  <td class="text-center">{{ index + 1 }}</td>
                                  <td class="text-center ">{{ i.nameDocument }}</td>
                                  <td class="text-center">{{ i.classify }}</td>
                                  <td class="text-center" style="cursor: pointer;">
                                    <div class="toggle">
                                      <div class="ellipsis">...</div>
                                      <div class="content">{{ i.password }}</div>
                                    </div>
                                  </td>
                                  <td class="text-center">
                                    <div class="d-flex " style="justify-content: center;">
                                      <!-- <div class="bg-success me-2" @click="OnSearchDocumentbyOwner(i.id,i.nameDocument )" title="Xem văn bản" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                        <i class="fa-solid fa-eye" style="color: #fff;"></i>
                                      </div> -->
                                      <el-popover placement="top" :width="250" trigger="click">
                                        <template #reference>
                                          <div class="bg-success me-2" @click="OnSearchDocumentbyOwner(i.id )" title="Xem văn bản" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                            <i class="fa-solid fa-eye" style="color: #fff;"></i>
                                          </div>
                                        </template>
                                        <div>
                                          <el-table :data="ListVersion" style="display: flex;justify-content: center;">
                                            <el-table-column width="90" property="version1" label="Phiên bản"/>
                                            <el-table-column width="70" label="Xem">
                                              <template #default="{row}">
                                                <i class="fa-solid fa-eye" style="color: #000;" @click="SeeDocumentWithVersion(row.version1,i.id,i.nameDocument)"></i>
                                              </template>
                                            </el-table-column>
                                            <el-table-column width="70" label="Xóa">
                                              <template #default="{row}">
                                                <i class="fa-solid fa-trash-can" style="color: red;" @click="DeleteVersionDocument(row.version1,i.id)"></i>
                                              </template>
                                            </el-table-column>                                      
                                          </el-table>
                                        </div>
                                      </el-popover>
                                      <el-popover placement="bottom" :width="350" trigger="click">
                                        <template #reference>
                                          <div class="bg-warning me-2" title="Gửi văn bản"  @click="OnSearchDocumentbyOwner(i.id )" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                            <i class="fa-solid fa-paper-plane" style="color: #fff;"></i>
                                          </div>
                                        </template>
                                        <div>
                                          <div>
                                            <el-tree :data="data" :props="defaultProps" show-checkbox />
                                          </div>
                                          <hr>
                                          <div class="d-flex justify-content-center">
                                            <div class="bg-warning me-2 text-center" plain @click="open1" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                              <i class="fa-solid fa-paper-plane" style="color: #fff;"></i>
                                            </div>
                                          </div>
                                        </div>
                                      </el-popover>
                                      <div class="bg-danger me-2" title="Xóa văn bản"  @click="deleteDocument(i.id)" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                        <i class="fa-solid fa-trash-arrow-up" style="color: #fff;"></i>
                                      </div>
                                      <el-popover placement="top" :width="300" trigger="click">
                                        <template #reference>
                                          <div class="bg-info me-2" title="Xem thành viên" @click="getUserIndocument(i.id)" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                            <i class="fa-solid fa-user" style="color: #fff;"></i>
                                          </div>
                                        </template>
                                        <div>
                                          <el-table :data="ListUserInDocument">
                                            <el-table-column width="80" property="name" label="Name" />
                                            <el-table-column width="150" property="email" label="Email"/>
                                            <el-table-column width="40" property="id" label="" >
                                              <template #default="{row}">
                                                <i class="fa-solid fa-circle-xmark" @click="getIdDeleteUser(row.id)"></i>
                                              </template>
                                            </el-table-column>                                            
                                          </el-table>
                                          <div style="display: flex;justify-content: center;">                                          
                                            <el-popover placement="bottom" :width="300" trigger="click">
                                              <template #reference>
                                                <div class="bg-secondary me-2 mt-2" title="Thêm thành viên"  @click="AddUserDocument()" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">                         
                                              <i class="fa-solid fa-user-plus" style="color: #fff;"></i>
                                            </div>
                                              </template>
                                              <div>
                                                <div style="display: flex;justify-content: center;">Thêm người dùng vào văn bản</div>
                                                <el-table :data="AddUser">
                                                  <el-table-column width="80" property="name" label="Name" />
                                                  <el-table-column width="150" property="email" label="Email"/>
                                                  <el-table-column width="40" property="id" label="" >
                                                    <template #default="{row}">
                                                      <i class="fa-solid fa-circle-plus" @click="AddNewUser(row.id,i.id)"></i>
                                                    </template>
                                                  </el-table-column>
                                                  
                                                </el-table>
                                              </div>
                                            </el-popover>
                                          </div>
                                        </div>
                                      </el-popover>
                                    </div>
                                  </td>
                                  <td class="text-center">
                                    <label class="switch" :for="'switch-' + index"  @click="setPublic(i.id , i.public)">
                                      <input :id="'switch-' + index" type="checkbox" v-model="i.public">
                                      <div class="slider">
                                          <div class="circle">
                                              <svg class="cross" xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 365.696 365.696" y="0" x="0" height="6" width="6" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                  <path data-original="#000000" fill="currentColor" d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"></path>
                                                </g>
                                              </svg>
                                              <svg class="checkmark" xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 24 24" y="0" x="0" height="10" width="10" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                  <path class="" data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
                                                </g>
                                              </svg>
                                          </div>
                                        </div>
                                    </label>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div v-if="dropdown==true" class="dropdown-message" >
          <i class="fa-solid fa-circle-xmark icon-close" @click="dropdown=!dropdown"></i>
          <div class="message">Chat </div>
          <div class="input-group1 search-box" >
            <input class="form-control border-end-0 border" type="search" placeholder="search" id="example-search-input" style="border-radius: 18px;">
            <i class="fa fa-search icon-search"></i>
          </div>
          <div class="scroll-snap">
            <!-- danh sách các thành viên trong db -->
            <div v-for="i in Listusers"  @click="chat()">
              <div v-if="i.username==name"></div>
              <div v-else>
                <div @click="onselectedtosend(i)" class="list-message">
                  <i class="fa-solid fa-circle-user icon-users" style="cursor: pointer;"></i>
                  <label for="" style="font-weight: 700;cursor: pointer;" >{{ i.username }}</label>
                </div>
              </div>
            </div>
          </div>          
        </div>
        <div v-if="dropdownRp==true " class="dropdown-message " >
          <i class="fa-solid fa-circle-xmark icon-close" @click="dropdownRp=!dropdownRp"></i>
          <div class="message">Thông báo </div> 
          <div class="scroll-snap">
            <!-- danh sách các thành viên trong db -->
            <div v-for="i in 1"  @click="chat()">
              <div>Bạn được Duc An thêm vào quyền chỉnh sửa văn bản Lý thuyết mật mã </div>
            </div>
          </div>           
        </div>
        <div v-if="openchat==true " class="message-user" >
          <div style="position: relative; height: 100%;">
            <!-- icon tắt chat -->
            <i class="fa-solid fa-circle-xmark icon-close" @click="openchat=!openchat"></i>
            <!-- hiển thị tên và avatar -->
            <div style="height: 50px;display: flex;align-items: center;padding: 10px;">
              <i class="fa-solid fa-circle-user icon-users" style="cursor: pointer;"></i>
              <label for="" style="font-weight: 700;cursor: pointer;">{{ usernameGues }}</label>
            </div>
            <div class="line-1"></div>
            <!-- Hiện tin nhắn  -->
            <div class="scroll-snap" >
              <div  v-for="messagee in listMessage"  >
                <div class="you-message" v-if="messagee.from1==useridGues">{{ messagee.message }}</div>
                <div class="guest-message" v-if="messagee.to1==useridGues">{{ messagee.message }}</div>
              </div>
            </div>
            <!-- nhắn tin lên thanh chat -->
            <div class="form-outline send-message">
              <input type="email" id="typeEmail" v-model="message" @keydown.enter="OnSendMessage()" class="form-control " placeholder="input message" style="border-radius: 20px;margin-right: 10px;"/>
              <i class="fa-regular fa-paper-plane" style="padding-top: 10px;cursor: pointer;" @click="OnSendMessage()"></i>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
  </div>


  
  <div v-else style="width: 100%;" >
    <nav class="navbar navbar-expand-lg navbar-light " style="background-color: #444444;position: fixed;width: 100%">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="navbar-brand mt-2 mt-lg-0" href="#">
            <i class="fa-solid fa-bars" style="color: #fff;"></i>
          </a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <div class="text-light">{{ nameDocument }}</div>
            </li>
          </ul>
        </div>
        <div class="d-flex align-items-center">
          <button type="button" class="btn btn-light d-flex me-3" @click="viewDocument=false" style="align-items: center;">
            <div class="me-2">Trang Chủ</div>
            <i class="fa-solid fa-house"></i>
          </button>
          <button type="button" class="btn btn-light d-flex" @click="saveAsPdf" style="align-items: center;">
            <div class="me-2">Tải xuống</div>
            <i class="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
    </nav>
    <div class="row" style="display: flex;justify-content: center;height: 100%;width: 101%; ">
      <div style="width: 20%;background-color: #666666; padding-top: 80px;">
        <div class="text-center mb-3">
          <div class="text-light fw-bold">Bình Luận </div>
        </div>
        <div style="display: flex;justify-content: center;">
          <div style="width: 90%;height: 500px; border: 1px solid #000;border-radius: 10px;background-color: #fff;margin-left: 10px;position: relative;">
            <div class="parent" style="height: 444px;width: 100%;; border-bottom: 1px solid #666666;">
              <div class="child">

                <div class="mt-3" style="display: flex;" v-for="i in CommentPassword">
                  <div class="ms-2 me-2 " style="width:30px;height:30px;border-radius:50%; display:flex;justify-content:center;align-items:center;background-color:#777777">
                    <i class="fa-solid fa-user-secret text-light" style="font-size:22px;"></i>
                  </div>
                  <div class="pt-1" style="width:75%;height:auto; background-color:#DDDDDD;border-radius:10px">
                    <div class="ms-3 fw-bold"> {{ i.name }}</div>
                    <div class="ms-3 mt-1 pb-2" style="width:80%">{{ i.comments }}</div>
                  </div>
                </div>
                
              </div>
            </div>
            <div class="" style="position: absolute; bottom: 10px;width: 100%;display: flex;">
              <input type="text" id="typeEmail" v-model="comments" class="form-control ms-2" placeholder="input comment" style="border-radius: 20px;width: 80%;"/>
              <i class="fa-regular fa-paper-plane ms-2 mt-1" @click="PostComment()" style="padding-top: 10px;cursor: pointer;" ></i>
            </div>
          </div>
        </div>
        <!-- <div class="scrollable-review mt-1" style="border: 1px solid black;width: 19%;height: 50%; top: 30px;background-color: #fff; transform: scale(0.7);position: fixed">
          <div id="content-to-pdf1">
            <div class="mt-1" v-for="item in ListContentDocument" :key="item.id" style="transform: scale(0.5)">
              <h3>{{ item.title }}</h3>
              <div class="ms-4">
                <label class="form-check-label" for="">{{ item.textarea }}</label>
              </div>
            </div>
          </div>  
        </div> -->
      </div>
      <div class="parent" style="width: 80%;height: 723px; background-color: #DDDDDD; display: flex;justify-content: space-evenly;padding-top: 50px;">
        <div class=" mt-5 child" style="border: 1px solid black;width: 85%;height: 1700px; background-color: #fff; margin-bottom: 50px;">
          <div id="content-to-pdf">
            <div class="mt-5 ms-5" v-for="item in ListContentDocument" :key="item.id">
              <h3>{{ item.title }}</h3>
              <div class="ms-4">
                <label class="form-check-label" for="">{{ item.textarea }}</label>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import  Socket  from "socket.io-client";
const URL = 'http://localhost:8888'
const socket= Socket(URL,{autoConnect:false});
import { onMounted,ref } from 'vue';
import axios  from 'axios';
import {useRoute ,useRouter} from 'vue-router'
import Swal from "sweetalert2";
import html2pdf from 'html2pdf.js';
import { ElNotification } from 'element-plus'
import LoadingVue from "../../components/Loading.vue";

const open1 = () => {
  ElNotification({
    title: 'Success',
    message: 'Gửi tài liệu thành công',
    type: 'success',
  })
}
const Loading=ref(true)
const route=useRoute()
const router = useRouter()
const dropdown=ref(false)
const dropdownRp=ref(false)
const openchat=ref(false)
const getid=route.params.id  // id người nhắn
const name=ref('') // tên người nhắn
const usernameGues=ref('') // tên  người nhận
const useridGues=ref('') // id người nhận
const listMessage=ref([]) // danh sách tất cả tin nhắn
const infoUser=ref([])
const message=ref("")
const ListDocument=ref([])
const ListUserInDocument=ref([])
const showNavbar=ref(false)
const Listusers=ref([])
const AddUser=ref([])// thêm user vào văn bản
const checkClickSee=ref(false)
const selectUserToSend=ref()
const passwordDocument=ref()
const ListContentDocument=ref([])
const viewDocument=ref(false)
const value = ref(true)
const nameDocument=ref()
const ListVersion =ref([])
const CommentPassword=ref([]) // khi nhapaj pass
const idDocument=ref([])
const comments=ref('')
const currentMessages = ref([]);

const setPublic=(id ,p)=>{
  try {
    axios.put(import.meta.env.VITE_UPDATE_PUBLIC_DOCUMENT,{
        id:id,
        public:!p
    }).then(response =>
    {
    })
  } catch (error) {
    console.log(error);
  } 
  p=!p
  
}

const getIdDeleteUser=(id)=>{
  Swal.fire({
    title: 'Xóa ',
    text: "Bạn có muốn xóa người dùng này khỏi văn bản không!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa!'
    }).then((result) => {
      if (result.isConfirmed) {
        ListUserInDocument.value.forEach(element => {
          if(element.id==id){
            ListUserInDocument.value.pop(element)
          }
        });
        try {axios.delete(import.meta.env.VITE_DELETE_USER_IN_DOCUMENT,{params:{id:id}})
        } catch (error) {console.log(error);} 
        Swal.fire({
          icon: 'success',
          title: 'Xóa thành công',
          showConfirmButton: false,
          timer: 1000})
        window.location.reload();
      }
  })
}

const AddUserDocument=()=>{
  AddUser.value = infoUser.value.filter(item => !ListUserInDocument.value.some(obj => obj.id === item.id) && item.id != getid);
}

const AddNewUser=(id,documentId)=>{
  Swal.fire({
    title: 'Thêm người dùng  ',
    text: "Bạn có muốn thêm người dùng này vào văn bản không!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Thêm!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {axios.post(import.meta.env.VITE_POSTUSERINDOCUMENT,{documentId:documentId,userId :id,}).then (response => {})
        }catch (error) {console.log(error);}
        Swal.fire({
            icon: 'success',
            title: 'Thêm thành công',
            showConfirmButton: false,
            timer: 1000
        })
        window.location.reload();
      }
  })
}

const OnSendMessage=async()=>{
  listMessage.value.push({
      message:message.value,
      to1:parseInt(getid),
      from1:useridGues.value
  })
  await postMessage(parseInt(getid),useridGues.value,message.value)
  socket.emit("privateMessaGE",{
      message:message.value,
      to1:useridGues.value,
      from1:parseInt(getid)
  })
  message.value=""
}

const onselectedtosend=async(user)=>{
    selectUserToSend.value=user
    useridGues.value=user.id
    usernameGues.value=user.username
    console.log(useridGues.value, ": to");
    await getMessage(parseInt(getid),useridGues.value)
}

onMounted(async()=>{
  setTimeout(function(){   
    Loading.value=false
  }, 1500);
  await getInfoUser()
  await CheckState()
  await getDocument()
  socket.auth={
      userId:parseInt(getid)
  }
  socket.connect()
  socket.on("privateMessageToReceiver",({ message, from1,to1 })=>{
    listMessage.value.push({
        message:message,
        to1:from1,
        from1:to1
    })
  }) 
})

const saveAsPdf = async () => {
  const content = document.getElementById('content-to-pdf');
  const opt = {
    margin: 1,
    filename: 'your-filename.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(content).save();
};

const chat=()=>{
  dropdown.value=!dropdown.value
  openchat.value=!openchat.value
}

const postMessage = async(to1,from1,message)=>{
  try {axios.post(import.meta.env.VITE_POST_MESSAGE,{
    to1:to1,
    from1 :from1,
    message:message,
    
  }).then (response => {})
  }catch (error) {console.log(error);}
}

const getMessage = async(from1,to1)=>{
  listMessage.value=[]
  try {
    await axios.get(import.meta.env.VITE_GET_MESSAGE,{params: {to1: to1, from1: from1 }}).then(response =>
    {for (let i = 0; i < response.data.length; i++) {
        listMessage.value.push(response.data[i])
    }})
  } catch (error) {console.log(error);}
}

const getInfoUser = async()=>{
  try {await axios.get(import.meta.env.VITE_GETAPI_USER).then(response =>{
      for (let i = 0; i < response.data.length; i++) {
        if(response.data[i].id==getid){
          name.value=response.data[i].name
        }
      }
      for (let i = 0; i < response.data.length; i++) {
        infoUser.value.push(response.data[i])
        if (response.data[i].name!=name.value) {        
          Listusers.value.push(response.data[i])
        }
      }
    })
  } catch (error) {console.log(error);}
}
const getDocument = async()=>{
  try {
    await axios.get(import.meta.env.VITE_GETDOCUMENT_BYID,{
      params:{
        idDocumentOwner:getid
      }
    }).then(response =>
    {
      // console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        ListDocument.value.push(response.data[i])
      }
      for (let i = 0; i < ListDocument.value.length; i++) {
        if(ListDocument.value[i].public==1){
          ListDocument.value[i].public=true
        }
        else{
          ListDocument.value[i].public=false
        }
      }
      // console.log(ListDocument.value);
    })
  } catch (error) {
      console.log(error);
  }
}
const getUserIndocument = async(id)=>{
  ListUserInDocument.value=[]
  try {
    await axios.get(import.meta.env.VITE_GETUSERINDOCUMENT_BYID,{
      params:{
        documentId:id
      }
    }).then(response =>
    {
      for (let i = 0; i < response.data.length; i++) {
        for (let j = 0; j < infoUser.value.length; j++) {
          if (infoUser.value[j].id==response.data[i].userId) {
            ListUserInDocument.value.push(infoUser.value[j])
          }       
        }
      }
    })
  } catch (error) {
      console.log(error);
  }
}

const deleteDocument = async(id)=>{
  await Swal.fire({
        title: 'Xóa Tài Liệu',
        text: "Bạn có muốn xóa tài liệu này không ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tiếp tục!'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Deleted!',
            'Xoá tài liệu thành công .',
            'success'
            )
            try {axios.delete(import.meta.env.VITE_COMMENT_DOCUMENT,{params:{id:id}})
            } catch (error) {console.log(error);}
            try {axios.delete(import.meta.env.VITE_DELETE_FINAL_DOCUMENT,{params:{id:id}})
            } catch (error) {console.log(error);}
            try {axios.delete(import.meta.env.VITE_DELETE_CONTENT_DOCUMENT,{params:{id:id}})
            } catch (error) {console.log(error);}         
            try {axios.delete(import.meta.env.VITE_DELETEUSERINDOCUMENT,{params:{id:id}})
            } catch (error) {console.log(error);}
            try {axios.delete(import.meta.env.VITE_DELETEDOCUMENT,{params:{id:id}})
            } catch (error) {console.log(error);}
            window.location.reload();
        }
    })
}

const CheckState = async()=>{
  try {await axios.post('http://localhost:8888/users/state',{id:localStorage.getItem('iduser')}).then(response =>{})} 
  catch (error) {console.log("error");}
}

const CheckOut = async()=>{
  try {await axios.post('http://localhost:8888/users/stateout',{id:getid}).then(response =>{})} 
  catch (error) {console.log("error");}
}

const OnSearchDocument= async()=>{
  
  
  ListContentDocument.value=[]
  var password=passwordDocument.value
  var version =""
  idDocument.value="1"
  try {await axios.get(import.meta.env.VITE_GET_ID_DOCUMENT_BY_PASSWORD,{
    params:{password:password}
    }).then(response =>{idDocument.value= response.data[0].id;})
  } catch (error) {console.log(error);} 
  if(idDocument.value!="1"){
    Loading.value=true
    setTimeout(function(){   
      Loading.value=false
    }, 1500);
    
    viewDocument.value=true
  }
  else{
    ElNotification({
      title: 'Error',
      message: 'Tài Liệu không tồn tại',
      type: 'error',
    })
  }
  

  try {await axios.get(import.meta.env.VITE_GET_VERSION,{
    params:{documentid:idDocument.value,}
    }).then(response =>{console.log(response.data);
      ;version= response.data[response.data.length-1].version1})
  } catch (error) {console.log(error);} 
  // console.log(version);

  try {await axios.get(import.meta.env.VITE_GET_DOCUMENT_BY_PASSWORD,{    
    params:{password: password,version1: version}
    }).then(response =>{   
      for (let i = 0; i < response.data.length; i++) {
        ListContentDocument.value.push(response.data[i])
      }
    })
  } catch (error) {console.log(error)}

  CommentPassword.value=[]
  console.log(idDocument.value)
  GetCommentDocument(idDocument.value)
  
  passwordDocument.value=""
  checkClickSee.value=!checkClickSee.value
}

const PostComment =()=>{
  CommentPassword.value.push({
    documentId: 56, userId: 20, comments: comments.value, feeling: 1,name:name.value
  })
  try {axios.post(import.meta.env.VITE_POST_COMMENT_DOCUMENT,{
    documentId:idDocument.value,
    userId :getid,
    comments:comments.value,
    
  }).then (response => {})
        }catch (error) {console.log(error);}

        comments.value=""
}

const OnSearchDocumentbyOwner= async(id,name)=>{
  ListContentDocument.value=[]
  ListVersion.value=[]
  var version =""
  try {
    await axios.get(import.meta.env.VITE_GET_VERSION,{
    params:{
      documentid:id,
    }
    }).then(response =>
    {
      version= response.data[response.data.length-1].version1
      for (let i = 1; i < version+1; i++) {
        ListVersion.value.push({version1:i})
      }
    })
  } catch (error) {
      console.log(error);
  } 
}

const SeeDocumentWithVersion=async(version,id,name)=>{
  try {await axios.get(import.meta.env.VITE_GET_DOCUMENT_BY_DOCUMENTOWNER,{params:{id:id,version1: version,}}).then(response =>{
    for (let i = 0; i < response.data.length; i++) {
      ListContentDocument.value.push(response.data[i])
    }})
  } catch (error) {console.log(error);}
  CommentPassword.value=[]
  GetCommentDocument(id)
  nameDocument.value=name
  viewDocument.value=true
}

const GetCommentDocument =async(id)=>{
  try {await axios.get(import.meta.env.VITE_GET_COMMENT_DOCUMENT,{
    params:{documentId:id,}
    }).then(response =>{
      for (let i = 0; i < response.data.length; i++) {
        CommentPassword.value.push(response.data[i])      
      }

    })
    
  } catch (error) {console.log(error);} 
}

const DeleteVersionDocument=()=>{
  Swal.fire({
        title: 'Xóa Phiên bản',
        text: "Bạn có muốn xóa phiên bản này khỏi hệ thống văn bản không ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tiếp tục!'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Deleted!',
            'Xoá phiên bản thành công .',
            'success'
            )
        }
    })

}

const LogOut =()=>{
  Swal.fire({
  title: 'Đăng xuất?',
  text: "Bạn có muốn đăng xuất không!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Đăng xuất!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
          icon: 'success',
          title: 'Đăng xuất thành công',
          showConfirmButton: false,
          timer: 1000
      })
      setTimeout(function(){   
        router.push("/")
      }, 1000);
    }
  })
}

const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabled',
}

const data = [
  {
    id: 1,
    label: 'Đại học Bách Khoa Hà Nội',
    children: [
      {
        id: 3,
        label: 'Trường Điện , Điện Tử',
        children: [
          {
            id: 4,
            label: 'Khoa Điện Tử Viễn Thông',
          },
          {
            id: 5,
            label: 'Khoa Tự Động Hóa',
            disabled: true,
          },
        ],
      },
      {
        id: 2,
        label: 'Trường Công Nghệ Thông Tin và Truyền Thông',
        disabled: true,
        children: [
          {
            id: 6,
            label: 'Khoa Trí Tuệ Nhân Tạo',
          },
          {
            id: 7,
            label: 'Khoa Toán Tin',
            disabled: true,
          },
        ],
      },
    ],
  },
]
</script>

<style >
.left{
  width: 25%;
  height: 100%;
}
.el-table .cell {
  text-align: center;
}
.el-popper.is-light {
    background-color: lavender;
    border: 1px solid var(--el-border-color-light);
}
.el-popover.el-popper {
  margin-top: 20px;
}
.button1 {
  width: 230px;
  height: 44px;
  position: relative;
  background-color: #9E9E9E;
  -webkit-border-radius: 10px;
  border: none;
  border-radius: 10px;
  -webkit-box-shadow: 0px 8px 0px #878787, 0px 8px 20px #000000;
  box-shadow: 0px 8px 0px #878787, 0px 8px 20px #000000;
  color: #FFFFFF;
  display: inline-block;
  font-size: 34px;
  padding: 2px 10px;
  text-align: center;
  cursor:pointer;
  text-decoration: none;
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -ms-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition: all 200ms ease;
}
.button1:active {
  -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
  box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
  top: 7px;
}
.button1:hover {
  background: darkgray;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; 
}
.top-elements {
  justify-content: flex-start;
}

.bottom-element {
  width: 100%;
  padding-bottom: 10px;
  align-self: flex-end;
}
#toggle {
  display: none;
}

#toggle:checked ~ .content {
  display: block;
}

#toggle:checked ~ label {
  display: none;
}

.content {
  display: none;
}
  .intro {
  height: 100%;
}

table td,
table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.card {
  border-radius: .5rem;
}
.input-group1 {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 92%;
}
.footer{
  position: relative;
}
.dropdown-message{
  top: 4px;
  right: 10px;
  position: absolute;
  width: 280px;
  height: 370px;
  background-color: #fff;
  border-radius: 20px;
  z-index: 2;
  border: 1px solid #C0C0C0;
}
.search-box{
  position: relative;
  border-radius: 18px;
  border: 1px solid #C0C0C0;
  margin-left: 10px;
}
.icon-search{
  position: absolute;
  right: 10px;
  top: 11px;
}
.message{
  padding: 10px;
  font-weight: 700;
  font-size: 21px;
}
.list-message{
  padding-left: 10px; 
  padding-top: 16px; 
  display: flex; 
  align-items: center;
  scroll-snap-align: start;
}
.icon-users{
  font-size: 36px; 
  color: #CCCCCC;
  padding-right: 10px;
}
.log-out{
  position: absolute; 
  bottom: 12px; 
  left: 178px;
}
.line{
  width: 100%;
  height: 2px;
  background-color: #fff;
  margin-bottom: 10px;
}
.line_2{
  width: 100%;
  height: 2px;
  background-color: #fff;
  margin-top: 10px;
}
.line-1{
  width: 100%;
  height: 2px;
  background-color: #CCCCCC;
}
.message-user{
  top: 4px;
  right: 10px;
  position: absolute;
  width: 280px;
  height: 370px;
  background-color: #fff;
  border-radius: 20px;
  z-index: 2;
  border: 1px solid #C0C0C0;
}
.icon-close{
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
  cursor: pointer;
}
.guest-message{
  padding: 10px;
  background-color: #EEEEEE; 
  width: 70%;
  border-radius: 20px;
  color: #000; 
  font-weight: 700; 
  margin: 10px;
  scroll-snap-align: start;
}
.you-message{
  padding: 10px;
  background-color: #0066FF; 
  width: 70%;
  border-radius: 20px;
  color: #fff; 
  font-weight: 700;
  margin-top: 10px; 
  margin-left: 72px;
  scroll-snap-align: start;
}
.send-message{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  display: flex;
}
.scroll-snap{
  width: 100%;
  height: 68%;
  display: flex;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  flex-direction: column;
}


.switch {
  /* switch */
  --switch-width: 46px;
  --switch-height: 24px;
  --switch-bg: rgb(131, 131, 131);
  --switch-checked-bg: rgb(0, 218, 80);
  --switch-offset: calc((var(--switch-height) - var(--circle-diameter)) / 2);
  --switch-transition: all .2s cubic-bezier(0.27, 0.2, 0.25, 1.51);
  /* circle */
  --circle-diameter: 18px;
  --circle-bg: #fff;
  --circle-shadow: 1px 1px 2px rgba(146, 146, 146, 0.45);
  --circle-checked-shadow: -1px 1px 2px rgba(163, 163, 163, 0.45);
  --circle-transition: var(--switch-transition);
  /* icon */
  --icon-transition: all .2s cubic-bezier(0.27, 0.2, 0.25, 1.51);
  --icon-cross-color: var(--switch-bg);
  --icon-cross-size: 6px;
  --icon-checkmark-color: var(--switch-checked-bg);
  --icon-checkmark-size: 10px;
  /* effect line */
  --effect-width: calc(var(--circle-diameter) / 2);
  --effect-height: calc(var(--effect-width) / 2 - 1px);
  --effect-bg: var(--circle-bg);
  --effect-border-radius: 1px;
  --effect-transition: all .2s ease-in-out;
}

.switch input {
  display: none;
}

.switch {
  display: inline-block;
}

.switch svg {
  -webkit-transition: var(--icon-transition);
  -o-transition: var(--icon-transition);
  transition: var(--icon-transition);
  position: absolute;
  height: auto;
}

.switch .checkmark {
  width: var(--icon-checkmark-size);
  color: var(--icon-checkmark-color);
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

.switch .cross {
  width: var(--icon-cross-size);
  color: var(--icon-cross-color);
}

.slider {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: var(--switch-width);
  height: var(--switch-height);
  background: var(--switch-bg);
  border-radius: 999px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  -webkit-transition: var(--switch-transition);
  -o-transition: var(--switch-transition);
  transition: var(--switch-transition);
  cursor: pointer;
}

.circle {
  width: var(--circle-diameter);
  height: var(--circle-diameter);
  background: var(--circle-bg);
  border-radius: inherit;
  -webkit-box-shadow: var(--circle-shadow);
  box-shadow: var(--circle-shadow);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: var(--circle-transition);
  -o-transition: var(--circle-transition);
  transition: var(--circle-transition);
  z-index: 1;
  position: absolute;
  left: var(--switch-offset);
}

.slider::before {
  content: "";
  position: absolute;
  width: var(--effect-width);
  height: var(--effect-height);
  left: calc(var(--switch-offset) + (var(--effect-width) / 2));
  background: var(--effect-bg);
  border-radius: var(--effect-border-radius);
  -webkit-transition: var(--effect-transition);
  -o-transition: var(--effect-transition);
  transition: var(--effect-transition);
}

/* actions */

.switch input:checked+.slider {
  background: var(--switch-checked-bg);
}

.switch input:checked+.slider .checkmark {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
}

.switch input:checked+.slider .cross {
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

.switch input:checked+.slider::before {
  left: calc(100% - var(--effect-width) - (var(--effect-width) / 2) - var(--switch-offset));
}

.switch input:checked+.slider .circle {
  left: calc(100% - var(--circle-diameter) - var(--switch-offset));
  -webkit-box-shadow: var(--circle-checked-shadow);
  box-shadow: var(--circle-checked-shadow);
}
.toggle .content {
  display: none;
}

.toggle:hover .content {
  display: block;
}
.toggle:hover .ellipsis {
  display: none;
}
#bg-left {
  background-image: url("../../assets/bg_left2.png");
  background-repeat: no-repeat;
  background-size: cover;

}
.Btn12 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(5, 65, 65);
}

/* plus sign */
.sign12 {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign12 svg {
  width: 17px;
}

.sign12 svg path {
  fill: white;
}
/* text */
.text12 {
  padding-left: 20px;
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: .3s;
}
/* hover effect on button width */
.Btn12:hover {
  width: 185px;
  border-radius: 40px;
  transition-duration: .3s;
}

.Btn12:hover .sign12 {
  width: 30%;
  transition-duration: .3s;
  padding-left: 20px;
}
/* hover effect button's text */
.Btn12:hover .text12 {
  opacity: 1;
  width: 80%;
  transition-duration: .3s;
  padding-right: 10px;
}
/* button click effect*/
.Btn12:active {
  transform: translate(2px ,2px);
}



.button {
  width: 50px;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #696969;
  border-radius: 50%;
  cursor: pointer;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.13);
  border: none;
}

.bell {
  width: 18px;
}

.bell path {
  fill: white;
}

.button:hover {
  background-color: rgb(56, 56, 56);
}

.button:hover .bell {
  animation: bellRing 0.9s both;
}

/* bell ringing animation keyframes*/
@keyframes bellRing {
  0%,
  100% {
    transform-origin: top;
  }

  15% {
    transform: rotateZ(10deg);
  }

  30% {
    transform: rotateZ(-10deg);
  }

  45% {
    transform: rotateZ(5deg);
  }

  60% {
    transform: rotateZ(-5deg);
  }

  75% {
    transform: rotateZ(2deg);
  }
}

.button:active {
  transform: scale(0.8);
}

</style>
