import { useState, useEffect } from "react"

const list = [
    {
        id: 1,
        img: "mov1.jpg",
        title: "Title",
        rating: 7,
        release_date: "1999-08-02",
        description: "Some text"
    },
    {
        id: 2,
        img: "mov1.jpg",
        title: "Title",
        rating: 2,
        release_date: "1999-08-01",
        description: "Some text 2"
    },
    {
        id: 3,
        img: "mov1.jpg",
        title: "Title",
        rating: 4,
        release_date: "1999-08-12",
        description: "Some text 5 2w2qea"
    },
    {
        id: 4,
        img: "mov1.jpg",
        title: "Title",
        rating: 10,
        release_date: "1999-08-30",
        description: "Some text 87432s dsa dasd21qew sad"
    }
]

const categories = [
    {
        name: "All",
        filter: null
    },
    {
        name: "Rating",
        filter: "rating | acs"
    },
    {
        name: "Recent",
        filter: "date | acs"
    },
    {
        name: "Oldest",
        filter: "date | desc"
    }

]

function MoviesList() {

    const [selectedCategory, setSelectedCategory] = useState("All")

    return (
        <div>
            <div className="flex gap-0 spacer-1">
                <CategoriesButtons selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
            <div className="list movies_list flex gap-1">
                <List orderBy={selectedCategory}/>
            </div>
        </div>
    )
}

export default MoviesList

function CategoriesButtons ({setSelectedCategory, selectedCategory}){
    return categories.map(item => 
        <button
            onClick={() => setSelectedCategory(item.name)} 
            className={selectedCategory === item.name ? "btn rounded main_btn": "btn rounded secondary_btn"}
        >{item.name}</button>
    )
}

function List ({selectedCategory}){

    const [sortedList, setSortedList] = useState([])
    const methods = {
        All: "id",
        Rating: "rating",
        Recent: "release_date",
        Oldest: "release_date"
    }

    const sortBy = (field) =>{
        return list.sort((a, b) => a[field] > b[field])
    }

    useEffect(()=>{
        const newSortedList = sortBy(selectedCategory)
        setSortedList(newSortedList)
    }, [list, selectedCategory])
    
    const listHTML = sortedList.map((item, ID) =>
        <div className="list_item" key={ID}>
            <img className="spacer-1" alt="episode" src={"/img/" + item.img} />
            <h4 className="spacer-0">{item.title}</h4>
            <p>{item.description}</p>
        </div>
    )

    return listHTML
}