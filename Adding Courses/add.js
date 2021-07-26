var courseButton=$("#course-button");
var display=$(".display");
var courseDisplay=$("#courses-display");

function getCourses()
{
     display.hide();
     courseDisplay.css(
         {display:"flex",
          flexWrap:"wrap",
          justifyContent:"space-evenly"
         });

    $.get("https://codingninjas.in/api/v3/courses",function(data)
    {
        var codingCourses=data.data.courses;
       // console.log(codingCourses);
        for(let cr of codingCourses)
        {
           
            courseDisplay.append(`<div class="card" style="width: 18rem;margin:15px">
            <img src="${cr.preview_image_url}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${cr.name}</h5>
              <p class="card-text text-right">${cr.level}</p>
            </div>
          </div>`)
            
        }
    }   
    );
}

courseButton.on("click",getCourses);