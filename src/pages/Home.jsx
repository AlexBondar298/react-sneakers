import Card from "../components/Card"

function Home({items, searchValue, onChangeSearchInput, setSearchValue, loading}){
  
  const renderItems = () => {
    const filtredItems = items.filter(word =>
      word.title.toLowerCase().includes(searchValue.toLowerCase()))
      return (loading ? [...Array(10)] : filtredItems).map((elem, index) =>   // error
      <Card 
      key={index}
      {...elem} 
    />)
    
    }
    return(
      <div className="content">
        <div style={{display:"flex", alignItems:"center", marginBottom:40, justifyContent:"space-between"}}>
          <h1>{searchValue ? `Поиск по запросу ${searchValue}` : `Все кроссовки`}</h1>
          <div className="search-block">
            <img src="img/search.svg" alt="Search" />
            {searchValue && <img className="clear" src="img/btn-remove.svg" alt="btn-remove" onClick={() => setSearchValue("")}/>}
            <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..." style={{outline:"none"}}/>
          </div>
        </div>

        <div style={{display:"flex", margin:30, flexWrap:"wrap"}}>
          {renderItems()}
        </div>

      </div>
    )
}

export default Home