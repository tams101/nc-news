import { useState } from "react"

export default function SortBy({setSearchParams}) {

  function handleSortByChange(e) {
    setSearchParams((currParams) => {
      currParams.set("sort_by", e.target.value)
      return currParams
    }, {replace: true})
  }

  function handleOrderChange(e) {
    setSearchParams((currParams) => {
      currParams.set("order", e.target.value)
      return currParams
    }, {replace: true})
  }

  return(
    <div className="sort-by-container">
      <form className="sort-by-form">
        <label htmlFor="sort-by-items">Sort By:</label>
        <select onChange={handleSortByChange} id="sort-by-items">
          <option value='created_at'>Date</option>
          <option value='comment_count'>Comment Count</option>
          <option value='votes'>Votes</option>
        </select>
        <label htmlFor="order-items">Order:</label>
        <select id="order-items" onChange={handleOrderChange}>
          <option value='desc'>Descending</option>
          <option value='asc'>Ascending</option>
        </select>
      </form>
    </div>
  )
}