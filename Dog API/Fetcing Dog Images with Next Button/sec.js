var getImage=$("#get-image");
var nextImage=$("#next-image");
var menu=$(".drop-menu");
var image=$("#dog-image");

var allowSubmit=false;

menu.change(
    function()
    {
        allowSubmit=false;
    }
)

$.get("https://dog.ceo/api/breeds/list/all",function(data)
{
    let dogBreeds=data.message;
    for(let breed in dogBreeds)
    {
        menu.append('<option value="'+ breed+'">'+ breed +'</option>');
    }
})

function getRandomDogImage(breed)
{
    var url="https://dog.ceo/api/breed/"+breed+"/images/random";
   // console.log(url);
    $.get(url,function(data)
    {
        var imageURL=data.message;
       // console.log(data.message);
        image.attr("src",imageURL);
    }).fail(function(xhr,textStatus,errorThrown)
    {
        alert("Request Denied");
    });
}

function getImageDog()
{
    var menuElement=menu.val();
    if(!allowSubmit)
    {
        getRandomDogImage(menuElement);
        allowSubmit=true;
    }

}

function nextImageDog()
{
    if(allowSubmit)
    {
     var menuElement=menu.val();
     getRandomDogImage(menuElement);
    }
    else
    {
        alert("Click on get image button");
    }
}

getImage.on("click",getImageDog);
nextImage.on("click",nextImageDog);