import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY ="71ea529d7a81134563243812d422e800";

  const changeFunction = (e) => {
    setCategory(e.target.value);
  }
  useEffect(() => {
    async function data() {

      setLoading(true);
      let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${API_KEY}`;
      let res = await fetch(url);
      let resData = await res.json();
      setLoading(false);
      setNewsData(resData.articles);
    }
    data();
  },[category])

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={changeFunction} >
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading && <p className='loader'>Loading...</p>}
      
      {!loading && <ol>
      {newsData.map((e,i)=> {
        return (
        <li key={i}>
          <img className='news-img' src={e.image} alt={e.title}/>
          <section className='new-title-content-author'>
            <h3 className='news-title'>{e.title}</h3>
            <section className='new-content-author'>
              <p className='news-description'>{e.description}</p>
              <p className='news-source'><strong>Source:</strong>{e.source.name}</p>
            </section>
          </section>
        </li>
        )
      })}
      </ol>}
    </div>
  )
}


export default App;
