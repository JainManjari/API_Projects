var sol=$("#sol");
var pageNo=$("#page-no");
var btn=$("#get-image-button");
var imageDisplay=$("#image-display");

function displayImage()
{
    var solValue=sol.val();
    var pageNoValue=pageNo.val();
    if(solValue=="" || pageNoValue=="")
    {
        alert("Please fill all the fields!");
        sol.val()="";
        pageNoValue.val()="";
        return;
    }
    else
    {
        if(solValue<0 || solValue>1000)
        {
            alert("Enter correct value of sol");
            sol.val(null);
            return;
        }
        else
        {
            $.ajax(
                {
                    url:"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
                    method:"GET",
                    success:function(data)
                    {
                        var images=data.photos;
                        console.log(images);
                        $("#image-display img").remove();
                        if(images.length==0)
                        {
                            alert("No images to be displayed for this value of sol "+solValue+ " and Page No "+pageNoValue);
                            sol.val()="";
                            pageNoValue.val()="";
                            return;
                        }
                        else
                        {
                            for(let img of images)
                            {
                                 var imageURL=img.img_src;
                                 imageDisplay.append(`<img src=${imageURL} style="height:400px;width:400px;margin:10px">`);
                            }
                        }
                    },
                    data:{
                        sol:solValue,
                        page:pageNoValue,
                        api_key:"nCVN3bdCWzscvf2xufcAfYY2CBPKR8aMIyRMocAa",
                    }
                }
            ).fail(function()
            {
                alert("Request denied!");
            });
        }
    }

}

btn.on("click",displayImage)