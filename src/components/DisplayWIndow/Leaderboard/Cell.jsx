import React from 'react'
import "./Cell.css"

const Cell = ({data}) => {
  return (
    <div className='cell-cont'>
        <img style={{borderRadius: "50%", width: "50px"}} src={data["user"]["identities"][0]["identity_data"]["avatar_url"]} />
        <p>{data["user"]["identities"][0]["identity_data"]["full_name"]}</p>
        <p>{data["score"]}</p>
        <p>{data["user"]["identities"][0]["identity_data"]["email"]}</p>
    </div>
  )
}

export default Cell