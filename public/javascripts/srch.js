$(document).ready(function(){
    var rt=[]
    var data =[{isrc:'product05.png',name:'Oppo Mobile A56',price:'150'},{isrc:'product02.png',name:'ABC Phone',price:'11,569'}]

    $('.spinner').show();

    $('#gos').click(function(){
         var kw = $("#keyw").val();
         
       $.ajax({
           url:'/process/asearch',
           method:'get',
           
           dataType:'json',
           data:{'kw':kw},
           success:function(response){
          
            $('.cls').hide()
            if(response){
                setTimeout(function(){
                    console.log("Hello World");
                    $('.spinner').hide();
                    $('.inpt').remove();
                    $('.inptf').remove();
                //$('Amazonx').removeId()
                if(!rt) 
                rt.push(true)
                response.forEach(srt => {
                   
                    $('.srch').append('  <!-- Single product detail starts -->\n\
                    <div class="row border-top py-3 inpt">\n\
                      <!-- Product image starts -->\n\
                      <div class="col-md-4 text-center">\n\
                        <img src="../images/img/product_images/'+srt.isrc+'" height="67" width="67" alt="product image 01">\n\
                      </div> <!-- Product image ends -->\n\
                      <!-- Product details starts -->\n\
                      <div class="col-md-8">\n\
                        <a href="#">'+srt.name+'</a>\n\
                        <p class="text-muted my-0">Sold by : Narendra Modi</p>\n\
                        <p>\n\
                          <i class="fas fa-star" style="color: #ffa41c;"></i>\n\
                          <i class="fas fa-star" style="color: #ffa41c;"></i>\n\
                          <i class="fas fa-star" style="color: #ffa41c;"></i>\n\
                          <i class="fas fa-star-half-alt" style="color: #ffa41c;"></i>\n\
                          <i class="far fa-star" style="color: #ffa41c;"></i>\n\
                        </p>\n\
                        <p class="text-uppercase my-0 font-weight-bold text-danger">\n\
                          <i class="fas fa-euro-sign" style="font-size: 10px;"></i>'+srt.price+'\n\
                        </p>\n\
                      </div> <!-- Product details ends -->\n\
                                         ');
                });
              if(rt) true
                $('.srch').append('<nav aria-label="...">\n\
                <ul class="pagination" >\n\
                  <li class="page-item " style="margin-left: 4em;">\n\
                    <a class="btn btn-outline-warning" style="color: #000;" href="#">see more</a>\n\
                  </li>\n\
                </ul>\n\
              </nav>\n\
              ');}, 2000);
              //getdata();
               //$('#phon').val('')
                
                //if(response.data==undefined || response.data==null || response.data==''){
                //$('tbody').append("<div class='invalid-feedback'>"+ response.msg +"</div>"); 
                //$('.mob').hide();
            //}else{
               //$('.isvalid').show();
          //var fnm = data.fnm;
          //var lnm = data.lnm;
  // $('tbody').append("<div class='valid-feedback'>"+ fnm +","+lnm+"</div>"); 
           
        //}
    }
           },
           error:function(response){
               alert('server error occured')
           }
       });
    

    
    
    
    function getdata(){
        $.ajax({
            url:'/process/getdata/'+kw,
            method:'get',
            async:'false',
            dataType:'json',
            //data:{phone},
            success:function(response){
                 if(response.msg=='success'){
                    $('.spinner').hide();
                    
                   
                    
                     if(response.data==undefined || response.data==null || response.data==''){
                       
                        //alert('no json');
                     } else {
                        var datau =response.data
                        datau.forEach(srt => {
                            $('.srch').append('  <!-- Single product detail starts -->\n\
                            <div class="row border-top py-3">\n\
                              <!-- Product image starts -->\n\
                              <div class="col-md-4 text-center">\n\
                                <img src="../images/img/product_images/'+srt.isrc+'" alt="product image 01">\n\
                              </div> <!-- Product image ends -->\n\
                              <!-- Product details starts -->\n\
                              <div class="col-md-8">\n\
                                <a href="#">'+srt.name+'</a>\n\
                                <p class="text-muted my-0">Sold by : Narendra Modi</p>\n\
                                <p>\n\
                                  <i class="fas fa-star" style="color: #ffa41c;"></i>\n\
                                  <i class="fas fa-star" style="color: #ffa41c;"></i>\n\
                                  <i class="fas fa-star" style="color: #ffa41c;"></i>\n\
                                  <i class="fas fa-star-half-alt" style="color: #ffa41c;"></i>\n\
                                  <i class="far fa-star" style="color: #ffa41c;"></i>\n\
                                </p>\n\
                                <p class="text-uppercase my-0 font-weight-bold text-danger">\n\
                                  <i class="fas fa-rupee-sign" style="font-size: 10px;"></i>'+srt.price+'\n\
                                </p>\n\
                              </div> <!-- Product details ends -->\n\
                            </div>');
                        });
                       
                      
                     $(response.fnm,function(data){
                         //var url = url+data._id;
                         //index+=1;
            $('.x').append("<div class='valid-feedback'>"+ response.fnm +","+response.lnm+"</div>");
             
            $('.q').append('<h4 style="margin-left: 0.5em; margin-top: 1em; color:#663366;">user:'+ response.fnm +'-'+response.lnm+'</h4>');
            $('.q').append('<h4 style="margin-left: 0.5em; margin-top: 1em; color:#663366;">phone#:'+ response.pnhx +'</h4>'); 
            $('.x').append('<form  name="pay" class="form ob"  action="../task/pay" method="POST">');
            $('.ob').append('<input type="text" name="amt" class="form-control is-valid ob" id="amt" aria-describedby="inputGroupPrepend3"  placeholder="enter amount to send" required="">'+'<input type="password" name="pint" class="form-control is-valid v" id="pin" aria-describedby="inputGroupPrepend3"  placeholder="enter pin" required="">'+'<input type="hidden" name="phnt" class="form-control is-valid ob"  aria-describedby="inputGroupPrepend3"  value='+phone+' required="">'+'<button type="submit" class="btn btn-primary btn btn-success rsend">Send</button>');
            
                     });
                 }
               }
            },
            error:function(response){
               // alert('user not found!');
                $('.x').append("<div class='invalid-feedback e' style='display: block;'>User not found!</div>");
            }
        });
    }
});
    
});