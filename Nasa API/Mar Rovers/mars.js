
$(function() { 
    $( "#my_date_picker" ).datepicker({ 
        dateFormat: 'yy-mm-dd', 
        defaultDate:"2020-02-05"
    }); 
}); 

var btn=$("#get-image-button");
var input=$("#my_date_picker");
var imageDisplay=$("#image-display");
function displayImage()
{
    var imageDate=input.val();
    console.log(imageDate);
    if(imageDate=="")
    {
        alert("Please fill the date");
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
                        alert("No images for this day!");
                        return;
                    }
                    else
                    {
                        for(let img of images)
                        {
                            let imageURL=img.img_src;
                        // console.log(imageURL);
                            imageDisplay.append(`<img src=${imageURL} style="width:300px;height:300px;margin:10px" >`);
                        }
                    }

                },
                data:
                {
                    earth_date:imageDate,
                    api_key:"nCVN3bdCWzscvf2xufcAfYY2CBPKR8aMIyRMocAa",
                }
            }
        ).fail(function()
        {
            console.log("request denied");
        });
    }
}


btn.on("click",displayImage);