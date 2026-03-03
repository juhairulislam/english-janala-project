const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((data) => displayLessons(data.data))
}


const displayLessons = (lessons) => {

    // 1--get the container and empty 
    const levelContainer = document.getElementById('level-container');

    levelContainer.innerHTML = '';

    // 2-- get into every lessons

    for (const lesson of lessons) {

        // 3-- crate element
        console.log(lesson)

        const btnDiv = document.createElement('div');

        btnDiv.innerHTML = `
                                <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open">        </i>Lesson-${lesson.level_no}</button>

        
        ` ;

        levelContainer.append(btnDiv) ;

        // 4-- append into container

    }


}
loadLessons()