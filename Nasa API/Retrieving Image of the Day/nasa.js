var imageContainer=$("#image-container");

// $.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",function(data)
// {
//     var imageURL=data.url;
//     imageContainer.append(`<img src="${imageURL}" style="height:100%;width:100%;">`);

// });

function displayImage(data)
{

    $("<img>",
    {
        src:data.url,
        height:"100%",
        width:"100%"
    }).appendTo(imageContainer);

}

$.ajax(
    {
        url:"https://api.nasa.gov/planetary/apod",
        method:"GET",
        success:displayImage,
        data:
        {
            api_key:"nCVN3bdCWzscvf2xufcAfYY2CBPKR8aMIyRMocAa",
            date:"2019-9-22",
            
        }
    }
)