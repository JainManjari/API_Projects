var btn=$("#get-image-button");
var imageDisplay=$("#image-display");
var breedMenu=$("#breed-menu");
var subBreedMenu=$("#sub-breed-menu");

$.get("https://dog.ceo/api/breeds/list/all",function(data)
{
    var dogBreeds=data.message;
    console.log(dogBreeds);
    //var hasSubBreed=new Array(dogBreeds.lenght);
    for(let breed in dogBreeds)
    {
         console.log(breed);
         breedMenu.append(`<option value=${breed}>${breed}</option>`);
    }

});

breedMenu.change(function()
{
    $("#image-display img").remove();
    var breed=breedMenu.val();
    var subBreedURL="https://dog.ceo/api/breed/"+breed+"/list";
    $.get(subBreedURL,function(data)
    {
        var subDogBreeds=data.message;
        console.log(subDogBreeds,subDogBreeds.length);
        if(subDogBreeds.length>1)
        {
            $(".subbreedmenu").append(`<select id="sub-breed-menu"></select>`);
            $("#sub-breed-menu").show();
            $("#sub-breed-menu option").remove();
            for(let subBreed of subDogBreeds)
            {
                $("#sub-breed-menu").append(`<option value=${subBreed}>${subBreed}</option>`);
            }
        }
        else
        {
            $("#sub-breed-menu").remove();
            return;
        }

    });
})


btn.on("click",function()
{
    var breedVal=breedMenu.val()
    var subBreedVal=$("#sub-breed-menu").val();
    //console.log(breedVal,subBreedVal);
    if(subBreedVal==undefined)
    {
        var breedURL="https://dog.ceo/api/breed/"+breedVal+"/images";
        //console.log(breedURL);
        $.get(breedURL,function(data)
        {
            var imageURLs=data.message;
            for(let imgURL of imageURLs)
            {
                imageDisplay.append(`<img src=${imgURL} style="height:200px;width:200px;margin:10px">`);

            }
            //console.log(imageURLs);

        });
    }
    else
    {
        var breedURL="https://dog.ceo/api/breed/"+breedVal+"/"+subBreedVal+"/images";
        //console.log(breedURL);
        $.get(breedURL,function(data)
        {
            var imageURLs=data.message;
            $("#image-display img").remove();
            for(let imgURL of imageURLs)
            {
                imageDisplay.append(`<img src=${imgURL} style="height:200px;width:200px;margin:10px">`);

            }
            //console.log(imageURLs);

        });

    }
})



