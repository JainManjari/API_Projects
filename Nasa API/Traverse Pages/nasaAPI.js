var solInput=$("#sol");
var getBtn=$("#get-image-button");
var prevBtn=$("#prev-button");
var nextBtn=$("#next-button");
var imageDisplay=$("#image-display");
var pageNo=1;


function displayImages(data)
{
    var images=data.photos;
    console.log(images);
    $("#image-display img").remove();
    updateButtons(images);
    if(images.length==0)
    {
        alert("No images to show");

    }
    else
    {
       // console.log("page no",pageNo);
        for(let img of images)
        {
                var imageURL=img.img_src;
                imageDisplay.append(`<img src=${imageURL} style="height:400px;width:400px;margin:10px">`);
        }
    }
    
}

function updateButtons(images)
{
    if(pageNo==1)
    {
        prevBtn.attr("disabled","true");
        nextBtn.removeAttr("disabled");
    }
    else if(images.length==0)
    {
        nextBtn.attr("disabled","true");
        prevBtn.removeAttr("disabled");
        //pageNo--;
    }
    else
    {
        prevBtn.removeAttr("disabled");
        nextBtn.removeAttr("disabled");
    }
}


nextBtn.on("click",function(e)
{
        
        e.preventDefault();
        ajaxFunction(++pageNo);
    

});

prevBtn.on("click",function(e)
{
    e.preventDefault();
    ajaxFunction(--pageNo);
    
});


function ajaxFunction(pageNo)
{
    var solValue=solInput.val();
    if(solValue<0 || solValue>1000)
    {
        alert("Please Enter correct value of sol!");
        solInput.val(null);
        return;
    }
    $.ajax(
        {
            url:"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
            method:"GET",
            success:displayImages,
            data:{
                sol:solValue,
                page:pageNo,
                api_key:"nCVN3bdCWzscvf2xufcAfYY2CBPKR8aMIyRMocAa",
            }
        }
    ).fail(function()
    {
        alert("Request denied!");
    });

}


getBtn.on("click",function()
{
    pageNo=1;
    ajaxFunction(pageNo);  
});